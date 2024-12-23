import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchLeaderboardData = async () => {
  try {
    const { data, error } = await supabase
      .from('current_leaderboard') // Ensure the table name is correct
      .select('*')
      .order('total_score', { ascending: false })
      .limit(100);

    if (error) {
      throw new Error(error.message);
    }

    console.log('Fetched leaderboard data:', data); // Log the data
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
    return { error: error.message };
  }
};
