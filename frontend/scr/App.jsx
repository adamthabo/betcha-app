import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [wagers, setWagers] = useState([]);
  const [text, setText] = useState('');

  const fetchWagers = async () => {
    const { data, error } = await supabase.from('wagers').select('*');
    if (!error) setWagers(data);
  };

  const createWager = async () => {
    if (!text) return;
    await supabase.from('wagers').insert({ description: text, status: 'open' });
    setText('');
    fetchWagers();
  };

  const settleWager = async (id) => {
    await supabase.from('wagers').update({ status: 'settled' }).eq('id', id);
    fetchWagers();
  };

  useEffect(() => {
    fetchWagers();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎲 Betcha</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your wager"
      />
      <button onClick={createWager}>Make Bet</button>

      <h2>Active Wagers</h2>
      <ul>
        {wagers.map((wager) => (
          <li key={wager.id}>
            {wager.description} – <strong>{wager.status}</strong>
            {wager.status === 'open' && (
              <button onClick={() => settleWager(wager.id)} style={{ marginLeft: 8 }}>
                Settle
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
