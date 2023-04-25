import './CartDetails.scss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { removeItem, updateQuantity } from '../../redux/cartReducer';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { CartContext } from '../../context/CartContext';


const CartDetails = () => {
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
    <div className="checkout-container ">
      <CartContext.Provider
      value={{ products: products,totalPrice: totalPrice()}}
      >
      <div className="left-big">
        <h1 className="cart-title">Your cart</h1>
        {products?.length > 0 ? (
          products?.map((item) => (
            <div className="item" key={item.id}>
              <div className="left">
                <div className="image-container">
                  <img
                    src={process.env.REACT_APP_UPLOAD_URL + item.img}
                    alt=""
                  />
                </div>
              </div>
              <div className="center">
                <div className="details">
                  <h1>{item.title}</h1>
                  <p>{item.desc?.substring(0, 60)} ...</p>
                  <div className="quantity">
                    <IndeterminateCheckBoxIcon
                      fontSize="large"
                      className="cart__button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    />
                    <div className="price">
                      {item.quantity} x {item.price} د.ت
                    </div>
                    <AddBoxIcon
                      fontSize="large"
                      className="cart__button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <h4>{(item.quantity * item.price).toFixed(2)} د.ت</h4>
                <DeleteOutlinedIcon
                  className="delete"
                  onClick={() => dispatch(removeItem(item.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="empty">
              <ProductionQuantityLimitsIcon className="cls_empty" />
              <p>Your cart is empty</p>
            </div>
          </>
        )}
      </div>
      <div className="right-big">
        <div className="total">
          <div className="total-header">
            <h1>Cart summary</h1>
          </div>
          <div className="total-content">
            <div className="sub-row">
              <span className="first">SUBTOTAL</span>
              <span className="second">{totalPrice()} د.ت</span>
            </div>
            <div className="sub-row">
              <p>Delivery costs are not included yet!</p>
            </div>
          </div>
          <div className="total-footer">
            <Button className="cart__button" variant="contained" href='/cartsummary'>
              Proceed order {totalPrice()} د.ت
            </Button>
          </div>
        </div>
      </div>
      </CartContext.Provider>
    </div> 
  );
};

export default CartDetails;
