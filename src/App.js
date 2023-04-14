import './App.css';
import Header from './components/Header';
import { items } from './items';
import Home from './components/Home';

function App() {
  return (
    <>
      <Header title="Code Café" />
      <Home items={items} />
    </>
  );
}

export default App;
