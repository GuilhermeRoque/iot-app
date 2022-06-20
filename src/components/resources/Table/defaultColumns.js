import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"

export default function actionsColumns(handleEdit, handleDelete){
    return(
        [{
            name: "",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return (
                  <Button color="primary" onClick={() => {handleEdit(dataIndex)}} variant="outlined" startIcon={<EditIcon/>}>
                  Editar
                  </Button>
                );
              }
            }
          },
          {
            name: "",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return (
                  <Button color="error" onClick={() => {handleDelete(dataIndex)}} variant="outlined" startIcon={<DeleteIcon />}>
                  Excluir
                  </Button>
                );
              }
            }
          }]        
    )
}