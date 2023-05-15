import React from 'react';
import { useState } from 'react';
import './Product.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';
import useFetch from '../../components/hooks/useFetch';
import RelatedProducts from './RelatedProducts/RelatedProducts';

const Product = () => {
  const id = useParams().id;

  const [selectedImg, setSelectedImg] = useState('img');
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  const categoryId = data?.attributes?.categories?.data[0]?.id;
  return (
    <div className="product">
      {error ? (
        'Something went wrong!'
      ) : loading ? (
        'loading'
      ) : (
        <>
          <div className="row">
            <div className="left">
              <div className="images">
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img?.data?.attributes?.url
                  }
                  alt=""
                  onClick={(e) => setSelectedImg('img')}
                />
                {data?.attributes?.img2?.data && (
                  <img
                    src={
                      process.env.REACT_APP_UPLOAD_URL +
                      data?.attributes?.img2?.data?.attributes?.url
                    }
                    alt=""
                    onClick={(e) => setSelectedImg('img2')}
                  />
                )}
              </div>
              <div className="mainImg">
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes[selectedImg]?.data?.attributes?.url
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="right">
              <h1>{data?.attributes?.title}</h1>
              <span className="price">{data?.attributes?.price} د.ت</span>
              <p>{data?.attributes?.desc}</p>
              <div className="quantity">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                {quantity}
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
              <button
                className="add"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.attributes.title,
                      desc: data.attributes.desc,
                      price: data.attributes.price,
                      img: data.attributes.img.data.attributes.url,
                      quantity,
                    })
                  )
                }
              >
                <AddShoppingCartIcon /> ADD TO CART
              </button>

              <div className="info">
                <span>
                  sub-category:{' '}
                  {data?.attributes?.sub_categories.data[0].attributes.title}
                </span>
                <span>
                  Product Type:{' '}
                  {data?.attributes?.categories.data[0].attributes.title}{' '}
                </span>
              </div>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <RelatedProducts categoryId={categoryId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
