import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
  return (
    <div className="cartpanel">
      <div className="opctlayer" onClick={() => setShowSearch(false)}></div>
      <div className="search-modal">
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <CloseIcon className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
      <div className="scrol">
      <div className="search-result-content">
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
                <h1 className='name'>{item.attributes.title}</h1>
                <p className='desc'>{item.attributes.desc.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
    </div>
    
  );
};

export default Search;
