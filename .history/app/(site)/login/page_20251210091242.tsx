'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
            <a href="/" className="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Powrót do strony głównej
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2rem;
        }

        .login-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://swaypoledancestudio.pl/wp-content/uploads/elementor/thumbs/3B0A0627-%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82-3-scaled-e1664456740133-pvh75i1i1bwhggh1l0woticw933ehiwceqolf7xeo8.jpg') center/cover no-repeat;
          opacity: 0.15;
        }

        .login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
        }

        .login-card {
          background: linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(13, 13, 13, 0.98));
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-header .logo-text {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.3em;
          margin-bottom: 0.25rem;
        }

        .login-header .logo-sub {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #888;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #ccc;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .form-group input {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input::placeholder {
          color: #666;
        }

        .form-group input:focus {
          outline: none;
          border-color: #d4af37;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .login-error {
          background: rgba(220, 53, 69, 0.1);
          border: 1px solid rgba(220, 53, 69, 0.3);
          color: #ff6b6b;
          padding: 0.875rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          text-align: center;
        }

        .login-btn {
          width: 100%;
          padding: 1rem 2rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #888;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #d4af37;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem 1.5rem;
          }

          .login-header .logo-text {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
