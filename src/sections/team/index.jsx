import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import axios from "axios";

const Team = () => {
  const [items, setItems] = useState([]); // State to store the team members
  const targetRef = useRef(null); // Ref for scroll tracking
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Fetch team data from the API
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams?populate=Image`);
      const teamMembers = response.data.data.map((member) => ({
        id: member.id,
        title: member.Title,
        description: member.Description.map((desc) =>
          desc.children.map((child) => child.text).join(" ")
        ).join(" "),
        img: member.Image ? `${member.Image.url}` : null, // Fetch image URL
      }));
      setItems(teamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers(); // Fetch team members on component mount
  }, []);

  return (
    <>
      <div className="container mx-auto px-3 pt-10 md:pt-20">
        <div className="max-w-3xl text-center mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold capitalize mb-5 dark:text-white">
            Meet our team
          </h2>
          <p className="dark:text-neutral-300 text-xl">
            United by vision; Our Team at a time.
          </p>
        </div>
      </div>
      <section ref={targetRef} className="flex bg-black text-white">
        <Content content={items} />
        <Images content={items} scrollYProgress={scrollYProgress} />
      </section>
    </>
  );
};

const Content = ({ content }) => {
  return (
    <div className="w-full">
      {content.map(({ id, title, description }, idx) => (
        <div
          key={id}
          className={`p-3 sm:p-8 h-screen flex flex-col justify-center ${
            idx % 2
              ? "bg-white dark:bg-slate-800 text-black dark:text-white"
              : "bg-teal text-white"
          }`}
        >
          <h3 className="text-3xl font-medium mb-10">{title}</h3>
          <p className="font-light w-full max-w-md">{description}</p>
        </div>
      ))}
    </div>
  );
};

const Images = ({ content, scrollYProgress }) => {
  const top = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${(content.length - 1) * 100}vh`, "0vh"]
  );

  return (
    <div className="h-screen overflow-hidden sticky top-0 w-full">
      <motion.div style={{ top }} className="absolute left-0 right-0">
        {[...content].reverse().map(({ img, id, title }) => (
          <img
            key={id}
            alt={title}
            className="h-screen w-full object-cover"
            src={img || "https://via.placeholder.com/1000x1000"} // Fallback image if none
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Team;
