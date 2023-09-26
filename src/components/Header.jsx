import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from './images/LogoLoQueMastica.png'
import { Link } from "react-router-dom"; //PARA QUE EL LINK FUNCIONE LO TENGO QUE METER EN EL APP.JS DENTRO DEL BROWSER ROUTER
import titulo from './images/Titulo.png'
// import logo from './logo.png';
import './css/Header.css';
import { text } from "@fortawesome/fontawesome-svg-core";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import Swal from "sweetalert2";
import { useEffect } from "react";

function Header({...props}) {
    const {isAuthenticated, isLoading, getIdTokenClaims} = useAuth0();

    useEffect(() => {
        const getToken = async () => {
          try {
            debugger;
            const token = await getIdTokenClaims();
            console.log(token);
          } catch (error) {
            console.error("Error al obtener el token:", error);
          }
        };
    
        if (isAuthenticated) {
          getToken();
        }
      }, [isAuthenticated, getIdTokenClaims]);

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


    if(isLoading && !isAuthenticated) {
        return <div>{showLoadingModal()}</div>
    }
    return (
        Swal.close(),
        <header className="header">
            <div className="logo-container header-title">
                <Link to="/">
                <img src={titulo} alt="Título principal de mi sitio web" />
                </Link>
            </div>
            <div className="buttons-container">
                <button id="idMarca" className="header-button">MARCAS</button>
                <Link to="/sucursales" className="header-button">SUCURSALES</Link>
                <button className="header-button">TIENDA</button>
                {isAuthenticated ? <Link to="/miPerfil" className="header-button">MI PERFIL</Link> : <div></div>}
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}

                
                {/* <button onClick={()=>loginWithRedirect()} className="header-button" >LOGIN</button> */}
            
            </div>
            <div className="mt-1 mb-1">
                </div>

            <div className="cart-container">
                

                <button className="cart-button">
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    <span className="cart-count">{props.cartCount}</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
