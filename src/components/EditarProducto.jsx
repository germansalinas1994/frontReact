import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom"; //el use params me permite obtener el id del producto que quiero editar
import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';

import GetProductos from "./GetProductosAdministrador";

const urlUpdateProducto = "http://localhost:3000/updateProducto/";
const urlListadoCategoria = "http://localhost:3000/getCategorias"; //url para traer las categorias
const urlGetProductoById = "http://localhost:3000/getProducto/"; //url para traer el producto por id

const EditarProducto = () => {
    const [Nombre, SetNombre] = useState("");
    const [Descripcion, SetDescripcion] = useState("");
    const [Precio, SetPrecio] = useState("");
    const [Stock, SetStock] = useState("");
    const [Id_Categoria, SetIdCategoria] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); //obtengo el id del producto que quiero editar

    const [categorias, setCategorias] = useState([]); //estado para traer las categorias
    useEffect(() => {
        getCategorias();
    }
        , [])

    //funcion para mostrar las categorias en el select
    const getCategorias = async () => {
        try {
            const res = await axios.get(urlListadoCategoria);
            setCategorias(res.data); //actualizo el estado del componente con los datos que me devuelve la api

        } catch (error) {
            console.log(error);
        }
    }


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
    const handleStockChange = (e) => {

        var stock = parseInt(e.target.value);
        debugger;
        if (stock < 0) {
            document.getElementById("error-stock").hidden = false;
            return;
        }

        SetStock(e.target.value);
        document.getElementById("error-stock").hidden = true;

    }
    const handleCategoriaChange = (e) => {
        SetIdCategoria(e.target.value);
        if (e.target.value.length > 0) {
            document.getElementById("error-categoria").hidden = true;
        }
    }

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
        if (!Stock || Stock < 0) {
            document.getElementById("error-stock").hidden = false;
            valida = false;
        }
        if (!Id_Categoria) {
            document.getElementById("error-categoria").hidden = false;
            valida = false;
        }
        return valida;
    }





    //funcion para actualizar el producto

    const actualizarProducto = async (e) => {
        e.preventDefault();
        let valida = validarFormulario();
        if (!valida) {
            // document.getElementById("btnGuardar").disabled = false;
            return;
        }
        else {

            const confirmResult = await Swal.fire({
                title: '¿Está seguro de editar el producto?',
                text: 'Esta acción no se puede deshacer',
                icon: 'info',
                showCancelButton: true,
                // confirmButtonColor: '#d33',
                // cancelButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Aceptar'

            });
            if (confirmResult.isConfirmed) {
                try {
                    //envio los datos al backend para que los guarde en la base de datos
                    const res = await axios.put(urlUpdateProducto + id, {
                        Nombre,
                        Descripcion,
                        Precio,
                        Stock,
                        Id_Categoria
                    });
                    Swal.fire({
                        title: 'Producto editado',
                        text: 'El producto se editó correctamente',
                        allowOutsideClick: false,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/");
                        }
                    });

                    // console.log(res.data);
                    // navigate("/productos");
                } catch (error) {
                    console.log(error);
                }
            }
        }


    }

    //uso el use effect para traer el producto por id  
    useEffect(() => {
        getProductoById();
    }
        , [])

    //funcion para mostrar el producto por id, para poder capturarlo en el formulario
    const getProductoById = async () => {
        try {
            const res = await axios.get(urlGetProductoById + id);
            SetNombre(res.data.Nombre);
            SetDescripcion(res.data.Descripcion);
            SetPrecio(res.data.Precio);
            SetStock(res.data.Stock);
            SetIdCategoria(res.data.Id_Categoria);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card mt-5">

            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="mt-3 mb-1">Editar Producto</h3>
                <div className="mt-1 mb-1">
                    <Link to="/" className="btn btn-primary">Volver</Link>
                </div>
            </div>
            <div className="formulario">
                <div className="card-body">

                    <form id="formProducto" onSubmit={actualizarProducto} className="card-body">
                        <div className="form-group mb-3 w-33">
                            <label>Nombre</label>
                            {/* <input id="Nombre" name="Nombre" placeholder="Ingrese un Nombre" type="text" className="form-control" onChange={(e) => SetNombre(e.target.value)} /> */}
                            <input id="Nombre" name="Nombre" value={Nombre} placeholder="Ingrese un Nombre" type="text" className="form-control" onChange={handleNombreChange} />
                            <span hidden id="error-nombre" className="text-danger">Debe ingresar un nombre.</span>
                        </div>
                        <div className="form-group mb-3 w-33">
                            <label className="form-label">Descripcion</label>
                            {/* <input name="Descripcion" placeholder="Ingrese una Descripcion" type="text" className="form-control" onChange={(e) => SetDescripcion(e.target.value)} /> */}
                            <input name="Descripcion" value={Descripcion} placeholder="Ingrese una Descripcion" type="text" className="form-control" onChange={handleDescripcionChange} />
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
                                value={Precio}
                                // thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={handlePrecioChange}
                            />
                            <span hidden id="error-precio" className="text-danger">Debe ingresar un precio.</span>
                        </div>
                        <div className="form-group mb-3 w-33">
                            <label className="form-label">Stock</label>
                            {/* <input name="Stock" placeholder="Ingrese un Stock" type="text" className="form-control" onChange={(e) => SetStock(parseInt(e.target.value))} aria-describedby="inputGroupPrepend" /> */}
                            {/* <input name="Stock" placeholder="Ingrese un Stock" type="text" className="form-control" onChange={handleStockChange} aria-describedby="inputGroupPrepend" /> */}
                            <NumericFormat
                                name="Stock"
                                value={Stock}
                                placeholder="Ingrese un Stock"
                                className="form-control"
                                // thousandSeparator={true}
                                allowNegative={false}
                                onChange={handleStockChange}
                            />

                            <span hidden id="error-stock" className="text-danger">Debe ingresar un stock válido.</span>
                        </div>
                        <div className="form-group mb-3 w-33">
                            <label className="form-label">Categoria</label>
                            {/* <select name="Id_Categoria" className="form-select selectize" onChange={(e) => SetIdCategoria(parseInt(e.target.value))} > */}
                            <select name="Id_Categoria" className="form-select selectize" value={Id_Categoria} onChange={handleCategoriaChange} >
                                <option className="placeholder-option" disabled selected>Seleccione una categoria</option>
                                {
                                    categorias.map((categoria) => (
                                        <option key={categoria.Id} value={categoria.Id}>{categoria.Nombre}</option>
                                    ))
                                }
                            </select>
                            <span hidden id="error-categoria" className="text-danger">Debe seleccionar una categoria.</span>


                        </div>

                        <button id="btnGuardar" name="btnGuardar" type="submit" className="btn btn-primary center-button">Guardar</button>
                    </form>
                </div>

            </div>


        </div>





    )



}
export default EditarProducto;

