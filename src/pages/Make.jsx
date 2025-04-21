import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MakePage() {
  const [bets, setBets] = useState([]);
  const [wager, setWager] = useState('');

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
      .eq('creator_id', user.id);

    if (!error) setBets(data);
  };

  const createWager = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('wagers').insert({
      creator_id: user.id,
      description: wager,
    });

    if (!error) {
      setWager('');
      fetchBets();
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Make a Bet</h1>
      <form onSubmit={createWager} className="space-y-2">
        <input
          type="text"
          placeholder="Describe your wager"
          className="w-full border p-2"
          value={wager}
          onChange={(e) => setWager(e.target.value)}
          required
        />
        <button type="submit" className="bg-black text-white p-2 w-full">
          Submit Wager
        </button>
      </form>
      <div>
        <h2 className="text-xl mt-6">Your Open Bets</h2>
        <ul className="mt-2 space-y-2">
          {bets.map((bet) => (
            <li key={bet.id} className="border p-2">
