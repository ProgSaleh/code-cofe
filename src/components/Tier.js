// eslint-disable-next-line
import { useParams } from 'react-router-dom';

function Tier() {
  const { tier } = useParams();
  return <p>{tier}</p>;
}

export default Tier;
