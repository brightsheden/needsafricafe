import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Lock, Shield } from 'lucide-react';
import LoginBg from "@/assets/loginbg.jpg"
import NeedAfricaLogo from "@/assets/logo.png"
import { useLogin } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const {mutate: login, isPending, isSuccess,isError, error, data} = useLogin()

  const handleSubmit = async () => {
    login({username, password})

    

  };

  useEffect(()=>{
    if(isSuccess){
      localStorage.setItem('userInfo', JSON.stringify(data));
      // UserStore.update(s => {
      //   s.user = data;
      //   s.isLoggedIn = true;
      // });
      navigate('/');
    }
  },[isSuccess])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${LoginBg})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-primary/20">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <img src={NeedAfricaLogo} alt='logo' className='w-20 h-20 object-contain' />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-primary mb-1 font-serif tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground font-medium">Sign in to the Admin Panel</p>
          </div>

          {/* Login Form */}
          <div className="space-y-7">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-primary/40" />
                </div>
                <input
                  id="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-primary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background text-primary placeholder:text-primary/30 font-medium"
                  placeholder="admin@company.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary/40" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-primary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background text-primary placeholder:text-primary/30 font-medium"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-primary/40 hover:text-primary transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary/40 hover:text-primary transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-primary/30 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-primary font-medium">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline font-semibold">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-bold hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In to Admin Panel'
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-muted-foreground font-medium">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
    </div>
  );
};

export default AdminLogin;