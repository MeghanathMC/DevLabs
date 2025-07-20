"use client";
 
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

 
export const FullScreenSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
 
  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
 
  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const validateName = (value: string) => {
    return value.length >= 2;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    setError("");

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");

    // Validate first name
    if (!validateName(firstName)) {
      setFirstNameError("First name must be at least 2 characters.");
      valid = false;
    }

    // Validate last name
    if (!validateName(lastName)) {
      setLastNameError("Last name must be at least 2 characters.");
      valid = false;
    }
 
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
 
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
 
    setSubmitted(true);
 
    if (valid) {
      setLoading(true);
      try {
        console.log("Form submitted!");
        console.log("Email:", email);
        
        // Call the backend API
        await authAPI.register({
          firstName,
          lastName,
          email,
          password
        });
        
        // Show success message
        setSuccess(true);
        setError("");
        
        // Clear form
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setSubmitted(false);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/app/dashboard');
        }, 2000);
        
      } catch (err: any) {
        setError(err.message || 'Registration failed');
        setSuccess(false);
        console.error('Registration error:', err);
      } finally {
        setLoading(false);
      }
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-4">
      <div className="w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-xl rounded-3xl">
        {/* Background overlay */}
        <div className="w-full h-full z-10 absolute bg-gradient-to-t from-transparent to-black/20 rounded-3xl"></div>
        
        {/* Vertical lines overlay */}
        <div className="flex absolute z-10 overflow-hidden backdrop-blur-sm rounded-l-3xl">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[40rem] z-10 w-[4rem] bg-gradient-to-b from-transparent via-black/30 via-[69%] to-transparent opacity-30 overflow-hidden"></div>
          ))}
        </div>
        
        {/* Decorative circles */}
        <div className="w-[15rem] h-[15rem] bg-primary-500 absolute z-0 rounded-full -bottom-20 -left-10 opacity-80"></div>
        <div className="w-[8rem] h-[5rem] bg-primary-300 absolute z-0 rounded-full bottom-10 left-20 opacity-60"></div>
        <div className="w-[6rem] h-[6rem] bg-primary-400 absolute z-0 rounded-full bottom-32 left-5 opacity-70"></div>
 
        {/* Left side - Hero content */}
        <div className="bg-bg-primary text-text-primary p-8 md:p-12 md:w-1/2 relative rounded-l-3xl overflow-hidden">
          <div className="relative z-20">
            <h1 className="text-2xl md:text-3xl font-medium leading-tight tracking-tight mb-4">
              Showcase Your Hackathon Journey
            </h1>
            <p className="text-text-secondary text-lg">
              Create stunning portfolios that highlight your projects, achievements, and skills. Stand out to recruiters with professional presentation.
            </p>
          </div>
        </div>
 
        {/* Right side - Signup form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-bg-secondary z-20 text-text-primary rounded-r-3xl">
          <div className="flex flex-col items-left mb-8">
            <div className="text-primary-500 mb-4">
              <RocketLaunchIcon className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-medium mb-2 tracking-tight">
              Get Started
            </h2>
            <p className="text-left text-text-secondary">
              Welcome to DevLabs — Let's build your portfolio
            </p>
          </div>

          {success && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Account created successfully!</p>
                  <p className="text-sm text-green-400/80">Redirecting to dashboard...</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
 
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm mb-2 text-text-primary">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  className={`text-sm w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-bg-tertiary text-text-primary placeholder-text-tertiary focus:ring-primary-500 transition-colors ${
                    firstNameError ? "border-error" : "border-primary-500/20"
                  }`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-invalid={!!firstNameError}
                  aria-describedby="firstName-error"
                  disabled={success}
                />
                {firstNameError && (
                  <p id="firstName-error" className="text-error text-xs mt-1">
                    {firstNameError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm mb-2 text-text-primary">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  className={`text-sm w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-bg-tertiary text-text-primary placeholder-text-tertiary focus:ring-primary-500 transition-colors ${
                    lastNameError ? "border-error" : "border-primary-500/20"
                  }`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-invalid={!!lastNameError}
                  aria-describedby="lastName-error"
                  disabled={success}
                />
                {lastNameError && (
                  <p id="lastName-error" className="text-error text-xs mt-1">
                    {lastNameError}
                  </p>
                )}
              </div>
            </div>
 
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-text-primary">
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="demo@example.com"
                className={`text-sm w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-bg-tertiary text-text-primary placeholder-text-tertiary focus:ring-primary-500 transition-colors ${
                  emailError ? "border-error" : "border-primary-500/20"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
                disabled={success}
              />
              {emailError && (
                <p id="email-error" className="text-error text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>
 
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-text-primary">
                Create new password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`text-sm w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-bg-tertiary text-text-primary placeholder-text-tertiary focus:ring-primary-500 transition-colors ${
                  passwordError ? "border-error" : "border-primary-500/20"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                disabled={success}
              />
              {passwordError && (
                <p id="password-error" className="text-error text-xs mt-1">
                  {passwordError}
                </p>
              )}
            </div>
 
            <button
              type="submit"
              className="w-full btn-primary mt-4"
              disabled={loading || success}
            >
              {loading ? 'Creating account...' : success ? 'Account Created!' : 'Create a new account'}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-primary-500/20"></div>
              <span className="flex-shrink mx-4 text-sm text-text-tertiary">OR</span>
              <div className="flex-grow border-t border-primary-500/20"></div>
            </div>

            <button
              type="button"
              className="btn-secondary w-full"
              disabled={success}
              onClick={() => window.location.href = 'http://localhost:5000/api/v1/auth/google'}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign up with Google
            </button>
 
            <div className="text-center text-text-secondary text-sm mt-4">
              Already have account?{" "}
              <Link to="/login" className="text-primary-400 font-medium hover:text-primary-500 transition-colors">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};