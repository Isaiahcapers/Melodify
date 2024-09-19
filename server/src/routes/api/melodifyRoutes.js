// server/src/routes/api/melodifyRoutes.ts
import { Router } from 'express';
import fetch from 'node-fetch';
const router = Router();
/**
 * GET /melodify/auth - Redirect to Melodify authorization page
 */
router.get('/auth', (_req, res) => {
    const redirect_url = encodeURLComponent(process.env.MELODIFY_REDIRECT_URL || "");
    const client_id = process.env.MELODIFY_CLIENT_ID || "";
    if (!client_id || !process.env.MELODIFY_REDIRECT_URL) {
        return res.status(500).json({ message: "Missing client_id or redirect_url in environment variables" });
    }
    // Build the authorization URL for Melodify's OAuth2
    const authURL = `https://accounts.melodify.com/authorize?client_id=${client_id}&response_type=code&redirect_url=${redirect_url}&scope=user-read-private`;
    // Redirect the user to the Melodify authorization page
    res.redirect(authURL);
});
/**
 * GET /melodify/callback - Handle the callback from Melodify after authorization
 */
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({ message: 'Authorization code missing' });
    }
    try {
        // Exchange authorization code for access and refresh tokens
        const tokenResponse = await fetch('https://accounts.melodify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${code}&redirect_url=${process.env.MELODIFY_REDIRECT_URL}&client_id=${process.env.MELODIFY_CLIENT_ID}&client_secret=${process.env.MELODIFY_CLIENT_SECRET}`,
        });
        // Ensure tokenResponse status is checked
        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            return res.status(500).json({
                message: 'Failed to exchange authorization code for tokens',
                error: errorData,
            });
        }
        // Explicitly cast the response to TokenData
        const tokenData = await tokenResponse.json();
        // Option 1: Store the token in a session or cookie (depends on your app's structure)
        // res.cookie('token', tokenData.access_token, { httpOnly: true });
        // Option 2: Redirect the user to the front-end with token data in query params
        res.redirect(`${process.env.FRONTEND_URL}/MelodifyCallback?token=${tokenData.access_token}`);
    }
    catch (error) {
        console.error('Error during the token exchange:', error);
        res.status(500).json({ message: 'Error during the token exchange', error });
    }
});
export { router as melodifyRoutes };
