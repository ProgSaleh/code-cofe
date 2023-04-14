// eslint-disable-next-line
import { useParams } from 'react-router-dom';
// eslint-disable-next-line
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

const style = {
  textTransform: 'uppercase',
  margin: '1rem',
  padding: '2rem 1rem',
  borderRadius: '3px',
  color: '#fff',
  fontWeight: '900',
  fontSize: '125%',
  width: '10rem',
  height: '3rem',
  textAlign: 'center',
};

function Tier({ bg, title }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/rewards/${title}`}>
      <p style={{ ...style, background: bg }}>{title}</p>
    </Link>
  );
}

Tier.propTypes = {
  bg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Tier;
