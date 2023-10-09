import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardPublicacion from '../../components/Publicacion/CardPublicacion';

const ListadoPublicacion = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY


    const [publicaciones, setPublicaciones] = useState([]);


    useEffect(() => {
        // Lógica para obtener las Publicaciones
        const fetchPublicaciones = async () => {
            // showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica

            try {
                debugger;
                const response = await axios.get(apiLocalKey + '/publicaciones');
                debugger;
                setPublicaciones(response.data.result.data)
                // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

            } catch (error) {
                // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                console.log(error);
            }
        };

        fetchPublicaciones();
    }, []);


    return (
         <Box sx={{ flexGrow: 1}} mt={10} >
         <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <CardPublicacion publicaciones={publicaciones}  />
         </Grid>
       </Box>
    )
}

export default ListadoPublicacion