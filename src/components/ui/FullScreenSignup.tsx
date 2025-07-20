"use client";
 
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { Link } from 'react-router-dom';

 
export const FullScreenSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
 
  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
 
  const validatePassword = (value: string) => {
    return value.length >= 8;
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
 
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }
 
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }
 
    setSubmitted(true);
 
    if (valid) {
      // Submission logic goes here
      console.log("Form submitted!");
      console.log("Email:", email);
      alert("Form submitted!");
      setEmail("");
      setPassword("");
      setSubmitted(false);
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
              Welcome to HackFolio — Let's build your portfolio
            </p>
          </div>
 
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
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
            >
              Create a new account
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