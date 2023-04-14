// eslint-disable-next-line
import PropTypes from 'prop-types';

const itemType = PropTypes.shape({
  itemId: PropTypes.string.isRequired,
  imageId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  salePrice: PropTypes.number,
  // eslint-disable-next-line
});

export default itemType;
