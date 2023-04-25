import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuthContext } from '../../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { API } from '../../constant';
import './CartSummary.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



const CartSummary = () => {
  const { user } = useAuthContext();
  const products = useSelector((state) => state.cart.products);
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '');
  };
  const deliverycost = 10;
  var data = {
    total_price: (Number(totalPrice()) + deliverycost).toFixed(2),
    total_items: totalPrice(),
    delivery_cost: deliverycost.toFixed(2),
    products: products.map((product) => ({
      title: product.title,
      quantity: product.quantity,
      price: product.price,
      image: product.img,
      id: product.id,
    })),
    ...(user && {
      u_name: user.Name,
      u_lastname: user.last_name,
      u_phone: user.Phone,
      u_additionalphone: user.Additional_phone,
      u_adresse: user.Adresse,
      u_city: user.City,
      u_region: user.Region,
      u_email: user.email,
      u_id: user.id,
      uid: uuidv4(),
    }),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
       data = await response.json();
       console.log(data)
      if (data?.error) {
        throw data?.error;
      } else {
        navigate('/ordersuccess', { state: { data },  replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cartsum-container">
      <div className="left">
        <div className="topsum">
          <div className="topsum-header">
            <h2 className="th-title">
              <LabelImportantIcon className="th-icon" fontSize="small" />
              1.Adresse
            </h2>
            <a href="/profile">
              Edit
              <ChevronRightIcon fontSize="small" />
            </a>
          </div>
          {user && (
            <div className="topsum-body">
              <h3>
                <PersonIcon fontSize="small" />
                {user.Name} {user.last_name}
              </h3>

              <p>
                <LocationOnIcon fontSize="small" />
                {user.Region} | {user.City} | {user.Adresse}
              </p>
            </div>
          )}
          <div className="topsum-footer">
            <Button className="editcart-btn" variant="text" href="/profile">
              Edit your profile
            </Button>
          </div>
        </div>
        <div className="centersum">
          <div className="centersum-header">
            <h2 className="th-title">
              <LabelImportantIcon className="th-icon" fontSize="small" />
              2.Cart
            </h2>
            <a href="/cartdetails">
              Edit
              <ChevronRightIcon fontSize="small" />
            </a>
          </div>
          <div className="centersum-body">
            {products?.map((item) => (
              <div className="item" key={item.id}>
                <div className="item-header">
                  <h4>Home delivery</h4>
                  <p>Delivery within one week</p>
                </div>
                <div className="item-body">
                  <div className="image-container">
                    <img
                      src={process.env.REACT_APP_UPLOAD_URL + item.img}
                      alt=""
                    />
                  </div>
                  <div className="detail">
                    <h5>{item.title}</h5>
                    <p>Qty : {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="centersum-footer">
            <Button className="editcart-btn" variant="text" href="/cartdetails">
              Edit your cart
            </Button>
          </div>
        </div>
        <div className="bottomsum">
          <div className="bottomsumm-header">
            <h2 className="th-title">
              <LabelImportantIcon className="th-icon" fontSize="small" />
              3.Payement Method
            </h2>
          </div>
          <div className="bottomsumm-body">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Pay online with your card"
                  control={<Radio />}
                  label="Pay online with your card"
                />
                <FormControlLabel
                  value="Pay on delivery"
                  control={<Radio />}
                  label="Pay on delivery"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="total">
          <div className="total-header">
            <h1>Order summary</h1>
          </div>
          <div className="total-content">
            <div className="sub-row">
              <span className="first">Total items ({products.length})</span>
              <span className="second">{totalPrice()} د.ت</span>
            </div>
            <div className="sub-row">
              <span className="first">Delivery cost</span>
              <span className="second">{deliverycost.toFixed(2)} د.ت</span>
            </div>
            <div className="sub-row">
              <span className="first">Total</span>
              <span className="second">
                {(Number(totalPrice()) + deliverycost).toFixed(2)} د.ت
              </span>
            </div>
          </div>
          <div className="total-footer">
            <Button
              className="cart__button"
              variant="contained"
              type="submit"
              onClick={onSubmit}
              disabled={isLoading}
            >
              Proceed order {(Number(totalPrice()) + deliverycost).toFixed(2)}{' '}
              د.ت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
