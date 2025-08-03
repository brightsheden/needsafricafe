import React, { useState } from 'react';
import { 
  FaEye, 
  FaEyeSlash, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaUserPlus,
  FaChevronDown
} from 'react-icons/fa';

// Type definitions
interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Editor' | 'Manager' | 'Admin';
  agreeToTerms: boolean;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

interface AlertState {
  type: 'success' | 'error';
  message: string;
}

interface PasswordStrength {
  strength: 'Weak' | 'Medium' | 'Strong';
  color: string;
  width: string;
}

interface InputFieldProps {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showToggle?: boolean;
  onToggle?: () => void;
  showValue?: boolean;
}

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const NGOAdminSignup: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  
  // Form state
  const [signupForm, setSignupForm] = useState<SignupForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Editor',
    agreeToTerms: false
  });

  // Validation states
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { strength: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 3) return { strength: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (): void => {
    const newErrors: ValidationErrors = {};
    
    if (!signupForm.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (signupForm.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';
    
    if (!signupForm.email) newErrors.email = 'Email is required';
    else if (!validateEmail(signupForm.email)) newErrors.email = 'Invalid email format';
    
    if (!signupForm.password) newErrors.password = 'Password is required';
    else if (signupForm.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!signupForm.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!signupForm.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setAlert({ type: 'success', message: 'Account request submitted! Administrator will review and activate your account.' });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const Alert: React.FC<AlertProps> = ({ type, message }) => (
    <div className={`fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 
      'bg-red-100 border border-red-400 text-red-700'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {type === 'success' ? 
            <FaCheckCircle className="mr-2" /> : 
            <FaExclamationCircle className="mr-2" />
          }
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button 
          onClick={() => setAlert(null)}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );

  const InputField: React.FC<InputFieldProps> = ({ 
    icon: Icon, 
    type, 
    placeholder, 
    value, 
    onChange, 
    error, 
    showToggle = false, 
    onToggle, 
    showValue = false 
  }) => (
    <div className="relative">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type={showToggle ? (showValue ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          className={`w-full pl-10 pr-${showToggle ? '12' : '4'} py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {showToggle && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showValue ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      {alert && <Alert type={alert.type} message={alert.message} />}
      
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <FaUserPlus className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Signup</h1>
            <p className="text-gray-600 text-sm">
              Request admin access to join our NGO dashboard.
            </p>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            <InputField
              icon={FaUser}
              type="text"
              placeholder="Full Name"
              value={signupForm.fullName}
                onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
              error={errors.fullName}
            />
            
            <InputField
              icon={FaEnvelope}
              type="email"
              placeholder="Email address"
              value={signupForm.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setSignupForm({...signupForm, email: e.target.value})
              }
              error={errors.email}
            />

            <div>
              <InputField
                icon={FaLock}
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setSignupForm({...signupForm, password: e.target.value})
                }
                error={errors.password}
                showToggle={true}
                onToggle={() => setShowPassword(!showPassword)}
                showValue={showPassword}
              />
              
              {/* Password Strength Meter */}
              {signupForm.password && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Password Strength</span>
                    <span className="font-medium">{calculatePasswordStrength(signupForm.password).strength}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${calculatePasswordStrength(signupForm.password).color}`}
                      style={{width: calculatePasswordStrength(signupForm.password).width}}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Use 8+ characters with uppercase, lowercase, numbers & symbols
                  </div>
                </div>
              )}
            </div>
            
            <InputField
              icon={FaLock}
              type="password"
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setSignupForm({...signupForm, confirmPassword: e.target.value})
              }
              error={errors.confirmPassword}
              showToggle={true}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              showValue={showConfirmPassword}
            />

   

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center">
                <FaUserPlus className="mr-2" />
                Request Admin Account
              </div>
            </button>

            <div className="text-center">
              <span className="text-gray-600 text-sm">Already have an account? </span>
              <button
                type="button"
                className="text-green-800 hover:text-green-900 font-medium text-sm hover:underline"
              >
                Sign in here
              </button>
            </div>

          
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default NGOAdminSignup;