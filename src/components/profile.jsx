import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const Profile = () => {

    //user es para los datos que tiene el usuario
    //isAuthenticated es para saber si el usuario esta autenticado
    //isLoading es para saber si esta cargando la pagina
    const { user, isAuthenticated, isLoading } = useAuth0();

    const showLoadingModal = () => {
        Swal.fire({
            title: 'Cargando',
            text: 'Por favor espere',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                Swal.hideLoading()
            }
        })
    }



    return (
        <div>
            {/* {JSON.stringify(user, null, 2)} */}
            {isLoading ? (
                <div>
                    {showLoadingModal()}
                </div>

            ) : isAuthenticated ? (
                Swal.close(),
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ) : (
                Swal.close(),

                <div>
                </div>
            )}

        </div>
    );
}
export default Profile;
