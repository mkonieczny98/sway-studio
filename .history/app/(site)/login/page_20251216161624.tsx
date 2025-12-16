'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/keystatic');
      } else {
        const data = await response.json();
        setError(data.message || 'Nieprawidłowe dane logowania');
      }
    } catch {
      setError('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-bg"></div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="logo-text">SWAY</span>
            <span className="logo-sub">panel administracyjny</span>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Login</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Wprowadź login"
                required
                autoComplete="username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wprowadź hasło"
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className="login-error">{error}</div>}
            
            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>

          <div className="login-footer">
            <Link href="/" className="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
