import React, { useState, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import axios from "axios"; // To fetch data from Strapi

const FutureTogether = () => {
  const [sdgPlans, setSdgPlans] = useState([]); // State to store SDG plans

  // Fetch SDG Plan data from Strapi API
  const fetchSDGPlans = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sdg-plans?populate=*`);
      const formattedData = response.data.data.map(plan => ({
        id: plan.id,
        title: plan.Title,
        description: plan.Description.map(desc => desc.children.map(child => child.text).join(' ')).join(' '),
        position: plan.Position,
      }));
      setSdgPlans(formattedData); // Set the formatted data in state
    } catch (error) {
      console.error("Error fetching SDG Plans:", error);
    }
  };

  useEffect(() => {
    fetchSDGPlans(); // Fetch data when the component is mounted
  }, []);

  return (
    <>
      <div className="relative h-fit bg-indigo-50 dark:bg-slate-900">
        <Features sdgPlans={sdgPlans} />
      </div>
    </>
  );
};

const Features = ({ sdgPlans }) => {
  return (
    <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
      <Copy />
      <Carousel sdgPlans={sdgPlans} />
    </div>
  );
};

const Copy = () => {
  return (
    <div className="flex h-fit w-full flex-col justify-center py-12 md:sticky md:top-0 md:h-screen">
      <span className="w-fit rounded-full bg-teal px-4 py-2 text-sm capitalize text-white font-semibold">
        Our SDGs plan
      </span>
      <h2 className="mb-4 mt-2 text-5xl font-medium leading-tight dark:text-white">
        Building a Better Future Together
      </h2>
      <p className="text-lg text-indigo-950 dark:text-neutral-300 max-w-lg">
        At After Grad Pad, we are committed and passionate to contribute our role in sustainable 
        development. Here’s how we’re aligning with the United Nations’ Sustainable Development Goals 
        (SDGs) to make a positive impact:
      </p>
    </div>
  );
};

const Carousel = ({ sdgPlans }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div className="relative w-full">
      <Gradient />

      <div ref={ref} className="relative z-0 flex flex-col gap-6 md:gap-12">
        {sdgPlans.map((plan, index) => (
          <CarouselItem
            key={plan.id}
            scrollYProgress={scrollYProgress}
            position={plan.position}
            numItems={sdgPlans.length}
            title={plan.title}
            description={plan.description}
          />
        ))}
      </div>

      <Buffer />
    </div>
  );
};

const CarouselItem = ({ scrollYProgress, position, numItems, title, description }) => {
  const stepSize = 1 / numItems;
  const end = stepSize * position;
  const start = end - stepSize;

  const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.75]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
      }}
      className="grid aspect-video w-full shrink-0 place-content-center rounded-2xl bg-teal"
    >
      <div className="flex flex-col justify-center p-5 py-10 sm:p-10 lg:p-20">
        <h4 className="text-white text-2xl font-bold mb-5">{title}</h4>
        <p className="text-white">{description}</p>
      </div>
    </motion.div>
  );
};

const Gradient = () => (
  <div className="sticky top-0 z-[1] hidden h-24 w-full bg-gradient-to-b from-indigo-50 dark:from-slate-900 to-indigo-50/0 md:block" />
);

const Buffer = () => <div className="h-24 w-full md:h-48" />;

export default FutureTogether;
