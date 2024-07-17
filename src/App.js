import './App.css';
import Category from './components/Category';
import Home from './components/Home';
import NavBar from "./components/NavBar"
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Reddit from './components/Reddit';


function App() {

  return (
    <>

      <HashRouter>
        {/* <BrowserRouter basename='/iynk'> */}

        <NavBar />
        <Routes>

          <Route path="/" element={<Home />}  />
          <Route path="/category" element={<Category />} />
          <Route path="/reddit" element={<Reddit />} />

        </Routes>
        {/* </ BrowserRouter> */}
      </ HashRouter>



    </>
  );
}

export default App;
