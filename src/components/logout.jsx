import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="header-button" onClick={() => logout()}>CERRAR SESIÓN</button>

  );
};

export default LogoutButton;