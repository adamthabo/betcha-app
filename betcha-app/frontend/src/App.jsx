// trigger redeploy

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [wagers, setWagers] = useState([]);
  const [newWager, setNewWager] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("✅ React app is rendering");

  const fetchWagers = async () => {
    console.log("📡 Fetching wagers from Supabase...");
    setLoading(true);
    const { data, error } = await supabase
      .from('wagers')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("❌ Error loading wagers:", error.message);
      setError(error.message);
    } else {
      console.log("📥 Wagers loaded:", data);
      setWagers(data);
      setError(null);
    }
    setLoading(false);
  };

  const addWager = async () => {
    if (!newWager.trim()) return;
    console.log("➕ Adding wager:", newWager);
    const { error } = await supabase.from('wagers').insert({
      description: newWager,
      status: 'open'
    });
    if (error) {
      console.error("❌ Error adding wager:", error.message);
      setError(error.message);
    } else {
      setNewWager('');
      fetchWagers();
    }
  };

  const settleWager = async (id) => {
    console.log("🛠 Settling wager with ID:", id);
    const { error } = await supabase.from('wagers').update({ status: 'settled' }).eq('id', id);
    if (error) {
      console.error("❌ Error settling wager:", error.message);
      setError(error.message);
    } else {
      fetchWagers();
    }
  };

  useEffect(() => {
    fetchWagers();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1></h1>Betcha</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="What's the wager?"
          value={newWager}
          onChange={(e) => setNewWager(e.target.value)}
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button onClick={addWager} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Add Bet
        </button>
      </div>

      {loading && <p>⏳ Loading wagers...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      {!loading && wagers.length === 0 && <p>🪵 No wagers yet — be the first!</p>}

      <ul>
        {wagers.map((w) => (
          <li key={w.id} style={{ marginBottom: '0.5rem' }}>
            {w.description} – <strong>{w.status}</strong>
            {w.status === 'open' && (
              <button
                onClick={() => settleWager(w.id)}
                style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
              >
                Settle
              </button>
            )}
          </li>
        ))}
      </ul>

      <footer style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.6 }}>
        A Field Trip adVenture
      </footer>
    </main>
  );
}
