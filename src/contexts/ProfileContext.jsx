import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = (userId) => {
    console.log(`Fetching profile for user ${userId}`);
    const storedProfile = localStorage.getItem(`profile_${userId}`);
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      setProfile(null);
    }
  };

  const updateProfile = (profileData) => {
    console.log('Updating/Creating profile:', profileData);
    setProfile(profileData);
    localStorage.setItem(`profile_${profileData.userId}`, JSON.stringify(profileData));
  };

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);