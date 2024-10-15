import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import { FaRegCopyright } from "react-icons/fa6"
import { Link } from "react-router-dom"
import SocialPlatforms from "../../components/ui/socialPlatforms"
import logo from '../../assets/logo.png';
import logoText from '../../assets/logo-text.png';
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

const Footer = ({phoneNumber, emailAddress, location}) => {

  const knowList = [
    {
      linkName: 'About us',
      url: '/about-us'
    },
    {
      linkName: 'Contact us',
      url: '/contact'
    },
    {
      linkName: 'Terms of Service',
      url: '/service-terms'
    },
    {
      linkName: 'Privacy Policy',
      url: '/privacy-policy'
    },
  ]

  return (
    <div className="bg-slate-200 dark:bg-slate-700 pt-16 pb-5 footer-bg bg-fixed">
      <div className="container mx-auto px-3">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="basis-2/3">
            <div className="flex flex-col lg:flex-row justify-between gap-5">
              <div className="w-full lg:max-w-[230px] xl:max-w-[300px]">
                <Link to="/" className="z-[6] flex-nowrap relative flex items-center gap-2">
                  <img src={logo} alt="logo" className="w-[45px]" />
                  <img src={logoText} alt="logo" className="h-[46px] invert" />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row w-full">
                <ul className="w-full">
                  <h5 className="font-bold mb-2 block">Get to know us</h5>
                  {
                    knowList.map((item, index) => (
                      <li key={index} className="my-3">
                        <Link to={item.url} className="text-teal inline-block hover:text-black link-anim">
                          {item.linkName}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
                <div className="w-full">
                  <h5 className="font-bold mb-2 block">Conatct information</h5>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <IoLocation size={24} className="text-neutral-900" />
                      <p>{location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhoneAlt size={20} className="text-neutral-900" />
                      <a className="link-anim" href="tel:1 (800) 921 89 15">{phoneNumber}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRegEnvelope size={20} className="text-neutral-900" />
                      <a className="link-anim" href="mailto:support@thegradpad.com">{emailAddress}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <SocialPlatforms />
          </div>
        </div>
        
        <div className="text-center pt-5 sm:pt-10">
          <FaRegCopyright size={12} className="inline" /> 2024 The Grad Pad. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer