import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './Search.scss';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  let { data } = useFetch(
    `/products?populate=*&[filters][title][$contains]=${query}`
  );

  if (!query.length) {
    data = null;
  }
  console.log(data);

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <MdClose className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        {!data?.data?.length && (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        )}
        <div className="search-results">
          {data?.map((item) => (
            <div
              className="search-result-item"
              key={item.id}
              onClick={() => {
                navigate('/product/' + item.id);
                setShowSearch(false);
              }}
            >
              <div className="image-container">
                <img
                  src={process.env.REACT_APP_UPLOAD_URL +
                    item.attributes?.img?.data?.attributes?.url}
                  alt=""
                />
              </div>
              <div className="prod-details">
                <h1>{item.attributes.title}</h1>
                <p>{item.attributes.desc.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
