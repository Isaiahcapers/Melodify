import { Router } from 'express';
import fetch from 'node-fetch'; // Ensure node-fetch is installed

const router = Router();

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * GET /spotify/auth - Redirect to Spotify authorization page
 */
router.get('/auth', (_req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  console.log(process.env);
  

  if (!client_id || !redirect_uri) {
    return res.status(500).json({ message: 'Server misconfiguration: Missing client_id or redirect_url' });
  }

  const authURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user-read-private`;
  return res.redirect(authURL);
});

/**
 * GET /spotify/top-tracks/:id - Get an artist's top tracks
 */
router.get('/top-tracks/:id', async (req, res) => {
  const artistId = req.params.id;
  console.log('Fetching top tracks for artist ID:', artistId);  // Log the artist ID

  console.log('Artist ID:', artistId);
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // Step 1: Get a token
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

    if (!tokenResponse.ok) {
      return res.status(500).json({ message: 'Failed to retrieve token', error: tokenData });
    }

    // Step 2: Use token to get top tracks for the artist
    const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const topTracksData = await topTracksResponse.json();

    if (!topTracksResponse.ok) {
      return res.status(500).json({ message: 'Failed to retrieve top tracks', error: topTracksData });
    }

    return res.json(topTracksData);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return res.status(500).json({ message: 'Server error fetching top tracks', error });
  }
});

export { router as melodifyRoutes };
