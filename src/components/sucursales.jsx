import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const urlServer = process.env.REACT_APP_API_URL;
const urlGetSucursales = process.env.REACT_APP_API_URL + '/getSucursales';


const Sucursales = () => {

    const [sucursales, setSucursales] = useState([]);
    useEffect(() => {
        getSucursales();
    }, [])


    const getSucursales = async () => {
        debugger;
        try {
            const res = await axios.get(urlGetSucursales);
            setSucursales(res.data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <h1 className="text-center mt-5 mb-5">Sucursales</h1>
            <table className="table table-light table-striped">
            <thead className="table-secondary">
                    <tr>
                        <th scope="col">Número Sucursal</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {sucursales.map((sucursal) => (
                        <tr key={sucursal.Id}>
                            <th scope="row">{sucursal.Id}</th>
                            <td>{sucursal.Nombre}</td>
                            <td>{sucursal.Direccion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Sucursales;