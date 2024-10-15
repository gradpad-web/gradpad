import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // State to store images fetched from Strapi
  const [images, setImages] = useState([]);

  // Fetch gallery images from Strapi
  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries?populate=*`);
      
      const formattedImages = response.data.data.map(image => ({
        id: image.id,
        url: image.Image?.url || "", // Access Image directly, assuming Image exists without the attributes key
        altText: image.Caption || "Gallery Image", // Handle alt text directly
      }));
      
      setImages(formattedImages);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <>
      <section ref={targetRef} className="bg-white dark:bg-slate-800 h-[350vh]">
        <div className="h-screen sticky top-0 z-0 grid grid-cols-3 grid-rows-3 gap-4 p-4 overflow-hidden">
          <Copy scrollYProgress={scrollYProgress} />
          <Images scrollYProgress={scrollYProgress} images={images} />
          <Circles />
        </div>
      </section>
    </>
  );
};

const Copy = ({ scrollYProgress }) => {
  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute px-8 w-full h-screen z-[1] flex flex-col items-center justify-center sm:gap-5"
    >
      <h1 className="text-stone-950 dark:text-white capitalize text-3xl sm:text-5xl md:text-7xl font-semibold text-center max-w-xl">
        Photo gallery
      </h1>
      <p className="text-stone-600 dark:text-neutral-300 text-sm md:text-base text-center max-w-xl my-6">
        Take a look at the After Grad Pad community and explore our dynamic photo gallery from
        cozy corners to energetic social spaces. We offer modern amenities, stylish interiors, and an
        attractive environment, that makes our accommodations the perfect home away from home.
      </p>
    </motion.div>
  );
};

const Images = ({ scrollYProgress, images }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const image1Offset = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  return (
    <>
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          className={`relative z-10 ${
            index % 2 === 0 ? "col-span-2" : "row-span-2"
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            scale,
            x: index === 0 ? image1Offset : image2OffsetX,
            y: index === 1 ? image2OffsetY : image3OffsetY,
          }}
        />
      ))}
    </>
  );
};

const Circles = () => (
  <>
    <div className="w-3/5 max-w-[850px] min-w-[400px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 left-0 top-0 -translate-x-[50%] -translate-y-[50%]" />
    <div className="w-1/2 max-w-[600px] min-w-[300px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 right-0 bottom-0 translate-x-[50%] translate-y-[50%]" />
  </>
);

export default Gallery;
