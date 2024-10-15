import React, { useState, useEffect, useRef } from 'react';
import WAVES from 'vanta/dist/vanta.waves.min';
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";
import MagnetButton from '../../components/ui/MagnetButton';

const Hero = ({ title, video }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  const turn = useMotionValue(0);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: myRef.current,
        color: 0x000000,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 700.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        waveHeight: 20.00,
        waveSpeed: 1.25,
        zoom: 1.00,
        shininess: 150.00
      }));
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #008080 100%)`;

  return (
    <div ref={myRef} className='top-[-66px]'>
      <video className="w-full h-screen object-cover !z-auto" autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='max-w-7xl text-center mx-auto min-h-screen absolute left-0 right-0 top-0 flex flex-col justify-center items-center'>
        <h2 className='px-5 sm:px-10 text-white text-2xl sm:text-3xl md:text-5xl font-normal uppercase mb-5 mt-10 lg:mt-28 max-w-4xl !leading-normal'>
          {title}
        </h2>
        <MagnetButton /> 
      </div>
    </div>
  );
};

export default Hero;
