import React, { useState, useEffect } from 'react';
import Cards from './sections/cards/Cards';
import Testimonials from './sections/testimonials/Testimonials';
import Hero from './sections/hero/Hero';
import Faq from './sections/faq/Faq';
import Gallery from './sections/gallery/Gallery';
import DataInsight from './sections/dataInsight';
import Team from './sections/team';
import FutureTogether from './sections/futureTogether';
import axios from 'axios';
import video from '../src/assets/istock-vid.mp4';  // Importing the video for fallback

function Home() {
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

  // Fallback values in case the API doesn't provide data
  const defaultHeroTitle = 'Graduation might be stressful but finding your after grad pad shouldn’t be';
  const defaultHeroVideo = video;  // Using the static video from assets

  const defaultDataInsightTitle = 'Data Insight';
  const defaultDataInsightSubtitle = '420,000-student market. 1 United Adventure\n"Unlock your potential. Start Your New Life in the Perfect City Home."';

  const defaultExploreTitle = 'Explore Cities';
  const defaultExploreSubtitle = 'Find a convenient rental accommodation in the lively city of your choice.';

  // Extract data from the API response with fallback values
  const heroTitle = siteSettings?.HeroSectionTitle || defaultHeroTitle;
  const heroVideo = siteSettings?.HeroSectionVideo?.url ? `${siteSettings.HeroSectionVideo.url}` : defaultHeroVideo;

  const dataInsightTitle = siteSettings?.DataInsightTitle || defaultDataInsightTitle;
  const dataInsightSubtitle = siteSettings?.DataInsightSubTitle?.map(item => item.children.map(child => child.text).join('')).join('\n') || defaultDataInsightSubtitle;

  const exploreTitle = siteSettings?.ExploreSectionTitle || defaultExploreTitle;
  const exploreSubtitle = siteSettings?.ExploreSectionSubtitle?.map(item => item.children.map(child => child.text).join('')).join('\n') || defaultExploreSubtitle;

  if (!siteSettings) {
    return <p>Loading...</p>;  // Loading state
  }

  return (
    <>
      <Hero title={heroTitle} video={heroVideo} />
      <Cards exploreTitle={exploreTitle} exploreSubtitle={exploreSubtitle} />
      <DataInsight title={dataInsightTitle} subtitle={dataInsightSubtitle} />
      <Team />
      <FutureTogether />
      <Gallery />
      <Testimonials />
      <Faq />
    </>
  );
}

export default Home;
