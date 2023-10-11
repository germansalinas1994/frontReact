import { useState } from 'react'
import axios from 'axios'
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import 'animate.css'
import Home from './pages/Home'
import AppRouter from './router/AppRouter';
import {useAuth0} from '@auth0/auth0-react'


// import './css/App.css'

function App() {
  const { loginWithRedirect } = useAuth0()


  return (
    <AppRouter />

  )
}

export default App
