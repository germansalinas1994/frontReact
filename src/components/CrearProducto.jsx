import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';

const urlCrearProducto = process.env.REACT_APP_API_URL + "/crearProducto";
const urlListadoCategoria = process.env.REACT_APP_API_URL + "/getCategorias";
const urlCargarImagen = process.env.REACT_APP_API_URL + "/uploadFile";


const CrearProducto = () => {

    //TENGO QUE VER LA FORMA DE MANEJAR TODO EL FORMULARIO DE UNA VEZ

    const [Nombre, SetNombre] = useState("");
    const [Descripcion, SetDescripcion] = useState("");
    const [Precio, SetPrecio] = useState("");
    // const [Stock, SetStock] = useState("");
    const [Id_Categoria, SetIdCategoria] = useState("");
    const [Url_Imagen, SetImagen] = useState("");
    const navigate = useNavigate(); //el usenavigate es para poder navegar entre paginas

    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        getCategorias();
    }, [])




    //funcion para mostrar todos los productos
    const getCategorias = async () => {
        try {
            const res = await axios.get(urlListadoCategoria);
            setCategorias(res.data); //actualizo el estado del componente con los datos que me devuelve la api
            // console.log(res.data);

        } catch (error) {
            console.log(error);
        }

    }


    //funcion para evento de cambio de nombre

    const handleNombreChange = (e) => {
        console.log(Nombre)
        SetNombre(e.target.value);
        if (e.target.value.length > 0) {
            document.getElementById("error-nombre").hidden = true;
        }
    }

    //funcion para evento de cambio de descripcion
    const handleDescripcionChange = (e) => {
        SetDescripcion(e.target.value);
        if (e.target.value.length > 0) {
            document.getElementById("error-descripcion").hidden = true;
        }
    }
    const handlePrecioChange = (e) => {
        if (document.getElementById("Precio").value == "") {
            SetPrecio(0);
            return;
        }
        const precioValue = parseFloat(e.target.value.replace(/\$/g, ''));
        SetPrecio(parseFloat(precioValue));
        if (e.target.value.length > 0) {
            document.getElementById("error-precio").hidden = true;
        }
    }
    // const handleStockChange = (e) => {
        
    //     var stock = parseInt(e.target.value);
    //     if (stock < 0) {
    //         document.getElementById("error-stock").hidden = false;
    //         return;
    //     }

    //     SetStock(e.target.value);
    //     document.getElementById("error-stock").hidden = true;

    // }
    const handleCategoriaChange = (e) => {
        SetIdCategoria(e.target.value);
        if (e.target.value.length > 0) {
            document.getElementById("error-categoria").hidden = true;
        }
    }

    const handleImagenChange = (e) => {
        SetImagen(e.target.files[0]);
        console.log(e.target.files[0]);
        if (e.target.value.length > 0) {
            document.getElementById("error-imagen").hidden = true;
        }
    }



    //funcion para validar el formulario
    const validarFormulario = () => {
        let valida = true;
        debugger;
        if (!Nombre) {
            document.getElementById("error-nombre").hidden = false;
            valida = false;
        }
        if (!Descripcion) {
            document.getElementById("error-descripcion").hidden = false;
            valida = false;
        }
        if (Precio == null || Precio == 0) {
            document.getElementById("error-precio").hidden = false;
            valida = false;
        }
        // if (!Stock || Stock < 0) {
        //     document.getElementById("error-stock").hidden = false;
        //     valida = false;
        // }
        if (!Id_Categoria) {
            document.getElementById("error-categoria").hidden = false;
            valida = false;
        }
        if (!Url_Imagen) {
            document.getElementById("error-imagen").hidden = false;
            valida = false;
        }
        return valida;
    }


    //procedimiento para guardar los datos del formulario
    const guardarDatos = async (e) => {

        debugger;
        e.preventDefault();
        // document.getElementById("btnGuardar").disabled = true;
        let valida = validarFormulario();
        if (!valida) {
            // document.getElementById("btnGuardar").disabled = false;
            return;
        }
        else {
            try {

                //CON ESTO LOGRE HACER QUE SE GUARDE LA IMAGEN EN LA CARPETA UPLOADS Y EL NOMBRE EN LA BASE DE DATOS
                try {
                    const formData = new FormData();
                    formData.append("file", Url_Imagen);

                    const respuesta = await axios.post(urlCargarImagen, formData);
                    console.log(respuesta);
                    var url = respuesta.data;

                    if (url == null) {
                        throw "Error al cargar la imagen";
                    }
                    debugger;

                    try {
                        const res = await axios.post(urlCrearProducto, {
                            Nombre,
                            Descripcion,
                            Precio,
                            // Stock,
                            Id_Categoria,
                            Url_Imagen: url
                        });
                        console.log(res);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            allowOutsideClick: false,
                            title: 'Producto creado correctamente',
                            showConfirmButton: true,

                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/");

                            }
                        })


                    } catch (error) {
                        console.log(error);
                        throw error;
                    }




                } catch (error) {
                    console.log(error);
                    document.getElementById("btnGuardar").disabled = false;

                    throw error;
                }


            } catch (error) {
                console.log(error);
            }


        }

    }


    return (
        <div className="card mt-5">

            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="mt-3 mb-1">Crear Producto</h3>
                <div className="mt-1 mb-1">
                    <Link to="/" className="btn btn-primary">Volver</Link>
                </div>
            </div>
            <div className="formulario">
                <div className="card-body">

                    <form id="formProducto" onSubmit={guardarDatos} className="card-body">
                        <div className="form-group mb-3 w-33">
                            <label>Nombre</label>
                            {/* <input id="Nombre" name="Nombre" placeholder="Ingrese un Nombre" type="text" className="form-control" onChange={(e) => SetNombre(e.target.value)} /> */}
                            <input id="Nombre" name="Nombre" placeholder="Ingrese un Nombre" type="text" className="form-control" onChange={handleNombreChange} />
                            <span hidden id="error-nombre" className="text-danger">Debe ingresar un nombre.</span>
                        </div>
                        <div className="form-group mb-3 w-33">
                            <label className="form-label">Descripcion</label>
                            {/* <input name="Descripcion" placeholder="Ingrese una Descripcion" type="text" className="form-control" onChange={(e) => SetDescripcion(e.target.value)} /> */}
                            <input name="Descripcion" placeholder="Ingrese una Descripcion" type="text" className="form-control" onChange={handleDescripcionChange} />
                            <span hidden id="error-descripcion" className="text-danger">Debe ingresar una descripcion.</span>
                        </div>
                        <div className="form-group mb-3 w-33">
                            <label className="form-label">Precio</label>
                            {/* <input name="Precio" placeholder="Ingrese un precio" type="text" className="form-control" pattern="[0-9]+([.,][0-9]{1,2})?" onChange={(e) => SetPrecio(parseFloat(e.target.value))} /> */}
                            {/* <input name="Precio" placeholder="Ingrese un precio" type="text" className="form-control" pattern="[0-9]+([.,][0-9]{1,2})?" onChange={handlePrecioChange} /> */}
                            <NumericFormat
                                name="Precio"
                                id="Precio"
                                placeholder="$0.00"
                                className="form-control"
                                // thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={handlePrecioChange}
                            />
                            <span hidden id="error-precio" className="text-danger">Debe ingresar un precio.</span>
                        </div>
                        {/* <div className="form-group mb-3 w-33">
                            <label className="form-label">Stock</label>
                            <NumericFormat
                                name="Stock"
                                placeholder="Ingrese un Stock"
                                className="form-control"
                                // thousandSeparator={true}
                                allowNegative={false}
                                onChange={handleStockChange}
                            />

                            <span hidden id="error-stock" className="text-danger">Debe ingresar un stock válido.</span>
                        </div> */}
                        <div className="form-group mb-3 w-33">
                            <label className="form-label">Categoria</label>
                            {/* <select name="Id_Categoria" className="form-select selectize" onChange={(e) => SetIdCategoria(parseInt(e.target.value))} > */}
                            <select name="Id_Categoria" className="form-select selectize" onChange={handleCategoriaChange} >
                                <option value="" className="placeholder-option" disabled selected>Seleccione una categoria</option>
                                {
                                    categorias.map((categoria) => (
                                        <option key={categoria.Id} value={categoria.Id}>{categoria.Nombre}</option>
                                    ))
                                }
                            </select>
                            <span hidden id="error-categoria" className="text-danger">Debe seleccionar una categoria.</span>


                        </div>

                        <div className="form-group mb-3 w-33 mt-4">
                            <div className="mt-3">
                                <label className="form-label">Imagen</label>
                                <div className="input-group">
                                    {/* <input type="file" className="form-control" id="inputGroupFile04" onChange={(e) => SetImagen(e.target.files[0])} aria-describedby="inputGroupFileAddon04" aria-label="Upload" /> */}
                                    <input type="file" className="form-control" id="inputGroupFile04" onChange={handleImagenChange} aria-describedby="inputGroupFileAddon04" aria-label="Upload" />

                                </div>
                                <span hidden id="error-imagen" className="text-danger">Debe seleccionar una imagen.</span>


                            </div>
                        </div>
                        <button id="btnGuardar" name="btnGuardar" type="submit" className="btn btn-primary center-button">Guardar</button>
                    </form>
                </div>

            </div>


        </div>





    )





}

export default CrearProducto;