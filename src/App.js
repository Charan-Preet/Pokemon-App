import './App.css';
import Cards from './components/cards';
import Search from './components/search';
import { DataContextProvider } from './context/index';

function App() {
  return (
    <div className="App">
      <DataContextProvider>
        <Search />
        <Cards />
      </DataContextProvider>
    </div>
  );
}

export default App;
