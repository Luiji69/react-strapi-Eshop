import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.scss';

const OrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/orders/${id}?populate=*`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  console.log(data);

  return (
    <div className="OrderDetail">
      <div className="od-container">
        <div className="odc-header">
          <h1>Order Details</h1>
        </div>
        {data && (
          <div className="odc-body">
            <div className="odcb-row-header">
              <h2>Order number {data.data.id}</h2>
              <p>
                Order placed at{' '}
                {new Date(data.data.attributes.createdAt).toLocaleDateString()}
              </p>
              <p>{data.data.attributes.products.length} Items</p>
              <p>Total : {data.data.attributes.total_price} د.ت</p>
              <div className="status">
                <span>Order status : {data.data.attributes.Order_Status}</span>
              </div>
            </div>
            <div className="odcb-row-body">
              <h2>Items in your order</h2>
              {data.data.attributes.products.map((item) => (
                <div className="od-item" key={item.id}>
                  <div className="item-header">
                    <h4>Home delivery</h4>
                    <p>Delivery within one week</p>
                  </div>
                  <div className="item-body">
                    <div className="image-container">
                      <img
                        src={process.env.REACT_APP_UPLOAD_URL + item.image}
                        alt=""
                      />
                    </div>
                    <div className="detail">
                      <h5>{item.title}</h5>
                      <p>Qty : {item.quantity}</p>
                      <p>Price : {item.price} د.ت</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
