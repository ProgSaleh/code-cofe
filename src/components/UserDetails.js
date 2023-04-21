import axios from 'axios';
import { Link } from 'react-router-dom';
import Profile from '../images/profile.svg';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import './UserDetails.css';

function UserDetails() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

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
          {currentUser.access === 'associate' && (
            <Link to="/orders">Orders</Link>
          )}
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

export default UserDetails;
