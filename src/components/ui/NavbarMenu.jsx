"use client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logoText from '../../assets/logo-text.png';
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer dark:text-neutral-50 text-black dark:hover:text-neutral-300 hover:text-black/[.7]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {

  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #008080 100%)`;

  return (
    <>
      {/* <Link to="/" className="z-[6] relative left-[50px] top-[2px]">
        <img src={logoText} alt="logo" />
      </Link> */}
      <div
        className="relative gap-2 pl-6 pr-1.5 rounded-full ms-auto shadow-input max-w-[520px] lg:max-w-[700px] ps-[15px] lg:pe-[100px] w-full dark:bg-slate-800/[.3] bg-white/[.3] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <nav
          onMouseLeave={() => setActive(null)} // resets the state
          className="relative flex justify-start lg:justify-center space-x-4 lg:space-x-10 py-5 items-center"
        >
          {children}
        </nav>
        <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
          <motion.div
            style={{
              backgroundImage,
            }}
            className="mask-with-browser-support absolute -inset-[1px] rounded-full border-[3px] border-transparent bg-origin-border"
          />
        </div>
      </div>

    </>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link to={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, to, ...rest }) => {
  return (
    <Link
      {...rest}
      to={to}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};
