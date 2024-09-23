import fetch from 'node-fetch'; // Ensure node-fetch is installed

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getTopTracks = async (artistId: string) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // Step 1: Get a token
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to retrieve token');
    }

    // Cast response to the expected type
    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

    // Step 2: Use token to get top tracks for the artist
    const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!topTracksResponse.ok) {
      throw new Error('Failed to retrieve top tracks');
    }

    const topTracksData = await topTracksResponse.json();

    return topTracksData;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw new Error('Server error fetching top tracks');
  }
};
