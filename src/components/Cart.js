import { useState } from 'react';
import PropTypes from 'prop-types';
import ItemType from '../types/item';
import CartRow from './CartRow';
import './Cart.css';

function Cart({ cart, items, dispatch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [coupon, setCoupon] = useState('');

  const subTotal = cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);

  const taxPercentage = parseInt(zipCode.substring(0, 1) || '0', 10) + 1;
  const taxRate = taxPercentage / 100;
  const tax = subTotal * taxRate;
  const total = tax + subTotal;

  const submitOrder = (event) => {
    event.preventDefault();
  };

  const setFormattedPhone = (newNumber) => {
    const digits = newNumber.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newNumber[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newNumber[7] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }
    setPhone(formatted);
  };

  const isFormValid = zipCode.length === 5 && name.trim();

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      {!cart?.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartRow
                  key={item.itemId}
                  cartItem={item}
                  items={items}
                  dispatch={dispatch}
                />
              ))}
            </tbody>
          </table>
          <div>
            Subtotal: $
            {
              // eslint-disable-next-line
              subTotal.toFixed(2)
            }
          </div>
          {zipCode.length < 5 ? (
            <p className="warning">Enter ZIP Code to get total</p>
          ) : (
            <>
              <div>
                Tax: $
                {
                  // eslint-disable-next-line
                  tax.toFixed(2)
                }
              </div>
              <div>
                Total: $
                {
                  // eslint-disable-next-line
                  total.toFixed(2)
                }
              </div>
            </>
          )}
          <h2>Checkout</h2>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label htmlFor="phone">
              Phone:
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setFormattedPhone(e.target.value)}
              />
            </label>
            <label htmlFor="zipcode">
              ZIP Code:
              <input
                type="text"
                id="zipcode"
                maxLength="5"
                inputMode="numeric"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </label>
            <label htmlFor="coupon">
              Have a coupon?
              <input
                type="text"
                id="coupon"
                placeholder="type it here"
                value={coupon}
                inputMode="decimal"
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              />
            </label>
            <button disabled={!isFormValid} type="submit">
              Order Now
            </button>
          </form>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      // eslint-disable-next-line
    })
  ).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Cart;
