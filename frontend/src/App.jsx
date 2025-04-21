import { Routes, Route } from 'react-router-dom';
import MakePage from './pages/Make';
import TakePage from './pages/Take';
import SettlePage from './pages/Settle';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/make" element={<MakePage />} />
      <Route path="/take" element={<TakePage />} />
      <Route path="/settle" element={<SettlePage />} />
    </Routes>
  );
}
