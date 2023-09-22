import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import './css/styles.css'; //importo el css que cree
import { Auth0ContextInterface, Auth0Provider } from '@auth0/auth0-react'

import App from './App'; //que es lo que se va a renderizar
//importo bootstrap
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}><App /></Auth0Provider>
    
  </React.StrictMode>
);

  