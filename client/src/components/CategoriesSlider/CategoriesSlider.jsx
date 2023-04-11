import React from 'react';
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import './CategoriesSlider.scss';

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

const CategoriesSlider = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('/categories?populate=*');
  const handleCategoryClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="wrapper">
      <h1>Categories</h1>
      <Swiper
  className="categories-slider"
  autoplay={{ delay: 3000 }}
  navigation
  pagination={{ type:"fraction" }}
  effect={'coverflow'}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={'auto'}
  coverflowEffect={{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong! {error.message}</p>}
        {data &&
          data.map((category) => (
            <SwiperSlide
              className="swiper-slide"
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  category?.attributes?.img?.data?.attributes?.url
                }
                alt={category.attributes.title}
              />
              <h2>{category.attributes.title}</h2>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
