import React, { useEffect, useState } from 'react';
import './UserOrders.scss';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/orders?populate=*&[filters][u_id][$eq]=${user.id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [user]); // add user as a dependency to the useEffect hook

  console.log(data);

  return (
    <div className="userorders">
      <div className="userorders-container">
        <div className="userorders-container-header">
          <h1>Your orders</h1>          
        </div>
        <div className="userorders-container-body">
        {data?.data?.map((item) => (
           <Link className="link" to={`/orderdetail/${item.id}-${item.attributes.uid}`} key={item.id}>
            <div className="uo-item" key={item.id}>
              
                {item.attributes.products.map((item) => (
                  <div className="uip-item" key={item.id}>
                    <div className="uipi-left">
                      <div className="image-container">
                        <img
                          src={process.env.REACT_APP_UPLOAD_URL + item.image}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="uipi-center">
                      <h2>{item.title}</h2>
                    </div>
                    <div className="uipi-right"></div>
                  </div>
                ))}
              
              <p>Order number {item.id} | placed at{' '}
                {new Date(item.attributes.createdAt).toLocaleDateString()}</p>
              <span>Order status : {item.attributes.Order_Status}</span>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
