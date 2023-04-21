/* eslint-disable */
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ItemType from '../types/item';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import Alert from './Alert';
import './Orders.css';

function Orders({ items }) {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useCurrentUserContext();
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (currentUser.access === 'associate') {
      const ws = new WebSocket(
        `${window.location.protocol === 'https' ? 'wss://' : 'ws://'}${
          window.location.host
        }/ws-cafe`
      );
      ws.onopen = () => {
        console.log('connected');
      };
      ws.onerror = (error) => {
        console.error(error);
      };
      ws.onmessage = (message) => {
        const newOrders = JSON.parse(message.data);
        setOrders(newOrders);
      };
      ws.onclose = () => {
        console.log('disconnected');
      };

      return () => {
        ws.onclose();
        setOrders([]);
      };
    }
    return () => {};
  }, [currentUser]);

  const deleteOrder = async (order) => {
    try {
      await axios.delete(`/api/orders/${order.id}`);
      // await axios.delete(`/api/orders/${0}`);
    } catch (error) {
      setApiError(error?.message);
      console.error(error);
    }
  };

  return (
    <div className="orders-component">
      <h2>Existing Orders</h2>
      <Alert visible={!!apiError} type="error">
        <p>There was an error when deleting an order</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </Alert>
      {!orders.length ? (
        <div>
          {currentUser.access === 'associate' ? 'No Orders.' : 'Access Denied'}
        </div>
      ) : (
        orders.map((order) => (
          <div className="order" key={order.id}>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Zip Code</th>
                  {order.phone && <th>Phone</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.name}</td>
                  <td>{order.zipCode}</td>
                  {order.phone && <td>{order.phone}</td>}
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.quantity}</td>
                    <td>
                      {items.find((i) => i.itemId === item.itemId)?.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={() => deleteOrder(order)}>
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}

Orders.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Orders;
