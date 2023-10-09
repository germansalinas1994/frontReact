import { Card, CardMedia } from "@mui/material";

const CardPublicacion = ({ publicaciones }) => {
    //Que hace el Dispatch?, el dispatch es el que ejecuta las acciones, es decir, el que ejecuta el reducer
    //el reducer es el que se encarga de cambiar el estado de la aplicacion

    return (

        <>
            {publicaciones.map((p) => (
                <Card sx={{ margin: '20px'}}>
                    <h2>
                        {p.precio}
                    </h2>
                    <CardMedia
                        component="img"
                        height="250"
                        image={p.idProductoNavigation.urlImagen}
                    />

                </Card>))
            }

        </>

    )
}
export default CardPublicacion;