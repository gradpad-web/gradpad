import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios to fetch data from Strapi

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState({
    top: [],
    middle: [],
    bottom: []
  });

  // Fetch testimonials from Strapi
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials?populate=*`);
      const formattedTestimonials = response.data.data.map(testimonial => ({
        id: testimonial.id,
        name: testimonial.Name,
        title: testimonial.Title,
        info: testimonial.Info.map(info => info.children.map(child => child.text).join(' ')).join('\n\n'),
        // Placeholder image URL or real image field from Strapi API
        img: testimonial.Img ? `${testimonial.Img.url}` : "https://via.placeholder.com/500x500" // Handle image or fallback

      }));

      // Distribute testimonials into top, middle, and bottom categories based on logic or number of items
      const top = formattedTestimonials.slice(0, 3);
      const middle = formattedTestimonials.slice(3, 6);
      const bottom = formattedTestimonials.slice(6, 9);

      setTestimonials({ top, middle, bottom });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials(); // Fetch testimonials from Strapi on component mount
  }, []);

  return (
    <div className="bg-slate-950 py-12">
      <div className="mb-8 px-4">
        <h3 className="text-slate-50 text-4xl font-semibold text-center">
          Testimonials
        </h3>
        <p className="text-center text-slate-300 text-lg mt-8 max-w-xl mx-auto">
          Get inspired by the feedback of some students, who experienced perfect service and made
          their lives memorable.
        </p>
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-[1] bg-gradient-to-r from-slate-900 to-transparent" />

        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
        </div>
        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
        </div>

        <div className="absolute top-0 bottom-0 right-0 w-24 z-[1] bg-gradient-to-l from-slate-900 to-transparent" />
      </div>
    </div>
  );
};

const TestimonialList = ({ list, reverse = false, duration = 50 }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
          >
            <img src={t.img} className="w-full h-44 object-cover" alt={t.name} />
            <div className="bg-slate-900 text-slate-50 p-4">
              <span className="block font-semibold text-lg mb-1">{t.name}</span>
              <span className="block mb-3 text-sm font-medium">{t.title}</span>
              <span className="block text-sm text-slate-300">{t.info}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Testimonials;
