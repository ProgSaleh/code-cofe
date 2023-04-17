/* eslint-disable */

export const initialCartState = [];

export const CartTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  DECREASE: 'DECREASE',
  SET_QUANTITY: 'SET_QUANTITY',
};

const findItem = (cart, itemId) => cart.find((item) => item.itemId === itemId);

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map((item) =>
          item.itemId === action.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { itemId: action.itemId, quantity: 1 }];
    case CartTypes.REMOVE:
      return state.filter((item) => item.itemId !== action.itemId);
    case CartTypes.DECREASE:
      if (findItem(state, action.itemId)) {
        return state
          .map((item) =>
            item.itemId === action.itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity);
      }

    case CartTypes.SET_QUANTITY:
      // if quantity was set to 0, remove the item itself instead of showing quantity of 0.
      if (action.quantity === 0) {
        return state.filter((item) => item.itemId !== action.itemId);
      }

      // if the item already exists, update it's state rather than duplicating it in a new obj.
      if (findItem(state, action.itemId)) {
        return state.map((item) =>
          item.itemId === action.itemId
            ? { ...item, quantity: action.quantity }
            : item
        );
      }
      return [...state, { itemId: action.itemId, quantity: action.quantity }];
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
