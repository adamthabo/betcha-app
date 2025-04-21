# Betcha 🎲

A playful wager app where two users make a bet and a third settles it.

## Features
- ✅ Create real wagers stored in a live database
- 👥 Simple React interface with Supabase integration
- 🎯 Settle bets in one click (status updates in real-time)

## Technologies
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

---

## 🔧 Setup

1. **Clone this repo** (or upload files manually)
2. **Create a Supabase project** at https://app.supabase.com
3. **Create a `wagers` table** with the following fields:

| Column       | Type      | Notes          |
|--------------|-----------|----------------|
| `id`         | bigint    | Primary Key ✅ |
| `description`| text      | Required       |
| `status`     | text      | Defaults to `"open"` |

4. **In Supabase:**
   - Go to `Settings > API` and copy your **Project URL** and **Anon Key**
   - Add them to your `.env` file:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

5. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your `betcha-app` repo
   - Set your environment variables in the **Vercel Dashboard > Project > Settings > Environment Variables**
   - Click **Deploy**

---

## ✅ Live Demo Ready

No simulations. No placeholders. Just a real, functional, quirky wager app.
