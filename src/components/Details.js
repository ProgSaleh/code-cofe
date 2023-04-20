// eslint-disable-next-line
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ItemImages } from '../items';
import Thumbnail from './Thumbnail';
import ItemsContext from '../contexts/ItemsContext';
import './Details.css';

function Details() {
  const { items } = useContext(ItemsContext);

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

export default Details;
