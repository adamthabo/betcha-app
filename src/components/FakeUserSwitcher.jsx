import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SettlePage() {
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
      .eq('judge_id', user.id)
      .is('winner_id', null);

    if (!error) setBets(data);
  };

  const settleWager = async (id, winner_id) => {
    const { error } = await supabase
      .from('wagers')
      .update({ winner_id })
      .eq('id', id);

    if (!error) fetchBets();
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Settle Bets</h1>
      <ul className="space-y-2">
        {bets.map((bet) => (
          <li key={bet.id} className="border p-3 space-y-2">
            <p>{bet.description}</p>
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-1"
                onClick={() => settleWager(bet.id, bet.creator_id)}
              >
                Creator Wins
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1"
                onClick={() => settleWager(bet.id, bet.opponent_id)}
              >
                Opponent Wins
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
