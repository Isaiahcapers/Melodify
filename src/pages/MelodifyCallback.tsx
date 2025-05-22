// client/src/pages/MelodifyCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MelodifyCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      // Update the endpoint to match your Melodify server route
      fetch(`/api/melodify/callback?code=${code}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Save token to local storage (or session storage, based on your needs)
            localStorage.setItem('token', data.token);
            // Navigate to the home page after successful login
            navigate('/');
          } else {
            alert('Login failed! Please try again.');
          }
        })
        .catch(error => {
          console.error('Error during Melodify callback:', error);
          alert('An error occurred during the login process.');
        });
    } else {
      alert('No authorization code provided in the URL.');
      navigate('/login'); // Redirect to login if no code is present
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
};

export default MelodifyCallback;
