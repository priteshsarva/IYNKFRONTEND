import './App.css';
import Category from './components/Category';
import Home from './components/Home';
import NavBar from "./components/NavBar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reddit from './components/Reddit';


function App() {

  return (
    <>


      <BrowserRouter basename='/'>

        <NavBar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/reddit" element={<Reddit />} />

        </Routes>
      </ BrowserRouter>




    </>
  );
}

export default App;
