import React from 'react';
import Categories from '../../components/Categories/Categories';
import Contact from '../../components/Contact/Contact';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Sslider from '../../components/Slider/Sslider';
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import './Home.scss';


const Home = () => {
  return (
    <div className="home">
      <Sslider />
      <FeaturedProducts type="featured" />
      <HowItWorks/>
      <Categories />
      <FeaturedProducts type="trending" />
      <Contact />
    </div>
  );
};

export default Home;
