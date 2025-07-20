import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      setError('OAuth authentication failed. Please try again.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      return;
    }

    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // Verify the token and get user data
      fetch('http://localhost:5000/api/v1/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Token verification failed');
          }
          return response.json();
        })
        .then(data => {
          // Store user data
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Redirect to dashboard
          navigate('/app/dashboard');
        })
        .catch(err => {
          console.error('Token verification error:', err);
          setError('Authentication failed. Please try again.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        });
    } else {
      setError('No authentication token received.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <div className="text-error mb-4">{error}</div>
          <div className="text-text-secondary">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <div className="mt-4 text-text-secondary">Completing authentication...</div>
      </div>
    </div>
  );
}; 