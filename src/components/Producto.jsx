import axios from 'axios';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './css/Productos.css'


const urlServer = process.env.REACT_APP_API_URL;
const urlGetProductos = process.env.REACT_APP_API_URL + '/getProductos';


const Producto = () => {
  //guardo en const productos el valor del estado y en setProductos la funcion que me permite actualizar el estado
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    getProductos();
  }, [])


  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }

  //funcion para mostrar todos los productos
  const getProductos = async () => {
    try {
      const res = await axios.get(urlGetProductos);
      setProductos(res.data); //actualizo el estado del componente con los datos que me devuelve la api

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className='productos-container-cliente'>
      {productos.map((producto) => (
        <div className='producto-card-cliente btn' key={producto.Id}>
          <div className='producto-image-container-cliente'>
            <img className='producto-image-cliente' src={urlServer + producto.Url_Imagen} alt={producto.Nombre} />
          </div>
          <div className='producto-info-container-cliente'>
            <h2 className='producto-nombre-cliente'>{producto.Nombre}</h2>
            <p className='producto-descripcion-cliente'>{producto.Descripcion}</p>
            <p className='producto-precio-cliente'>
              Precio: <NumericFormat value={producto.Precio} displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
            </p>
            <p className='producto-stock-cliente'>Stock: {producto.Stock}</p>
            <p className='producto-categoria-cliente'>Categoría: {producto.Categoria.Nombre}</p>
            <div className='producto-acciones-cliente'>
              <button className='btn-cliente btn-primary-cliente' onClick={() => toggleSidebar()}>
                <i className='fa-solid fa-cart-plus'></i> Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
      <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );


}

export default Producto;


