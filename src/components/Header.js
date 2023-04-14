// eslint-disable-next-line
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import './Header.css';

function Header() {
  return (
    // <Link to="/" className="header-component">
    //   <img src={logo} alt="coffee logo" />
    //   <p>Code Café</p>
    // </Link>
    <header className="header-component">
      <Link to="/">
        <img src={logo} alt="coffee logo" />
        <p>Code Café</p>
      </Link>
    </header>
  );
}

export default Header;
