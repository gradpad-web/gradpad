import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineArrowUpward } from "react-icons/md";
import GetConnected from "../../components/modals/GetConnected";

const MagnetButton = () => {
  return (
    <div className="grid place-content-center p-4">
      <MagnetButtonInner />
    </div>
  );
};

const MagnetButtonInner = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, {
    mass: 3,
    stiffness: 400,
    damping: 50,
  });
  const ySpring = useSpring(y, {
    mass: 3,
    stiffness: 400,
    damping: 50,
  });

  const openModal = () => {
    setOpen(!open);
  };
  const closeModal = () => {
    setOpen(!open);
  };

  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #008080 100%)`;

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const { height, width, left, top } = ref.current.getBoundingClientRect();

    x.set(e.clientX - (left + width / 2));
    y.set(e.clientY - (top + height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => openModal()}
        style={{ transform }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative grid h-[180px] w-[180px] place-content-center rounded-full transition-colors duration-700 ease-out dark:bg-slate-800/[.3] bg-white/[.3] backdrop-blur-sm"
      >
        <MdOutlineArrowUpward className="pointer-events-none relative z-10 rotate-45 text-7xl text-teal transition-all duration-700 ease-out group-hover:rotate-90" />

        <div className="pointer-events-none absolute inset-0 z-0 scale-0 rounded-full bg-white transition-transform duration-700 ease-out group-hover:scale-100" />

        <motion.svg
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          style={{
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          width="170"
          height="170"
          className="pointer-events-none absolute z-10"
        >
          <path
            id="circlePath"
            d="M80,80 m-75,5 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0"
            fill="none"
          />
          <text>
            <textPath
              href="#circlePath"
              fill="black"
              className="fill-black text-xl uppercase opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            >
              Start your new chapter in a new city with us
            </textPath>
          </text>
        </motion.svg>
        <div className="cursor-pointer absolute inset-0 z-[1] rounded-full">
          <motion.div
            style={{
              backgroundImage,
            }}
            className="mask-with-browser-support absolute inset-[0px] rounded-full border-[4px] border-transparent bg-origin-border"
          />
        </div>
      </motion.button>
      <Transition show={open} as={Fragment}>
        <Dialog
          className="relative z-10"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={closeModal}
        >
          <GetConnected closeModal={closeModal} />
        </Dialog>
      </Transition>
    </>
  );
};

export default MagnetButton;