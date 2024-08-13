import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { tree } from "../constants";

const TreeNode = ({ node, depth = 0, scrollYProgress }) => {
  const nodeOpacity = useTransform(
    scrollYProgress,
    [depth * 0.02, 0.1 + depth * 0.02],
    [0, 1]
  );

  const lineOpacity = useTransform(
    scrollYProgress,
    [depth * 0.02, 0.12 + depth * 0.02],
    [0, 1]
  );

  return (
    <motion.div
      className="flex flex-col items-center relative"
      style={{ opacity: depth === 0 ? 1 : nodeOpacity }}
    >
      <img src={tree[0].icon} alt="Node Icon" className="w-28 h-28 object-contain mb-4 relative z-10" />

      <motion.div
        className="w-1 bg-white rounded-full mt-4"
        style={{ opacity: lineOpacity, height: "2rem" }}
      ></motion.div>

      {node.children && (
        <div className="flex justify-center gap-16 mt-8">
          {node.children.map((child, index) => (
            <TreeNode key={`child-${index}`} node={child} depth={depth + 1} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();

  return (
    <section className={`relative w-full min-h-screen mx-auto flex flex-col justify-between`}>
      <div className={`mt-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center gap-5`}>
        <div className='flex flex-row items-start gap-5'>
          <div className='flex flex-col justify-center items-center mt-5'>
            <div className='w-5 h-5 rounded-full bg-[#FEFEFE]'/>
            <div className='w-1 sm:h-60 h-40 white-gradient'/>
          </div>

          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>
              Let's get you <span className='text-[#4FC3F7]'>Connected</span>.
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Create or update your profile and find the <br className='sm:block hidden'/>
              <span className='text-[#4FC3F7]'>industry professionals</span> most helpful to you.
            </p>
          </div>
        </div>

        <div className="w-full mt-50">
          <TreeNode node={tree[0]} scrollYProgress={scrollYProgress} />
        </div>
      </div>

      <div className='w-full flex justify-center items-center py-5'>
        <a href='#about'>
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
    </section>
  );
};

export default Hero;