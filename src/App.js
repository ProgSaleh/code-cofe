// eslint-disable-next-line
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';
import DetailItem from './components/DetailItem';
import {
  cartReducer,
  CartTypes,
  initialCartState,
} from './reducers/cartReducer';
import Cart from './components/Cart';

function App() {
  const [items, setItems] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });

  useEffect(() => {
    axios
      .get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Header cart={cart} />
      {!items.length ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/details" element={<Details items={items} />}>
            <Route
              path=":id"
              element={<DetailItem items={items} addToCart={addToCart} />}
            />
            <Route index element={<div>No Item Selected</div>} />
          </Route>
          <Route path="/" element={<Home items={items} />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} items={items} dispatch={dispatch} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
