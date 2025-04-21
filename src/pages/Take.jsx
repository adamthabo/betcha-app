import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TakePage() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('wagers')
      .select('*')
      .eq('opponent_id', user.id)
      .is('accepted', null);

    if (!error) setBets(data);
  };

  const acceptWager = async (id) => {
    const { error } = await supabase
      .from('wagers')
      .update({ accepted: true })
      .eq('id', id);

    if (!error) fetchBets();
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Take a Bet</h1>
      <ul className="space-y-2">
        {bets.map((bet) => (
          <li key={bet.id} className="border p-3">
            <p>{bet.description}</p>
            <button
              className="mt-2 bg-green-600 text-white px-3 py-1"
              onClick={() => acceptWager(bet.id)}
            >
              Accept Wager
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
