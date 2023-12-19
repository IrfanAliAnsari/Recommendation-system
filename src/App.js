import './App.css';
import Header from './component/Header';
import Main from './component/Main';
import Footer from './component/Footer'
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Header />
      <Main />
      <Footer />
    </HashRouter>
  );
}

export default App;
