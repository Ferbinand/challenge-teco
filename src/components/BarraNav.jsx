import React, { useState } from 'react'
import NuevoCliente from './NuevoCliente';
import {Link} from 'react-router-dom';


function BarraNav() {

const [mostrarCrear,setMostrarCrear] = useState(false)

function handleOnClick(){//Invocar NuevoCliente.jsx
  setMostrarCrear(true)
  if(mostrarCrear===true){
    return(<NuevoCliente/>)
  }
}

    return (
      <>
      <nav onClick={handleOnClick} className="navbar bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
   <h1 className="navbar-brand" >App Clientes</h1>

   <ul className="navbar-nav me-auto mb-1 mb-lg-1">
        <li className="nav-item">
        <Link className="nav-link" to="/">Volver al inicio </Link>
        </li>
      </ul>

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link" to="/NuevoCliente">Crear nuevo Cliente </Link>
        </li>
      </ul>

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/Tabla">Mostrar clientes </Link>
        </li>
      </ul>

  </div>
</nav>
      </>
      );
}

export default BarraNav