import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

export default function Home() {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Error signing in:', error.message);
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      navigate('/dashboard');
    }
  });

  return (
    <div className="container">
      <div className="content">
        <h1>🔍 Welcome, Sherlock!</h1>
        <p>Sign in to uncover the ciphers.</p>
        <button
          className="signin-button"
          onClick={handleSignInWithGoogle}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
