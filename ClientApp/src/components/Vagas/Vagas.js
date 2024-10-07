import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.5 },
  {
    field: 'nome',
    headerName: 'Nome',
    flex: 1
  },
  {
    field: 'descricao',
    headerName: 'Descrição',
    flex: 1
  },
  {
    field: "action",
    headerName: "Ação",
    sortable: false,
    flex: 1,
    headerAlign: 'right',
    align: 'right',
    renderCell: (params) => {
      return (
        <>
          <button
            type='button'
            className='btn btn-success'
            onClick={() => { toast.success("id: " + params.row.id) }}>
            <AddIcon />
          </button>
        </>
      )
    }
  },
];

const Vagas = () => {
  const [vagas, setVagas] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarVagas = () => {

    axios.get('/api/vaga')
      .then(response => {
        toast.success("Vagas foram carregadas com sucesso!");
        setVagas(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Houve um erro ao carregar as Vagas.");
        setLoading(false);
      });
  }

  useEffect(() => {

    if (vagas == null && loading == true)
      carregarVagas();
  }, [])

  // if (loading)
  //   return <div>Carregando...</div>
  // else
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <h2>
            Vagas
          </h2>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col'>
          <DataGrid
            rows={vagas}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  )
}

export default Vagas
