import React from 'react';
import './Cart.scss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, resetCart, updateQuantity } from '../../redux/cartReducer';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

const Cart = ({setOpenCart}) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="cartpanel">
      <div className="opctlayer" onClick={() => setOpenCart(false)}></div>
      <div className="cart">
      <h1>Your cart</h1>
      <MdClose className="close-btn" onClick={() => setOpenCart(false)} />
      <div className="scrol">
        {products?.map((item) => (
          <div className="item" key={item.id}>
            <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
            <div className="details">
              <h1>{item.title}</h1>
              <p>{item.desc?.substring(0, 60)} ...</p>
              <div className="quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                 <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div className="price">
                {item.quantity} x {item.price} د.ت
              </div>
            </div>
            <DeleteOutlinedIcon
              className="delete"
              onClick={() => dispatch(removeItem(item.id))}
            />
          </div>
        ))}
      </div>
      <div className="total">
        <span>SUBTOTAL</span>
        <span>{totalPrice()} د.ت</span>
      </div>
      <Link to="/checkout">
        <button>PROCEED TO CHECKOUT</button>
      </Link>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
    </div>
    
  );
};

export default Cart;
