// server/src/routes/api/melodifyRoutes.ts
import { Router } from 'express';

const router = Router();

/**
 * GET /spotify/auth - Redirect to Spotify authorization page
 */
router.get('/auth', (_req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_url = process.env.SPOTIFY_REDIRECT_URL;

  // Log the values to check if they are being read correctly
  console.log('Client ID:', client_id);
  console.log('Redirect URL:', redirect_url);

  // If client_id or redirect_url are missing, log an error and respond with 500
  if (!client_id || !redirect_url) {
    console.error('Missing required environment variables:');
    if (!client_id) console.error('SPOTIFY_CLIENT_ID is missing');
    if (!redirect_url) console.error('SPOTIFY_REDIRECT_URL is missing');

    return res.status(500).json({ message: 'Server misconfiguration: Missing client_id or redirect_url' });
  }

  // Build the authorization URL for Spotify's OAuth2
  const authURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_url)}&scope=user-read-private`;

  // Log the URL to verify it's built correctly
  console.log('Authorization URL:', authURL);

  // Redirect the user to the Spotify authorization page
  return res.redirect(authURL);
});

export { router as melodifyRoutes };
