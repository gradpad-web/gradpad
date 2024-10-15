import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";

const AccordionItem = ({ header, ...rest }) => {
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
      <div className="relative w-full mb-3 rounded-[6px] border border-teal show-border-outter">
        <Item
          {...rest}
          header={({ state: { isEnter } }) => (
            <>
              {header}
              <IoIosArrowDown className={`ml-auto transition-transform duration-200 ease-out ${isEnter && "rotate-180"}`} style={{flex: "0 0 16px"}} />
            </>
          )}
          className="relative z-[2]"
          buttonProps={{
            className: ({ isEnter }) =>
              `flex w-full text-teal font-semibold p-4 text-left rounded-[6px] gap-2 ${isEnter && "!text-white !bg-teal !rounded-t-md !rounded-b-none "}`
          }}
          contentProps={{
            className: "transition-height duration-200 ease-out"
          }}
          panelProps={{ className: "p-4 dark:text-white" }}
        />

        <div className="pointer-events-none absolute inset-0 z-[1] rounded-[6px]">
          <motion.div
            style={{
              backgroundImage,
            }}
            className="mask-with-browser-support absolute inset-[0px] rounded-[6px] show-border border-transparent bg-origin-border"
          />
        </div>
      </div>
    </>
  );
};

const Faq = () => {
  const [faqList, setFaqList] = useState([]);

  // Fetch FAQs from Strapi
  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/faqs?populate=*`);
      const formattedFaqs = response.data.data.map(faq => ({
        question: faq.Question,
        answer: faq.Answer.map(ans => ans.children.map(child => child.text).join('')).join(' ')
      }));

      setFaqList(formattedFaqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="container mx-auto px-3 py-10">
      <div className="max-w-3xl text-center mx-auto mb-5">
        <h2 className="text-2xl md:text-4xl font-semibold mb-5 dark:text-white">FAQs</h2>
        <p className="dark:text-neutral-300">Ask away to find your perfect place! We have got answers.</p>
      </div>
      <div className="my-4 max-w-4xl mx-auto">
        <Accordion transition transitionTimeout={200}>
          {
            faqList.map((item, index) => (
              <AccordionItem 
                key={index} 
                header={item.question} 
                initialEntered={index === 0}
              >
                {/* Render the HTML content safely using dangerouslySetInnerHTML */}
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </AccordionItem>
            ))
          }
        </Accordion>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  header: PropTypes.any,
};

export default Faq;
