import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useAuth } from '../contexts/AuthContext';
import { fadeIn } from "../utils/motion";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, checkUserExists } = useAuth();

  const scrollToProfile = () => {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (checkUserExists(email)) {
        setError('An account with this email already exists. Please log in.');
      } else {
        const success = signup({ email, password });
        if (success) {
          scrollToProfile();
        } else {
          setError('Failed to create an account. Please try again.');
        }
      }
    } else {
      const success = login({ email, password });
      if (success) {
        scrollToProfile();
      } else {
        if (checkUserExists(email)) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('Account does not exist. Please sign up.');
        }
      }
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className='mt-5 flex flex-col items-center gap-4'
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium w-full max-w-md"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium w-full max-w-md"
      />
      {isSignup && (
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium w-full max-w-md"
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <motion.button
        type="submit"
        className="bg-white py-3 px-8 rounded-xl outline-none w-fit text-[#4FC3F7] font-bold shadow-md shadow-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSignup ? 'Sign Up' : 'Log In'}
      </motion.button>
      <p className="text-secondary text-[14px] mt-2">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <button
          type="button"
          onClick={toggleMode}
          className="ml-2 text-white font-medium underline"
        >
          {isSignup ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </motion.form>
  );
};

export default LoginForm;