import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';
import FloatingButton from './botonFlotante';
import './css/ProductosAdmin.css'


// const url = 'http://localhost:3000/getProductos'
const urlServer = process.env.REACT_APP_API_URL;
const urlGetProductos = process.env.REACT_APP_API_URL + '/getProductos';
const urlElminarProducto = process.env.REACT_APP_API_URL + '/eliminarProducto';

//los hooks son funciones que nos permiten usar el estado y otros recursos de react sin escribir una clase
//son ganchos que nos permiten gestionar el estado de los componentes
//los estados de los componentes funcionales
//tenemos dos tipos de componentes, los funcionales y los de clase

//useState es un hook que nos permite usar el estado en los componentes funcionales, devuelve un array con dos elementos, el primero es el valor del estado y el segundo es una funcion que nos permite actualizar el estado
//useEffect es un hook que nos permite usar el ciclo de vida de los componentes funcionales, es decir, podemos ejecutar codigo cuando se monta el componente, cuando se actualiza o cuando se desmonta
//useEffect es utilizar efecto secundario, es decir, cuando se monta el componente, cuando se actualiza o cuando se desmonta

const GetProductosAdministrador = () => {
    //guardo en const productos el valor del estado y en setProductos la funcion que me permite actualizar el estado
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        getProductos();
    }, [])

    //funcion para mostrar todos los productos
    const getProductos = async () => {
        try {
            const res = await axios.get(urlGetProductos);
            setProductos(res.data); //actualizo el estado del componente con los datos que me devuelve la api

        } catch (error) {
            console.log(error);
        }

    }

    const deleteProducto = async (id) => {
        try {
            const confirmResult = await Swal.fire({
                title: '¿Está seguro de eliminar el producto?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Eliminar'
            });

            if (confirmResult.isConfirmed) {
                await axios.delete(`${urlElminarProducto}/${id}`);
                Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto se eliminó correctamente',
                    icon: 'success',
                    allowOutsideClick: false,
                    // backdrop: false,
                    confirmButtonText: 'Aceptar',


                }
                ).then((result) => {
                    if (result.isConfirmed) {
                        getProductos();
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (



        <div className='productos-container-admin'>
            {productos.map((producto) => (
                <div className='producto-card-admin btn' key={producto.Id}>
                    <div className='producto-image-container-admin'>
                        <img className='producto-image-cliente' src={urlServer + producto.Url_Imagen} alt={producto.Nombre} />
                    </div>
                    <div className='producto-info-container-admin'>
                        <h2 className='producto-nombre-admin'>{producto.Nombre}</h2>
                        <p className='producto-descripcion-admin'>{producto.Descripcion}</p>
                        <p className='producto-precio-admin'>
                            Precio: <NumericFormat value={producto.Precio} displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
                        </p>
                        {/* <p className='producto-stock-admin'>Stock: {producto.Stock}</p> */}
                        <p className='producto-categoria-admin'>Categoría: {producto.Categoria.Nombre}</p>
                        <div className='producto-acciones-admin'>
                            <Link to={`/editarProducto/${producto.Id}`} className='btn btn-info'>
                                <i className="fa-solid fa-pen-to-square"></i> Editar
                            </Link>
                            <button className='btn btn-danger' onClick={() => deleteProducto(producto.Id)}>
                                <i className="fa-sharp fa-solid fa-trash"></i> Eliminar
                            </button>

                        </div>
                    </div>
                </div>
            ))}
          <FloatingButton />
        </div>



        // <div className='container'>
        //     <div className='d-flex justify-content-center mb-5'>
        //         {/* <Link to='/crearProducto' className='btn btn-primary mt-5 mb-3'><i className="fa-solid fa-plus"></i> Agregar Producto</Link> */}

        //     </div>

        //     <div className='productos-container'>
        //         {productos.map((producto) => (
        //             <div className='producto-card' key={producto.Id}>
        //                 <div className='producto-image-container producto-image-container-full'>
        //                     <img className='producto-image' src={urlServer + producto.Url_Imagen} alt={producto.Nombre} />
        //                 </div>
        //                 <div className='producto-info-container'>
        //                     <h2 className='producto-nombre'>{producto.Nombre}</h2>
        //                     <p className='producto-descripcion'>{producto.Descripcion}</p>
        //                     <p className='producto-precio'>
        //                         Precio: <NumericFormat value={producto.Precio} displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
        //                     </p>
        //                     <p className='producto-stock'>Stock: {producto.Stock}</p>
        //                     <p className='producto-categoria'>Categoría: {producto.Categoria.Nombre}</p>
        //                     <div className='producto-acciones'>
        //                         <Link to={`/editarProducto/${producto.Id}`} className='btn btn-info'>
        //                             <i className="fa-solid fa-pen-to-square"></i> Editar
        //                         </Link>
        //                         <button className='btn btn-danger' onClick={() => deleteProducto(producto.Id)}>
        //                             <i className="fa-sharp fa-solid fa-trash"></i> Eliminar
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        //     <FloatingButton />


        // </div>

    )




}

export default GetProductosAdministrador











