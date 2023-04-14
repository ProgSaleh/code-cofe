import logo from '../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header-component">
      <img src={logo} alt="coffee logo" />
      <h1>Code Café</h1>
    </header>
  );
}

export default Header;
