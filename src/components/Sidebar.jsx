import React, { useState } from 'react';
import './css/Sidebar.css';


const Sidebar = ({ open, toggleSidebar }) => {
    return (
      <div id='sidebar' className={`sidebar ${open ? 'open' : ''}`}>
        <h2>Sidebar</h2>
        <p>Contenido del sidebar</p>
        <button onClick={toggleSidebar}>Cerrar</button>
      </div>
    );
  }
  
  export default Sidebar;
  