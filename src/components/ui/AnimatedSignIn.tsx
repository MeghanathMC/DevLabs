import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AnimatedSignIn: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation states
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 300);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Only show the component once mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-bg-primary' : 'bg-gray-50'}`}>
      <div className="flex min-h-screen items-center justify-center p-4 md:p-0">
        <div className={`w-full max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 ${
          theme === 'dark' ? 'bg-bg-secondary shadow-xl shadow-indigo-500/10' : 'bg-white shadow-xl shadow-gray-200'
        } ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          


          <div className="flex flex-col md:flex-row">
            {/* Left side - Statistics and Images Collage */}
            <div className={`hidden md:block w-full md:w-3/5 p-6 animate-fade-in ${theme === 'dark' ? 'bg-bg-tertiary' : 'bg-gray-100'}`}>
              <div className="grid grid-cols-2 grid-rows-3 gap-4 h-full overflow-hidden">
                {/* Top left - Student Portfolio Showcase */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/20250720_2244_Student Portfolio Showcase_remix_01k0md58m4f49vgx1565thjw4k.png" 
                    alt="Student Portfolio Showcase" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Top right - Cosmic Tech Meditation */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/20250718_1557_Cosmic Tech Meditation_simple_compose_01k0eh37g1fhm81dyxqhzvgmxm.png" 
                    alt="Cosmic Tech Meditation" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Middle left - 3D Web Tech Logos */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/20250709_1524_3D Web Tech Logos_simple_compose_01jzq9mmecfm8rxfdw7p5jsq25.png" 
                    alt="3D Web Tech Logos" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Middle right - Floating Code Architect */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/20250718_1716_Floating Code Architect_simple_compose_01k0ennc38epfstt6xv10r090a.png" 
                    alt="Floating Code Architect" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Bottom left - Futuristic Online Shopping */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/20250710_1205_Futuristic Online Shopping_remix_01jzsgmz4wf69va8473t6yrshr.png" 
                    alt="Futuristic Online Shopping" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Bottom right - Digital Mind Interface */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/20250718_1621_Digital Mind Interface_simple_compose_01k0ejgr9ee7rv84zjs40bsm22.png" 
                    alt="Digital Mind Interface" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
              </div>
            </div>
            
            {/* Right side - Sign in form */}
            <div 
              className={`w-full md:w-2/5 p-8 md:p-12 ${
                theme === 'dark' ? 'bg-bg-secondary text-text-primary' : 'bg-white text-gray-900'
              }`}
              style={{
                transform: formVisible ? 'translateX(0)' : 'translateX(20px)',
                opacity: formVisible ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
              }}
            >
              <div className="text-center mb-6">
                <p className={`text-sm ${theme === 'dark' ? 'text-text-secondary' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className={`font-medium ${
                      theme === 'dark' ? 'text-primary-400 hover:text-primary-500' : 'text-primary-600 hover:text-primary-500'
                    }`}
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className={`text-xl font-bold ${theme === 'dark' ? 'text-text-primary' : 'text-gray-900'}`}>DevLabs</span>
                </div>
                <h1 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-text-primary' : 'text-gray-900'}`}>
                  Welcome back
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-text-secondary' : 'text-gray-600'}`}>
                  Sign in to showcase your hackathon journey and build your portfolio.
                </p>
              </div>


              
              <form onSubmit={handleSignIn} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium ${
                      theme === 'dark' ? 'text-text-primary' : 'text-gray-700'
                    }`}
                  >
                    Email Address
                  </label>
                  <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full rounded-lg border-2 py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'bg-bg-tertiary border-indigo-500/20 text-text-primary placeholder:text-text-tertiary focus:border-indigo-500 focus:ring-indigo-500/10' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/10'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label 
                    htmlFor="password" 
                    className={`block text-sm font-medium ${
                      theme === 'dark' ? 'text-text-primary' : 'text-gray-700'
                    }`}
                  >
                    Password
                  </label>
                  <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full rounded-lg border-2 py-3 px-4 pr-10 focus:outline-none focus:ring-2 sm:text-sm transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'bg-bg-tertiary border-indigo-500/20 text-text-primary placeholder:text-text-tertiary focus:border-indigo-500 focus:ring-indigo-500/10' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/10'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                        theme === 'dark' ? 'text-text-tertiary hover:text-text-secondary' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="transition-colors" />
                      ) : (
                        <Eye size={18} className="transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded border focus:ring-2 focus:ring-primary-500 ${
                      theme === 'dark' 
                        ? 'text-primary-500 bg-bg-tertiary border-primary-500/20' 
                        : 'text-primary-500 bg-white border-gray-300'
                    }`}
                  />
                  <label htmlFor="remember-me" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-text-primary' : 'text-gray-900'}`}>
                    Remember me
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedSignIn };