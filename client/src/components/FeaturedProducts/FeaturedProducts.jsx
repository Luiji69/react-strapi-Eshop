import Card from '../Card/Card';
import './FeaturedProducts.scss';
import useFetch from '../../components/hooks/useFetch';
import React, { useEffect, useState } from 'react';

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  const [randomData, setRandomData] = useState([]);

  useEffect(() => {
    if (data) {
      // shuffle the data array
      const shuffledData = data.sort(() => Math.random() - 0.5);
      // take the first 4 items from the shuffled array
      const slicedData = shuffledData.slice(0, 4);
      setRandomData(slicedData);
    }
  }, [data]);

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Those products are experiencing an increase in popularity and demand
          within our consumers. These products often gain attention and they are
          so trendy.
        </p>
      </div>
      <div className="bottom">
        {error
          ? 'Something went wrong!'
          : loading
          ? 'loading'
          : randomData.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
