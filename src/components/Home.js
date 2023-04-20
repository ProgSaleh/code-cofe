import { useContext } from 'react';
// eslint-disable-next-line
import './Home.css';
import Thumbnail from './Thumbnail';
import { ItemImages } from '../items';
import ItemsContext from '../contexts/ItemsContext';

function Home() {
  const { items } = useContext(ItemsContext);
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

export default Home;
