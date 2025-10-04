import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'admin@knowhowcafe.com';
const ADMIN_PASSWORD = 'password';

const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sending' | 'verified' | 'wrong' | 'not-verified'>('idle');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASSWORD) {
        localStorage.removeItem('userName');
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard/bookings', { replace: true });
        return;
      }
      const name = loginData.email.split('@')[0];
      localStorage.setItem('userName', name);
      localStorage.removeItem('isAdmin');
      setUserName(name);
      setIsLoggedIn(true);
      window.location.href = '/home';
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('userName', signupData.name);
      localStorage.removeItem('isAdmin');
      setUserName(signupData.name);
      setIsLoggedIn(true);
      window.location.href = '/home';
    }, 1000);
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!signupData.email) {
      alert('Please enter an email address first');
      return;
    }
    
    setOtpStatus('sending');
    setShowOtpModal(true);
    
    // Simulate sending OTP
    setTimeout(() => {
      setOtpStatus('idle');
      console.log(`OTP sent to ${signupData.email}: 123456`); // In real app, this would be sent via email
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpStatus('not-verified');
      return;
    }
    
    // Simulate OTP verification (correct OTP is 123456)
    if (otp === '123456') {
      setOtpStatus('verified');
      setIsEmailVerified(true);
      setTimeout(() => {
        setShowOtpModal(false);
        setOtp('');
        setOtpStatus('idle');
      }, 1500);
    } else {
      setOtpStatus('wrong');
      setTimeout(() => {
        setOtpStatus('idle');
        setOtp('');
      }, 2000);
    }
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtp('');
    setOtpStatus('idle');
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-40 w-12 h-12 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
      
      <div className="relative w-full max-w-md h-[650px] perspective-1000">
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Login Card - Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img 
                    src="/lovable-uploads/70d53855-15d8-48b4-9670-ee7b769f185c.png" 
                    alt="Know How Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Sign in to continue your creative journey</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  onClick={() => setIsFlipped(true)}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign up
                </button>
              </div>
              
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign in with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // This will be integrated with backend later
                    console.log('Google sign-in clicked');
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>

          {/* Signup Card - Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 h-full flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img 
                    src="/lovable-uploads/70d53855-15d8-48b4-9670-ee7b769f185c.png" 
                    alt="Know How Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Join Know How
                </h1>
                <p className="text-gray-600">Start your creative journey today</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={signupData.name}
                    onChange={handleSignupInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={signupData.email}
                    onChange={handleSignupInputChange}
                    className={`w-full pl-10 pr-24 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      isEmailVerified 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    required
                    disabled={isEmailVerified}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={!signupData.email || isEmailVerified}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isEmailVerified
                        ? 'bg-green-500 text-white cursor-default'
                        : signupData.email
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isEmailVerified ? '✓ Verified' : 'Verify'}
                  </button>
                </div>

                {isEmailVerified && (
                  <>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={handleSignupInputChange}
                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupInputChange}
                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </>
                )}

                {!isEmailVerified && signupData.email && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600">
                      Please verify your email to continue with registration
                    </p>
                  </div>
                )}
              </form>

              <div className="mt-4 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600">
                We've sent a 6-digit code to <br />
                <span className="font-semibold text-blue-600">{signupData.email}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`w-full p-4 border-2 rounded-xl text-center text-2xl font-mono tracking-widest focus:outline-none transition-colors ${
                    otpStatus === 'verified' 
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : otpStatus === 'wrong' 
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                  maxLength={6}
                />
              </div>

              {/* Status Messages */}
              {otpStatus === 'sending' && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Sending OTP...</span>
                  </div>
                </div>
              )}

              {otpStatus === 'verified' && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Email Verified Successfully!</span>
                  </div>
                </div>
              )}

              {otpStatus === 'wrong' && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Wrong OTP! Please try again.</span>
                  </div>
                </div>
              )}

              {otpStatus === 'not-verified' && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-orange-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Please enter the OTP</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleCloseOtpModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyOtp}
                  disabled={otpStatus === 'sending' || otpStatus === 'verified'}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {otpStatus === 'sending' ? 'Sending...' : 'Verify'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Didn't receive the code? 
                  <button 
                    onClick={handleSendOtp}
                    className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
                  >
                    Resend
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Demo OTP: <span className="font-mono font-bold">123456</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
