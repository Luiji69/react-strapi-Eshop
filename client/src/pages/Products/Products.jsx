import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../components/hooks/useFetch';
import List from '../../components/List/List';

import './Products.scss';

const Products = () => {
  const catId = parseInt(useParams().id);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Sub-Categories</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        
        <List catId={catId} subCats={selectedSubCats} />
      </div>
    </div>
  );
};

export default Products;
