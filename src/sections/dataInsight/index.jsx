import React from "react";
import { motion } from "framer-motion";

const DataInsight = ({ title, subtitle }) => {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <Content title={title} subtitle={subtitle} />
      <GradientGrid />
    </section>
  );
};

const Content = ({ title, subtitle }) => {
  const splitSubtitle = subtitle.split('\n'); // Handling line breaks in the subtitle

  return (
    <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 md:px-8 md:py-36">
      <motion.h1
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.25,
          ease: "easeInOut",
        }}
        className="mb-3 uppercase text-center font-bold leading-tight text-zinc-50 text-4xl md:text-6xl lg:text-8xl"
      >
        {title}
      </motion.h1>
      {splitSubtitle.map((line, index) => (
        <motion.p
          key={index}
          initial={{
            y: 25,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.25,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className="my-9 max-w-2xl text-center leading-relaxed text-zinc-400 text-lg md:text-2xl md:leading-relaxed"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
};

const GradientGrid = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(0 128 128 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </motion.div>
  );
};

export default DataInsight;
