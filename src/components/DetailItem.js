// eslint-disable-next-line
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ItemImages } from '../items';
import './DetailItem.css';
// eslint-disable-next-line
import { CartTypes } from '../reducers/cartReducer';
import ItemsContext from '../contexts/ItemsContext';

// eslint-disable-next-line
function DetailItem({ addToCart }) {
  const { id } = useParams();
  const { items } = useContext(ItemsContext);
  const detailItem = items.find((item) => item.itemId === id);

  const addItemToCart = () => {
    addToCart(detailItem.itemId);
  };

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
      <button type="button" onClick={addItemToCart}>
        Add to Cart
      </button>
    </div>
  ) : (
    <h2>Unknown Item</h2>
  );
}

export default DetailItem;
