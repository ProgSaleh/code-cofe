// eslint-disable-next-line
import PropTypes from 'prop-types';
import itemType from '../types/item';
import './Home.css';
import Thumbnail from './Thumbnail';
import { ItemImages } from '../items';

function Home({ items }) {
  return (
    <div className="home-component">
      {items.map((item) => (
        <Thumbnail
          key={item.itemId}
          itemId={item.itemId}
          title={item.title}
          image={ItemImages[item.imageId]}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  items: PropTypes.arrayOf(itemType).isRequired,
};

export default Home;
