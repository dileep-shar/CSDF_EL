// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Analyse from "./Components/Analyse"



function App() {
  return  <>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/user" element={<Home />} />
      <Route exact path="/upload" element={<Home />} />
      <Route exact path="/analyse" element={<Analyse />} />
    </Routes>
  </BrowserRouter>
</>
}

export default App;
