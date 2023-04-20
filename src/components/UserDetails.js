import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Profile from '../images/profile.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';
import './UserDetails.css';

function UserDetails() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {});
      setCurrentUser({});
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="user-details-component">
      {currentUser.username ? (
        <div>
          <img src={Profile} alt={currentUser.username} />
          <p>{currentUser.username}</p>
          <button onClick={logout} type="button">
            Log out
          </button>
        </div>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </div>
  );
}

UserDetails.propTypes = {};

export default UserDetails;
