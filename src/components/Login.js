import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import Alert from './Alert';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useCurrentUserContext();
  const navigate = useNavigate('');
  const [apiError, setApiError] = useState('');

  const login = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('/api/auth/login', {
        username,
        password,
      });
      setCurrentUser(result.data);
      navigate('/');
    } catch (error) {
      setApiError(error?.response?.data?.error || 'Unknown Error');
      console.error(error);
    }
  };

  return (
    <div className="login-component">
      <Alert visible={!!apiError} type="error">
        <p>There was an error logging in.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </Alert>
      <h2>Login In</h2>
      <form onSubmit={login}>
        {/* username */}
        <div className="">
          <label htmlFor="username">
            Username
            <input
              type="text"
              value={username}
              id="username"
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
        </div>
        {/* password */}
        <div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              value={password}
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

// Login.proptypes = {};

export default Login;
