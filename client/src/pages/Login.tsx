import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';
import '@/styles/main.scss';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      setLocation('/');
    } else {
      setError('Email atau password salah. Gunakan admin@admin.com / qwerty');
    }
  };

  return (
    <div className="app-layout" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #31694E, #658C58)',
    }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            color: '#31694E',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            KerjaAja
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}>
            Platform Freelancing Sosial
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: 500,
                color: '#1A1A1A'
              }}>
                Email
              </label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@admin.com"
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: 500,
                color: '#1A1A1A'
              }}>
                Password
              </label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="qwerty"
                required
              />
            </div>

            {error && (
              <div style={{
                padding: '0.75rem',
                background: '#FEE',
                color: '#E74C3C',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn--primary btn--full">
              Masuk
            </button>
          </form>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#F0E491',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            color: '#31694E'
          }}>
            <strong>Demo Account:</strong><br />
            Email: admin@admin.com<br />
            Password: qwerty
          </div>
        </div>
      </div>
    </div>
  );
}
