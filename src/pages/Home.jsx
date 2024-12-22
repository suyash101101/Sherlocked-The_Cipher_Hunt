import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sign In / Sign Up</h1>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
    </div>
  );
}
