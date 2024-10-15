import { Fragment, useEffect } from "react";
import { DialogPanel, TransitionChild } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import PropTypes from 'prop-types';
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function GetConnected({ closeModal, phoneNumber, emailAddress, location }) {

  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize AOS options here
    });
    AOS.refresh(); // Refresh AOS to reapply animations
  }, []);

  return (
    <>
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl footer-bg">
              <div className="bg-white/[.5] dark:bg-black/[.7]">
                <div data-aos="fade-left" className="flex justify-end pt-3 me-3">
                  <button className="text-black dark:text-white" onClick={closeModal}>
                    <IoClose size={20} />
                  </button>
                </div>
                <div className="p-5 pt-0">
                  <div>
                    <h2 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" className="text-4xl font-semibold leading-normal text-gray-900 dark:text-white">
                      Contact us
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-black dark:text-white">
                      If you are interested or have any questions, send us a message.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5 w-full h-[calc(100vh-190px)] sm:h-auto overflow-y-auto pt-5">
                  <div className="w-full">
                      <div className="flex flex-col gap-5">
                        <h5 className="dark:text-white text-gray-900 text-2xl font-medium">Contact information</h5>
                        <div className="flex gap-3">
                          <IoLocation size={24} className="text-neutral-600 dark:text-neutral-300" />
                          <p className="text-black dark:text-white">{location}</p>
                        </div>
                        <div className="flex gap-3">
                          <FaPhoneAlt size={24} className="text-neutral-600 dark:text-neutral-300" />
                          <p className="text-black dark:text-white">{phoneNumber}</p>
                        </div>
                        <div className="flex gap-3">
                          <FaRegEnvelope size={24} className="text-neutral-600 dark:text-neutral-300" />
                          <p className="text-black dark:text-white">{emailAddress}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-7 gap-5">
                        <Link to="#"><FaFacebookF size={32} className="text-teal" /></Link>
                        <Link to="#"><FaInstagram size={32} className="text-teal" /></Link>
                        <Link to="#"><FaTwitter size={32} className="text-teal" /></Link>
                      </div>
                    </div>
                    <div className="w-full">
                      <form>
                        <div className="pb-8 space-y-5">
                          <div className="relative">
                            <Input type="text" label="Name" required={true} />
                            <FaUser className="absolute bottom-4 right-3 text-black dark:text-white" />
                          </div>
                          <div className="relative">
                            <Input type="email" label="Email" required={true} />
                            <FaEnvelope className="absolute bottom-4 right-3 text-black dark:text-white" />
                          </div>
                          <Textarea rows={3} label="Ask us anything?" required={true} />
                        </div>

                        <div className="flex justify-end items-center space-x-3">
                          <button
                            type="button"
                            className="ease-in-out duration-500 leading-5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-auto"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="ease-in-out duration-500 border border-teal leading-5 rounded-full bg-teal px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-teal sm:ml-3 w-auto"
                            onClick={() => console.log("Active")}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div >
    </>
  );
}

GetConnected.propTypes = {
  closeModal: PropTypes.any,
};

export default GetConnected;
