console.log("✅ App component rendered");

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [wagers, setWagers] = useState([]);
  const [newWager, setNewWager] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWagers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('wagers').select('*').order('id', { ascending: false });
    if (error) {
      console.error('Error fetching wagers:', error.message);
      setError(error.message);
    } else {
      setWagers(data);
      setError(null);
    }
    setLoading(false);
  };

  const addWager = async () => {
    if (!newWager.trim()) return;
    const { error } = await supabase.from('wagers').insert({ description: newWager, status: 'open' });
    if (error) {
      console.error('Error adding wager:', error.message);
      setError(error.message);
    } else {
      setNewWager('');
      fetchWagers();
    }
  };

  const settleWager = async (id) => {
    const { error } = await supabase.from('wagers').update({ status: 'settled' }).eq('id', id);
    if (error) {
      console.error('Error settling wager:', error.message);
      setError(error.message);
    } else {
      fetchWagers();
    }
  };

  useEffect(() => {
    fetchWagers();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎲 Betcha</h1>
      <p>Make a wager. Settle it. Keep it fun.</p>

      <div style={{ marginBottom: '1rem' }}>
        <input
          value={newWager}
          onChange={(e) => setNewWager(e.target.value)}
          placeholder="Enter a wager..."
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button onClick={addWager} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading wagers...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>⚠️ {error}</p>
      ) : wagers.length === 0 ? (
        <p>No wagers yet. Be the first!</p>
      ) : (
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
      )}

      <footer style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.6 }}>
        Developed by Field Trip LLC
      </footer>
    </main>
  );
}
