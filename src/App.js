// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import { useEffect, useMemo, useReducer, useState } from 'react';
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
import CurrentUserContext from './contexts/CurrentUserContext';
import Login from './components/Login';

const storageKey = 'cart';

function App() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    (initialState) => {
      try {
        const storedCart = JSON.parse(localStorage.getItem(storageKey));
        return storedCart || initialState;
      } catch (error) {
        console.log(error);
        return initialState;
      }
      // eslint-disable-next-line
    }
  );
  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });
  // dispatch({ type: CartTypes.REMOVE, itemId });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios
      .get('/api/auth/current-user')
      .then((response) => setCurrentUser(response?.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios
      .get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  const currentUserContextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <Router>
      <CurrentUserContext.Provider value={currentUserContextValue}>
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
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
