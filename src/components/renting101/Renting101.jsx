import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

const Renting101 = () => {
  const [cardsData, setCardsData] = useState([]); // State to store the data

  // Fetch data from the API
  const fetchRentingData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/renting-101s?populate=Image`);
      const fetchedData = response.data.data.map((item) => ({
        title: item.Title,
        description: item.Description.map(desc => desc.children.map(child => child.text).join(' ')).join(' '),
        image: `${item.Image.url}`,
        isReverse: item.ImageReverse,
        hasShadow: item.ShowShadow
      }));

      setCardsData(fetchedData); // Set the fetched data to the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRentingData(); // Fetch data on component mount
  }, []);

  return (
    <div className="md:mt-5">
      {cardsData.map((item, index) => (
        <div key={index} className={`flex flex-col ${item.isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center pt-10 pb-12 ${item.hasShadow ? 'separator' : ''} `}>
          <div className="w-full md:w-1/3">
            <div className='flex items-center justify-center flex-col'>
              <div className={`bg-indigo-50 dark:bg-slate-900 md:max-w-[500px] ${item.isReverse ? 'md:-ms-[200px]' : 'md:-me-[200px]'} px-3 sm:px-10 py-10 z-[1]`}>
                <h2 className='dark:text-white font-semibold uppercase text-2xl mb-5'>{item.title}</h2>
                <p className='text-base sm:text-lg text-indigo-950 dark:text-neutral-300'>{item.description}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <img src={item.image} alt={item.title} />
          </div>
        </div>
      ))}
    </div>
  );
}

Renting101.propTypes = {
  isReverse: PropTypes.any,
  hasShadow: PropTypes.any,
};

export default Renting101;
