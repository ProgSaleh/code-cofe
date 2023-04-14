// eslint-disable-next-line
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ItemImages } from '../items';
import ItemType from '../types/item';
import './DetailItem.css';

function DetailItem({ items }) {
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  return detailItem ? (
    <div className="detail-item-component">
      <img
        src={ItemImages[detailItem.imageId]}
        alt={detailItem.title}
        className="details-image"
      />
      <h2>{detailItem.title}</h2>
      {detailItem.description && <h6>{detailItem.description}</h6>}
      <div>
        {
          // eslint-disable-next-line
          '$'
        }
        {detailItem.salePrice ?? detailItem.price.toFixed(2)}
      </div>
    </div>
  ) : (
    <h2>Unknown Item</h2>
  );
}

DetailItem.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default DetailItem;
