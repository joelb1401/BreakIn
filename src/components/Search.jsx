import React, { useState, Suspense, useEffect } from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import CanvasLoader from "./Loader";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";

const Professional = ({ index, name, title, profileImageUrl, profileUrl }) => (
  <Tilt className='w-full'>
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className='w-full green-purple-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-6 flex items-center'
      >
        <img
          src={profileImageUrl}
          alt={name}
          className='w-16 h-16 object-cover rounded-full mr-4'
        />
        <div className='flex-1'>
          <h3 className='text-white text-[20px] font-bold'>
            {name}
          </h3>
          <p className='text-secondary text-[14px] mt-1'>
            {title}
          </p>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className='text-blue-300 text-[14px] mt-2 inline-block'>
            View Profile
          </a>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const LoaderCanvas = () => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <CanvasLoader />
      </Suspense>
    </Canvas>
  );
};

const ProfileSelector = ({ profile, onProfileChange }) => (
  profile && (
    <select
      value={profile.name}
      onChange={(e) => onProfileChange(e.target.value)}
      className="p-2 rounded-md bg-white text-black"
    >
      <option value={profile.name}>{profile.name}</option>
    </select>
  )
);

const Search = () => {
  const { isAuthenticated, user } = useAuth();
  const { profile, fetchProfile } = useProfile();
  const [selectedProfile, setSelectedProfile] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile(user.id);
    }
  }, [isAuthenticated, user, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setSelectedProfile(profile.name);
    }
  }, [profile]);

  const handleSearch = async () => {
    if (!selectedProfile) {
      alert("Please create a profile before searching.");
      return;
    }

    setIsLoading(true);
    setHasSearched(false);

    try {
      const response = await fetch('/api/search-linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: selectedProfile }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error('Error searching for professionals:', error);
      alert('An error occurred while searching for professionals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Search For A <span className='text-[#4FC3F7]'>Professional</span>.</h2>
      </motion.div>

      <motion.p
        variants={textVariant()}
        className='mt-3 mb-8 text-[17px] leading-[30px] text-center'
      >
        {isAuthenticated ? (
          profile ?
            "Use your profile to find connections most relevant to you." :
            "Please create a profile before searching for professionals."
        ) : (
          "Log in and create your profile to search for relevant professionals."
        )}
      </motion.p>

      {isAuthenticated && (
        <motion.div
          variants={textVariant()}
          className='flex items-center justify-center gap-4 mb-10'>
          <ProfileSelector
            profile={profile}
            onProfileChange={setSelectedProfile}
          />
          {profile && (
            <button
              onClick={handleSearch}
              className="bg-tertiary text-white px-4 py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          )}
        </motion.div>
      )}

      {isLoading && (
        <div className='mt-10 h-[300px]'>
          <LoaderCanvas />
        </div>
      )}

      {hasSearched && !isLoading && (
        <div className='mt-5 w-full max-w-4xl mx-auto'>
          {searchResults.length > 0 ? (
            <div className='bg-white rounded-[20px] p-6'>
              <div className='flex flex-col gap-4'>
                {searchResults.map((professional, index) => (
                  <Professional key={professional.id} index={index} {...professional} />
                ))}
              </div>
            </div>
          ) : (
            <motion.p
              variants={fadeIn("up", "spring", 0.5, 0.75)}
              className='text-white text-[18px] font-medium text-center'
            >
              No results found for the selected profile. Please try a different profile.
            </motion.p>
          )}
        </div>
      )}

      <div className="flex justify-center mt-20">
        <a href='#profile'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Search, "search");