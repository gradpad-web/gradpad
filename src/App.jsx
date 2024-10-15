import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';

import Navbar from "./sections/navbar/Navbar";
import Home from "./Home";
import Footer from "./sections/footer/Footer";
import Renting101 from "./components/renting101/Renting101";
import ServiceDetails from "./components/services/ServicesDetail"; // Single dynamic component

const App = () => {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    async function fetchSiteSettings() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/site-settings/?populate=*`);
        setSiteSettings(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    }
    fetchSiteSettings();
  }, []);

  if (!siteSettings) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  // Extract logo and contact information from site settings
  const logoUrl = siteSettings?.LOGO?.url ? `${siteSettings.LOGO.url}` : '/path/to/fallback-logo.png';
  const phoneNumber = siteSettings?.PhoneNumber || '1 (800) 921 89 15'; // Fallback for phone
  const emailAddress = siteSettings?.EmailAddress || 'support@thegradpad.com'; // Fallback for email
  const location = siteSettings?.Location?.[0]?.children?.[0]?.text || '182 Ave - Glendale, NY 10285, US'; // Fallback for location

  return (
    <div className="bg-white dark:bg-slate-800">
      <Navbar logoUrl={logoUrl} phoneNumber={phoneNumber} emailAddress={emailAddress} location={location} />
      <Routes>
        <Route path="/" element={<Home siteSettings={siteSettings} />} />
        <Route path="/service/:id" element={<ServiceDetails />} /> {/* Dynamic route */}
        <Route path="/renting-101" element={<Renting101 />} />
      </Routes>
      <Footer phoneNumber={phoneNumber} emailAddress={emailAddress} location={location} />
    </div>
  );
  
};

export default App;
