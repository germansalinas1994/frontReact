import GetProductosAdministrador from './components/GetProductosAdministrador';
import CrearProducto from './components/CrearProducto';
import EditarProducto from './components/EditarProducto';
import Producto from './components/Producto';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment } from 'react'; //importo para poder usar el fragment 
import Home from './components/Home';
//el fragment es un componente que no se renderiza pero que me permite agrupar elementos



function App() {
  const { loginWithRedirect } = useAuth0();
  return (

    <Fragment>
      <div className="App">
        <BrowserRouter>
          <Header loginWithRedirect={loginWithRedirect}/>

          <Routes>
            {/* cada ruta tiene dos partes la url y el componente que se va a renderizar */}
            <Route path="/" element={<Home />} />
            <Route path="/productosAdmin" element={<GetProductosAdministrador />} />
            <Route path='/crearProducto' element={<CrearProducto />}></Route>
            <Route path='/editarProducto/:id' element={<EditarProducto />}></Route>
          </Routes>
          
          <Footer />

        </BrowserRouter>
      </div>
    </Fragment>


  );
}

export default App;
