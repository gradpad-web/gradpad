import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FloatingNav } from "../../components/ui/FloatingNavbar";
import { Link } from "react-router-dom";
import GetConnected from "../../components/modals/GetConnected";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import logo from '../../assets/logo.png';
import logoText from '../../assets/logo-text.png';
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";

const Navbar = ({ logoUrl, phoneNumber, emailAddress, location }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #008080 100%)`;

  const [dark, setDark] = useState(() => {
    // Initialize dark mode based on local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      return true;
    } else if (storedTheme === 'light') {
      return false;
    } else {
      // If no theme is set in local storage, use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  const darkModeHandler = () => {
    // Toggle dark mode and update local storage
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleSystemThemeChange = () => {
      // Update local storage only if the theme is not explicitly set by the user
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === null) {
        setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    // Listen for changes in system color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);

    return () => {
      // Clean up the listener when component unmounts
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    // Apply the theme class to document element based on dark mode state
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const openModal = () => {
    setOpen(!open);
  };
  const closeModal = () => {
    setOpen(!open);
  };

  const toggleSidebar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <>
      <div className="container relative z-[8] mx-auto h-[66px]">
        <div className="mt-2 md:mt-0 mx-auto flex items-center justify-center container fixed h-[64px] md:h-auto rounded-full dark:md:bg-transparent dark:bg-slate-800/[.3] bg-white/[.3] md:bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:shadow-none mobile-nav">
          <Link to="/" className="z-[6] relative flex items-center gap-1 -top-[2px] md:top-[10px] md:py-[6.5px] md:px-6 md:rounded-full md:bg-black md:dark:bg-white">


            <img className="w-[45px]" src={logoUrl} alt="logo" />

            <img className="h-[46px] dark:invert hidden md:block" src={logoText} alt="logo text" />
            <div className="pointer-events-none absolute inset-0 z-[1] rounded-full hidden md:block">
              <motion.div
                style={{
                  backgroundImage,
                }}
                className="mask-with-browser-support absolute inset-[0px] rounded-full border-[3px] border-transparent bg-origin-border"
              />
            </div>
          </Link>
          <FloatingNav className="hidden md:flex" />

          <label id="theme-toggle-button" className="flex md:!hidden ms-auto me-4 z-[6] relative -top-[13px] md:-top-[7px]">
            <input type="checkbox" id="toggle" onClick={() => darkModeHandler()} />
            <svg viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(3.5 3.5)" data-name="Component 15 – 1" id="Component_15_1">


                <g filter="url(#container)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                  <rect fill="#83cbd8" transform="translate(3.5 3.5)" rx="17.5" height="35" width="60.667" data-name="container" id="container"></rect>
                </g>

                <g transform="translate(2.333 2.333)" id="button">

                  <g data-name="sun" id="sun">
                    <g filter="url(#sun-outer)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                      <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2"></circle>
                    </g>
                    <g filter="url(#sun)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                      <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3"></path>
                    </g>
                    <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" id="sun-inner"></circle>
                  </g>


                  <g data-name="moon" id="moon">
                    <g filter="url(#moon)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
                      <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3"></circle>
                    </g>
                    <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches">
                      <circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2"></circle>
                      <circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2" data-name="patch"></circle>
                      <circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1" data-name="patch"></circle>
                      <circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1" data-name="patch"></circle>
                      <circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1" data-name="patch"></circle>
                      <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch"></circle>
                    </g>
                  </g>
                </g>


                <g filter="url(#cloud)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                  <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud"></path>
                </g>


                <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars">
                  <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z"></path>
                  <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star"></path>
                  <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" data-name="star"></path>
                  <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" data-name="star"></path>
                  <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" data-name="star"></path>
                  <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" data-name="star"></path>
                  <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" data-name="star"></path>
                  <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" data-name="star"></path>
                </g>
              </g>
            </svg>
          </label>
          <button onClick={() => openModal()} className="md:ms-auto border border-transparent hover:border-teal text-white duration-300 relative group cursor-pointer overflow-hidden z-[6] h-[50px] w-[150px] rounded-full bg-teal p-2 top-0 md:top-2 right-[9px] font-bold">
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-10 bg-yellow-500"></div>
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-500"></div>
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-500"></div>
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-10 bg-red-600"></div>
            <p className="z-10 absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">Get connected</p>
          </button>
          <button className="flex md:hidden text-black dark:text-white me-2" onClick={toggleSidebar}>
            <BiMenu size={30} />
          </button>
          <Transition show={open} as={Fragment}>
            <Dialog
              className="relative z-10"
              initialFocus={cancelButtonRef}
              open={open}
              onClose={closeModal}
            >
            <GetConnected 
            closeModal={closeModal} 
            phoneNumber={phoneNumber} 
            emailAddress={emailAddress} 
            location={location}
          />
            </Dialog>
          </Transition>
          <div className="pointer-events-none block md:hidden absolute inset-0 z-10 rounded-full">
            <motion.div
              style={{
                backgroundImage,
              }}
              className="mask-with-browser-support absolute -inset-[1px] rounded-full border-[3px] border-transparent bg-origin-border"
            />
          </div>
        </div>
      </div>
      <div className='block md:hidden'>
        <div className={`${navbarOpen ? 'left-0' : '-left-[800px]'} w-full bg-gray-600 dark:bg-gray-800 transition-all duration-300 fixed md:absolute h-screen top-0 z-20`}>
          <div className="h-full p-4 text-white">
            <div className="flex justify-between items-start">
              <Link to='/' className="flex gap-1">
                <img className="w-[45px]" src={logo} alt="logo" />
                <img src={logoText} alt="logo" />
              </Link>
              <button type="button" className="text-white" onClick={toggleSidebar}>
                <IoClose size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <Link to="/"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Home
              </Link>
              <Link to="/renting-101"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Renting 101
              </Link>
              <Link to="/service1"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Service1
              </Link>
              <Link to="/service2"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Service2
              </Link>
              <Link to="/service3"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Service3
              </Link>
              <Link to="/service4"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Service4
              </Link>
              <Link to="/contact"
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-teal"
                onClick={toggleSidebar}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
