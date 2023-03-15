import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../components/hooks/useFetch';
import List from '../../components/List/List';

import './Products.scss';

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`,
    [selectedSubCats, sort]
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

  useEffect(() => {
    setMaxPrice(1000);
  }, [selectedSubCats, sort]);

  // Add this useEffect to set the selectedSubCats to all subcategories on mount
  useEffect(() => {
    if (data) {
      setSelectedSubCats(data.map((item) => item.id.toString()));
    }
  }, [data]);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                checked={selectedSubCats.includes(item.id.toString())} // Add this to check the checkbox based on the selectedSubCats array
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
        </div>

        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort('asc')}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
            checked={selectedSubCats.includes(sort)}
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort('desc')}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        {error ? (
          'Something went wrong!'
        ) : loading ? (
          'loading'
        ) : (
          <List
            catId={catId}
            maxPrice={maxPrice}
            sort={sort}
            subCats={selectedSubCats}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
