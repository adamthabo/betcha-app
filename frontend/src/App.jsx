import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [wagers, setWagers] = useState([]);
  const [newWager, setNewWager] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug: confirm App renders
  console.log("✅ App component rendered");

  // Load wagers from Supabase
  const fetchWagers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('wagers')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('❌ Error fetching wagers:', error.message);
      setError(error.message);
    } else {
      setWagers(data);
      setError(null);
    }
    setLoading(false);
  };

  // Add new wager
  const addWager = async () => {
    if (!newWager.trim()) return;
    const { error } = await supabase.from('wagers').insert({
      description: newWager,
      status: 'open'
    });

    if (error) {
      console.error('❌ Error adding wager:', error.message);
      setError(error.message);
    } else {
      setNewWager('');
      fetchWagers();
    }
  };

  // Mark wager as settled
  const settleWager = async (id) => {
    const { error } = await supabase.from('wagers').update({ status: 'settled' }).eq('id', id);

    if (error) {
      console.error('❌ Error settling wager:', error.message);
      setError(error.message);
    } else {
      fetchWagers();
    }
  };

  useEffect(() => {
    fetchWagers();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎉 Betcha App Loaded</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Type your wager"
          value={newWager}
          onChange={(e) => setNewWager(e.target.value)}
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button onClick={addWager} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Add Bet
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      <ul>
        {wagers.map((wager) => (
          <li key={wager.id} style={{ marginBottom: '0.5rem' }}>
            {wager.description} – <strong>{wager.status}</strong>
            {wager.status === 'open' && (
              <button
                onClick={() => settleWager(wager.id)}
                style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
              >
                Settle
              </button>
            )}
          </li>
        ))}
      </ul>

      <footer style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.6 }}>
        Developed by Field Trip LLC
      </footer>
    </main>
  );
}
