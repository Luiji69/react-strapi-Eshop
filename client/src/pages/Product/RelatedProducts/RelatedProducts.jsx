import React from 'react'

import Card from '../../../components/Card/Card';
import useFetch from '../../../components/hooks/useFetch';
import './RelatedProducts.scss';


const RelatedProducts = (props) => {
  const categoryId = props.categoryId;
 
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id][$eq]=${categoryId}`
  );
  console.log(data)
  return (
    <div className='relatedProducts'>
      <div className="top">
        <h1>Related products</h1>
      </div>
      <div className="buttom">
      {error
          ? 'Something went wrong!'
          : loading
          ? 'loading'
          : data?.slice(0, 4).map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  )
}

export default RelatedProducts