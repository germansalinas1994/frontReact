import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ListadoCategoria from '../pages/Categoria/ListadoCategoria';
// import ListadoProducto from '../pages/Producto/ListadoProducto';
import ListadoPublicacion from '../pages/Producto/ListadoPublicacion';
import NuevaCategoria from '../pages/Categoria/NuevaCategoria';


const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/productos" element={<ListadoProducto/>}/> */}
                <Route path="/productos" element={<ListadoPublicacion/>}/>
                <Route path="/categorias" element={<ListadoCategoria />} />
                <Route path="/nuevacategoria" element={<NuevaCategoria />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="*" element={ <Navigate to={"/home"}/> } /> */}
            </Routes>
        </div>
    )
}

export default AppRouter;