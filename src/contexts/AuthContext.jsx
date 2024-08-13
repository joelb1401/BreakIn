import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const storedUser = localStorage.getItem(`user_${userData.email.replace('@', '_at_')}`);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === userData.password) {
        setUser(parsedUser);
        localStorage.setItem('currentUser', JSON.stringify(parsedUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const signup = (userData) => {
    const userId = `user_${userData.email.replace('@', '_at_')}`;
    if (localStorage.getItem(userId)) {
      return false;
    }
    const newUser = { ...userData, id: userId };
    localStorage.setItem(userId, JSON.stringify(newUser));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const checkUserExists = (email) => {
    const userId = `user_${email.replace('@', '_at_')}`;
    return !!localStorage.getItem(userId);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, checkUserExists, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);