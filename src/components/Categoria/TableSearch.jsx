import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';

const TableSearch = ({ categorias,onEdit,onDelete}) => {
  const myColumns = [
    { field: 'nombre', headerName: 'Nombre Categoría', width: 500 },
    { field: 'descripcion', headerName: 'Descripción', width: 500 },
    { field: 'cantidadProductos', headerName: 'Cantidad Productos', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 200,
      cellClassName: 'actions',
      //aca va id porque es el nombre de la columna de la tabla
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => onEdit(id)}  // Llamar a la función pasando el ID
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => onDelete(id)}  // Llamar a la función pasando el ID

          />,
        ];
      },
    },
  ];

  if (categorias.length > 0) {
    return (
        <DataGrid
          sx={{
            maxWidth:1,
            maxHeight:1,
             width: {xs:0.3,md:1} 
            }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          rows={categorias}
          columns={myColumns}
          getRowId={(row) => row.idCategoria}
          disableDensitySelector
          disableColumnSelector
          disableColumnFilter
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          localeText={{
            noRowsLabel: 'No hay filas',
            footerPaginationRowsPerPage: 'Filas por página:',
            footerPaginationPage: 'Página:',
            footerTotalRows: 'Total de filas:',
            selectionFooter: (count) => `${count} filas seleccionadas`,
          }}
        />
    );
  }
}

export default TableSearch;
