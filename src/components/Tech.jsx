import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const TechCard = ({ index, name, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {name}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const Tech = () => {
  return (
      <>
          <motion.div variants={textVariant()}>
              <h2 className={styles.sectionHeadText}>Skills.</h2>
          </motion.div>

          <div className='mt-20 flex flex-wrap gap-10'>
              {technologies.map((technology, index) => (
                  <TechCard key={technology.title} index={index} {...technology} />
              ))}
          </div>
      </>
  );
};

export default SectionWrapper(Tech, "tech");