import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SiAccenture,
  SiAdobe,
  SiCoinbase,
  SiFacebook,
  SiPatreon,
  SiReddit,
  SiYoutube,
} from "react-icons/si";

const SocialPlatforms = () => {
  return (
    <div className="grid sm:place-content-center overflow-hidden">
      <SpinningLogos />
    </div>
  );
};

const SpinningLogos = () => {
  const { width } = useWindowSize();

  const [sizes, setSizes] = useState({
    radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
    iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
    ringPadding: RING_PADDING.lg,
    logoFontSize: LOGO_FONT_SIZE.lg,
  });

  useEffect(() => {
    if (!width) return;

    if (width < BREAKPOINTS.sm) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.sm,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.sm,
        ringPadding: RING_PADDING.sm,
        logoFontSize: LOGO_FONT_SIZE.sm,
      });
    } else if (width < BREAKPOINTS.md) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.md,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.md,
        ringPadding: RING_PADDING.md,
        logoFontSize: LOGO_FONT_SIZE.md,
      });
    } else {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
        ringPadding: RING_PADDING.lg,
        logoFontSize: LOGO_FONT_SIZE.lg,
      });
    }
  }, [width]);

  return (
    <div
      style={{
        width:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
        height:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
      }}
      className="grid place-content-center rounded-full"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={TRANSITION}
        style={{
          width:
            sizes.radiusToCenterOfIcons -
            sizes.iconWrapperWidth -
            sizes.ringPadding,
          height:
            sizes.radiusToCenterOfIcons -
            sizes.iconWrapperWidth -
            sizes.ringPadding,
        }}
        className="relative grid place-items-center rounded-full"
      >
        {/* <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={TRANSITION}
          className="text-lg font-bold uppercase text-neutral-900 sm:text-xl md:text-3xl"
        >
          YOUR LOGO
        </motion.div> */}
        {ICON_DATA.map((icon, idx) => {
          const degrees = (360 / ICON_DATA.length) * idx;
          return (
            <motion.div
              key={idx}
              style={{
                marginTop:
                  sizes.radiusToCenterOfIcons *
                  Math.sin(degreesToRadians(degrees)),
                marginLeft:
                  sizes.radiusToCenterOfIcons *
                  Math.cos(degreesToRadians(degrees)),
                width: sizes.iconWrapperWidth,
                height: sizes.iconWrapperWidth,
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={TRANSITION}
              className={`absolute grid place-content-center rounded-full shadow-lg ${icon.className}`}
            >
              <a href={icon.link} target="_blank">
                <icon.Icon
                  style={{
                    fontSize: sizes.logoFontSize,
                  }}
                />
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SocialPlatforms;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const ICON_DATA = [
  {
    Icon: SiFacebook,
    className: "bg-[#0766FF] text-white",
    link: "#"
  },
  {
    Icon: SiYoutube,
    className: "bg-[#FF0200] text-white",
    link: "#"
  },
  {
    Icon: SiAccenture,
    className: "bg-[#A101FF] text-white",
    link: "#"
  },
  {
    Icon: SiAdobe,
    className: "bg-[#CE0E03] text-white",
    link: "#"
  },
  {
    Icon: SiReddit,
    className: "bg-[#FF4500] text-white",
    link: "#"
  },
  {
    Icon: SiCoinbase,
    className: "bg-[#0052FF] text-white",
    link: "#"
  },
  {
    Icon: SiPatreon,
    className: "bg-[#F96C59] text-white",
    link: "#"
  },
];

// Defines the distance from the center of the circle to the center
// of the icons
const RADIUS_TO_CENTER_OF_ICONS = {
  sm: 150,
  md: 200,
  lg: 250,
};
// Defines the width of the icon circles
const ICON_WRAPPER_WIDTH = {
  sm: 35,
  md: 45,
  lg: 60,
};
// Defines the padding between the icon circles and the inner and outer rings
const RING_PADDING = {
  sm: 4,
  md: 8,
  lg: 10,
};
// Defines the font size for logos
const LOGO_FONT_SIZE = {
  sm: 18,
  md: 24,
  lg: 36,
};

const BREAKPOINTS = {
  sm: 480,
  md: 768,
};

const TRANSITION = {
  repeat: Infinity,
  repeatType: "loop",
  duration: 50,
  ease: "linear",
};