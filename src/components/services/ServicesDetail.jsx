import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const ServiceDetails = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate();
  const [service, setService] = useState(null); // State to store the fetched service
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch the specific service details from the API
  const fetchServiceData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/services?populate=*`);
        
        const formattedData = response.data.data.map(service => {
          // Join all description text into one string
          const fullDescription = service.Description.map(desc => 
            desc.children.map(child => child.text))
  
  
          return {
            id: service.id, // Fetch the service ID
            Title: service.Title, // Fetch the title directly from the service object
            Description: fullDescription, // Truncated description
            ImageUrl: service.Image ? `${service.Image.url}` : null // Get the image URL or fallback to null if no image is present
          };
        });
  
      // Filter the specific service by ID
      const foundService = formattedData.find(service => service.id === parseInt(id));
      
      if (foundService) {
        setService(foundService); // Set the service in the state
      } else {
        navigate('/'); // Redirect if no service is found
      }

      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching service details:", error);
      setLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    fetchServiceData(); // Call the API to fetch the service details
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  if (!service) {
    return <div>Service not found.</div>; // Handle the case when the service is not found
  }

  const { Title, Description, ImageUrl } = service; // Destructure the required fields from the service data

  return (
    <div className="lg:max-w-5xl xl:max-w-7xl mx-auto px-3 py-10">
      <h1 className='text-2xl md:text-4xl font-semibold capitalize mb-3 sm:mb-5 dark:text-white md:px-3'>{Title}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
        <div className='md:px-3 dark:text-neutral-300'>
        {Description.map((paragraph, index) => (
  <p key={index} className='mb-5'>{paragraph}</p>
))}

        </div>
        <div className='md:px-3'>
          {ImageUrl ? (
            <img className='w-full rounded-xl' src={ImageUrl} alt={Title} /> 
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
