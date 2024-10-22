import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cards = ({ exploreTitle, exploreSubtitle }) => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    async function fetchCitiesData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/explore-cities-lists/?populate=*`);
        const cities = response.data.data.map(city => ({
          title: city.Title,
          description: city.Description.map(item => item.children.map(child => child.text).join('')).join('\n'),
          imgPath: `${city?.Image?.formats?.large?.url ? city.Image.formats.large.url:city.Image.url}`,
        }));
        setCardsData(cities);
      } catch (error) {
        console.error('Error fetching cities data:', error);
      }
    }

    fetchCitiesData();
  }, []);

  return (
    <div className="container mx-auto px-3 pb-10 md:pb-20">
      <div className="max-w-3xl text-center mx-auto mb-10">
        <h2 className="text-2xl md:text-4xl font-semibold capitalize mb-5 dark:text-white">{exploreTitle}</h2>
        <p className="dark:text-neutral-300 text-xl">{exploreSubtitle}</p>
      </div>
      <div className="card-container flex max-w-[1200px] w-full h-[200px] md:h-[400px] mx-auto gap-[10px] lg:gap-[40px]">
        {cardsData.map((item, index) => (
          <div
            key={index}
            className="card min-w-[30px] md:min-w-[100px] h-full overflow-hidden flex items-end flex-grow cursor-pointer relative rounded-[20px] md:rounded-[30px]"
          >
            <img className="w-full h-full block background" src={item.imgPath} alt={item.title} />
            <div className="flex flex-col items-start absolute left-[10px] right-[10px] bottom-[20px] overflow-hidden z-[1] card-content">
              <h3 className="title fw-bold text-2xl mb-3">{item.title}</h3>
              <p className="title line-clamp-2">{item.description}</p>
            </div>
            <div className="backdrop"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
