import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import LoginForm from "./LoginForm";
import EditProfileForm from "./EditProfileForm";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { profile, fetchProfile, updateProfile } = useProfile();
  const [currentView, setCurrentView] = useState("login");

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile(user.id);
      setCurrentView("editProfile");
    } else {
      setCurrentView("login");
    }
  }, [isAuthenticated, user, fetchProfile]);

  const handleLogout = () => {
    logout();
    setCurrentView("login");
  };

  const renderContent = () => {
    switch (currentView) {
      case "login":
        return <LoginForm />;
      case "editProfile":
        return (
          <EditProfileForm
            profile={profile || {}}
            onSubmit={(data) => updateProfile({...data, userId: user.id})}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  const getDescriptionText = () => {
    switch (currentView) {
      case "login":
        return "Log in to access your profile.";
      case "editProfile":
        return profile ? "Update your profile information if necessary." : "Create your profile by filling out the information below.";
      default:
        return "";
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>
          {currentView === "login" ? "Log In to Your " : "Edit Your "}
          <span className='text-[#4FC3F7]'>Profile</span>.
        </h2>
      </motion.div>

      <motion.p
        variants={textVariant()}
        className='mt-3 mb-8 text-[17px] leading-[30px] text-center'
      >
        {getDescriptionText()}
      </motion.p>

      {renderContent()}

      <div className="flex justify-center mt-20">
        <a href='#contact'>
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

export default SectionWrapper(Profile, "profile");