import React from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-purple-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-25 h-25 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
      <>
          <motion.div variants={textVariant()}>
              <h2 className={styles.sectionHeadText}>Break<span className='text-[#4FC3F7]'>In</span>.</h2>
          </motion.div>

          <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-3 mb-8 text-[17px] leading-[30px] text-center'
          >
              Break<span className='text-[#4FC3F7]'>In</span> is a service that finds the <span
              className='text-[#4FC3F7]'>industry professionals</span> most
              relevant to you. You can then connect with these professionals and reach out to them to <span
              className='text-[#4FC3F7]'>gain
              an edge</span> in your industry.
          </motion.p>

          <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-3 mb-8 text-[17px] leading-[30px] text-center'
          >
              We also use AI to write the <span className='text-[#4FC3F7]'>perfect message</span> to kickstart your
              relationship
              with your newest connection, utilizing everything that you have in common.

          </motion.p>

          <div className='mt-20 flex flex-wrap justify-center gap-10'>
              {services.map((service, index) => (
                  <ServiceCard key={service.title} index={index} {...service} />
              ))}
          </div>

          <div className="flex justify-center mt-20">
              <a href='#search'>
                  <div
                      className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
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

export default SectionWrapper(About, "about");