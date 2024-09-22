import { useState, useEffect } from 'react';
import '../CSS/Home.css';

const Home = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID || '';
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const token = await getAccessToken(clientId, code);
        setAccessToken(token);
        const profile = await fetchProfile(token);
        console.log(profile);
        populateUI(profile);
        await fetchAndSetPlaylists(token);
        setLoading(false);
      }
    };
    handleAuth();
  }, [clientId, code]);

  async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async function getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const { access_token } = await result.json();
    return access_token;
  }

  async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  }

  function populateUI(profile: any) {
    document.getElementById("displayName")!.innerText = profile.display_name;
    if (profile.images[0]) {
      const profileImage = new Image(200, 200);
      profileImage.src = profile.images[0].url;
      document.getElementById("avatar")!.appendChild(profileImage);
    }
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
  }

  async function fetchAndSetPlaylists(token: string) {
    const data = await getFeaturedPlaylist(token);
    setPlaylists(data.playlists.items);
  }

  async function getFeaturedPlaylist(token: string) {
    const result = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  }

  return (
    <div>
      <h1>Welcome to Melodify</h1>
      <h2>Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <ul id="bio">
        <li>Email: <span id="email"></span></li>
        <li>User Id: <span id="id"></span></li>
      </ul>

      <div className="playlists">
        <h2>Featured Playlists</h2>
        {loading ? <p>Loading...</p> : (
          <ul>
            {playlists.length > 0 ? (
              playlists.map((playlist: any) => (
                <li key={playlist.id}>
                  <a href={playlist.external_urls.spotify}>{playlist.name}</a>
                </li>
              ))
            ) : <p>No playlists available.</p>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
