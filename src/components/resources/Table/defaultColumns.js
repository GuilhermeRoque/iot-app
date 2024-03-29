import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Button } from "@mui/material"

export default function actionsColumns(handleEdit, handleDelete, handleMonitor){
    const columnsList = []
    if (handleMonitor){
      columnsList.push(
        {
          name: "",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                <Button color="success" onClick={() => {handleMonitor(dataIndex)}} variant="outlined" startIcon={<BarChartIcon />}>
                  Monitorar
                </Button>
              );
            }
          }
        }
      )    
    }
    if (handleEdit){
      columnsList.push(
        {
          name: "",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                <Button color="primary" onClick={() => {handleEdit(dataIndex)}} variant="outlined" startIcon={<EditIcon />}>
                  Editar
                </Button>
              );
            }
          }
        }
      )    
    }
    if (handleDelete){
      columnsList.push(
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
        }
      )    
    }

  return(columnsList)
}