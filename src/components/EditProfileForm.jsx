import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { useAuth } from "../contexts/AuthContext";

const FormField = ({ name, value, onChange, onDelete, showDeleteButton }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="bg-white py-2 px-3 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium flex-grow mr-2"
        />
        {showDeleteButton && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg"
          >
            -
          </button>
        )}
      </div>
    </div>
  );
};

const EditProfileForm = ({ profile, onSubmit }) => {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    desiredPosition: [''],
    desiredCompany: [''],
    desiredIndustry: [''],
    age: '',
    experience: [''],
    education: [''],
    skills: [''],
    interests: [''],
    projects: [''],
  });

  useEffect(() => {
    if (profile && Object.keys(formData).every(key => !formData[key] || (Array.isArray(formData[key]) && formData[key].length === 1 && formData[key][0] === ''))) {
      setFormData(prevData => ({
        ...prevData,
        ...profile,
        desiredPosition: profile.desiredPosition || [''],
        desiredCompany: profile.desiredCompany || [''],
        desiredIndustry: profile.desiredIndustry || [''],
        experience: profile.experience || [''],
        education: profile.education || [''],
        skills: profile.skills || [''],
        interests: profile.interests || [''],
        projects: profile.projects || [''],
      }));
    }
  }, [profile]);

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      const newArray = [...formData[field]];
      newArray[index] = value;
      setFormData(prevData => ({
        ...prevData,
        [field]: newArray
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleAdd = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], '']
    }));
  };

  const handleDelete = (field, index) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index)
    }));
  };

  const scrollToProfile = () => {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    scrollToProfile();
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload(); // Refresh the page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fields = ['name', 'desiredPosition', 'desiredCompany', 'desiredIndustry', 'age', 'experience', 'education', 'skills', 'interests', 'projects'];
  const multiEntryFields = ['desiredPosition', 'desiredCompany', 'desiredIndustry', 'experience', 'education', 'skills', 'interests', 'projects'];

  const canAddNewEntry = (field) => {
    return formData[field].some(entry => entry.trim() !== '');
  };

  const getFieldLabel = (field) => {
    switch (field) {
      case 'projects': return 'Projects & Other Completions';
      case 'desiredPosition': return 'Desired Position';
      case 'desiredCompany': return 'Desired Company';
      case 'desiredIndustry': return 'Desired Industry';
      default: return field;
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className='mt-5 flex flex-col items-center w-full max-w-2xl mx-auto'
    >
      {fields.map((field) => (
        <div key={field} className="w-full mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-white text-sm font-bold capitalize">
              {getFieldLabel(field)}
            </label>
            {multiEntryFields.includes(field) && canAddNewEntry(field) && (
              <button
                type="button"
                onClick={() => handleAdd(field)}
                className="bg-white text-[#4FC3F7] font-bold py-1 px-2 rounded-lg text-sm"
              >
                + Add {field === 'projects' ? 'project' : field.replace('desired', '').toLowerCase()}
              </button>
            )}
          </div>
          {multiEntryFields.includes(field) && (
            <p className="text-white text-xs mb-2">
              {['desiredPosition', 'desiredCompany', 'desiredIndustry'].includes(field) ? 'Top entry is the most desired.' : ''}
            </p>
          )}
          {multiEntryFields.includes(field) ? (
            formData[field].map((item, index) => (
              <FormField
                key={`${field}-${index}`}
                name={`${field}-${index}`}
                value={item}
                onChange={(e) => handleChange(e, index, field)}
                onDelete={() => handleDelete(field, index)}
                showDeleteButton={formData[field].length > 1}
              />
            ))
          ) : (
            <FormField
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <div className="flex justify-center items-center gap-4 mt-6">
        <motion.button
          type="submit"
          className={`sm:text-[18px] text-[14px] uppercase tracking-wider text-center bg-white py-3 px-8 rounded-xl outline-none w-fit text-[#4FC3F7] font-bold shadow-md shadow-primary`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
        <motion.button
          type="button"
          onClick={handleLogout}
          className={`sm:text-[18px] text-[14px] uppercase tracking-wider text-center bg-red-500 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.form>
  );
};

export default EditProfileForm;