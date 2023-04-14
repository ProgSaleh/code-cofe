import './App.css';
import Header from './components/Header';
import { items } from './items';
import Home from './components/Home';

function App() {
  return (
    <>
      <Header />
      <Home items={items} />
    </>
  );
}

export default App;
