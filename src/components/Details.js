// eslint-disable-next-line
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { ItemImages } from '../items';
import ItemType from '../types/item';
import Thumbnail from './Thumbnail';
import './Details.css';

function Details({ items }) {
  return (
    <div className="details-component">
      <Outlet />
      <div className="details-component-sidebar">
        {items.map((item) => (
          <Thumbnail
            key={item.itemId}
            image={ItemImages[item.imageId]}
            title={item.title}
            itemId={item.itemId}
          />
        ))}
      </div>
    </div>
  );
}

Details.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Details;
