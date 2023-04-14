// eslint-disable-next-line
import { Outlet } from 'react-router-dom';
import Reward from './Reward';

const tiers = [
  { id: 1, title: 'Bronze', bg: 'brown' },
  { id: 2, title: 'Silver', bg: 'silver' },
  { id: 3, title: 'Gold', bg: 'goldenrod' },
  { id: 4, title: 'Platin', bg: 'lightblue' },
];

function Rewards() {
  return (
    <div className="details-component">
      <Outlet />
      <aside className="details-component-sidebar">
        {tiers.map((tier) => (
          <Reward key={tier.id} title={tier.title} bg={tier.bg} />
        ))}
      </aside>
    </div>
  );
}

export default Rewards;
