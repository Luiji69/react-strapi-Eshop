import React from 'react';
import './Categories.scss';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div>
      <h1>Categories</h1>
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link className="link" to="/products/4">
              Cosmetics
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/8448328/pexels-photo-8448328.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to="/products/7" className="link">
              food
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {' '}
          <img
            src="https://images.pexels.com/photos/1212048/pexels-photo-1212048.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to="/products/6" className="link">
              accessories
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/5217929/pexels-photo-5217929.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/products/8" className="link">
                  cleaners
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {' '}
              <img
                src="https://images.pexels.com/photos/6045103/pexels-photo-6045103.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/products/9" className="link">
                  other
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to="/products/5" className="link">
              Home decoration
            </Link>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Categories;
