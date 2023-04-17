import PropTypes from 'prop-types';
import ItemType from '../types/item';
import { CartTypes } from '../reducers/cartReducer';

const quantityStyle = {
  borderRadius: '0.3rem',
  border: '1px solid #999',
  fontSize: '115%',
};

function CartRow({ cartItem, items, dispatch }) {
  const item = items.find((i) => i.itemId === cartItem.itemId);

  const removeItemFromCart = () => {
    dispatch({ type: CartTypes.REMOVE, itemId: item.itemId });
  };

  const decreaseItemFromCart = () => {
    dispatch({ type: CartTypes.DECREASE, itemId: item.itemId });
  };

  const getQuantity = (quantityValue) => {
    dispatch({
      type: CartTypes.SET_QUANTITY,
      itemId: item.itemId,
      quantity: Number(quantityValue),
    });
  };

  return (
    <tr>
      <td>{cartItem.quantity}</td>
      <td>{item.title}</td>
      <td>
        {
          // eslint-disable-next-line
          '$'
        }
        {((item.salePrice ?? item.price) * cartItem.quantity).toFixed(2)}
      </td>
      <td>
        <button onClick={decreaseItemFromCart} type="button">
          -
        </button>
      </td>
      <td>
        <button onClick={removeItemFromCart} type="button">
          X
        </button>
      </td>
      <td>
        <label htmlFor="quantity">
          Quantity
          <select
            style={quantityStyle}
            onChange={(e) => getQuantity(e.target.value)}
            id="quantity"
          >
            <option value="0" defaultValue>
              0
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </label>
      </td>
    </tr>
  );
}

CartRow.propTypes = {
  cartItem: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    // eslint-disable-next-line
  }).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CartRow;
