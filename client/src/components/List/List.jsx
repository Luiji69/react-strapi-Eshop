import React from 'react';
import './List.scss';
import Card from '../Card/Card';
import useFetch from '../../components/hooks/useFetch';

const List = ({ subCats, maxPrice, catId }) =>{ 
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}&pagination[page]=1&pagination[pageSize]=100${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}`
  );

  return (
    <div className="list">
      {error
        ? 'Something went wrong!'
        : loading
        ? 'loading'
        : data?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
