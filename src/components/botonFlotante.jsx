import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const FloatingButton = ({ onClick }) => {
    return (
        <div style={{ position: 'fixed', bottom: '50px', right: '50px' }}>
        <Link to='/crearProducto' className='btn btn-primary rounded-circle btn-lg' style={{ backgroundColor: '#ffd800', borderColor: '#ffd800' }}>
          <i className="fa-solid fa-plus" style={{ color: '#FFFFFF', fontSize: '3.0rem' }}></i>
        </Link>
      </div>      
      );
};

export default FloatingButton;