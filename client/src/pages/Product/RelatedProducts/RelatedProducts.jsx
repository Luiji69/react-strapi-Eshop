import React, { useEffect, useState } from 'react';

import Card from '../../../components/Card/Card';
import useFetch from '../../../components/hooks/useFetch';
import './RelatedProducts.scss';

const RelatedProducts = (props) => {
  const categoryId = props.categoryId;

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id][$eq]=${categoryId}`
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
    <div className='relatedProducts'>
      <div className='top'>
        <h1>Related products</h1>
      </div>
      <div className='bottom'>
        {error ? (
          'Something went wrong!'
        ) : loading ? (
          'Loading'
        ) : (
          randomData.map((item) => <Card item={item} key={item.id} />)
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
