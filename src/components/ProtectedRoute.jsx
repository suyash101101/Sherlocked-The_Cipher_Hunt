import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ children }) {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  };

  const session = getSession();
  return session ? children : <Navigate to="/" />;
}
