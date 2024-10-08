import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

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
          <Link type="button" className="btn btn-outline-secondary  btn-sm" to={`/vagas/${params.row.id}`} >
            <AddIcon />
            Editar
          </Link>
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

  if (loading)
    return <div>Carregando...</div>
  else
    return (
      <div>
        <div className='row'>
          <div className='col d-flex justify-content-between align-items-center'>
            <h2>Vagas</h2>
            <Link type="button" className="btn btn-outline-primary  btn-sm" to={`/vagas/0`} >
              <AddIcon />
              Criar
            </Link>
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
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </div>
    )
}

export default Vagas
