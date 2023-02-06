import './App.css';
import NuevoCliente from './components/NuevoCliente';
import Tabla from './components/Tabla'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BarraNav from './components/BarraNav';
import Home from './components/Home';

function App() {
  return (

    <BrowserRouter>
    <BarraNav></BarraNav>
    <Routes>
      <Route path="*" element={<Navigate replace to="/"/>}/>

      <Route path="/" element={<Home />} />
   
      <Route path="/Tabla" element={<Tabla />} />
    
      <Route path="/NuevoCliente" element={<NuevoCliente />} />
    </Routes>
    </BrowserRouter>

  );
}
// si usamos REACT ROUTER DOM TENEMOS QUE ENVOLVER APP CON BROWSER ROUTER EN INDEX.JS
export default App;
