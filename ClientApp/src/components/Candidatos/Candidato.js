import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';




const columns = [
    {
        field: 'id', headerName: '#', flex: 0.5
    },
    {
        field: 'rg',
        headerName: 'Rg',
        flex: 1
    },

    {
        field: 'nomecandidato',
        headerName: 'Nome Candidato',
        flex: 1
    },

    {
        field: "Ação",
        headerName: "Ação",
        sortable: false,
        flex: 0.3,
        headerAlign: 'right',
        renderCell: (params) => {
            return (
                <>
                    <Link type="button" className="btn btn-outline-secondary btn-sm" to={`/candidato/${params.row.id}`}>
                        <AddIcon />
                        Editar
                    </Link>
                </>
            )
        }
    }

];

export const Candidato = () => {
    const [candidato, setCandidato] = useState(null);
    const [loading, setLoading] = useState(true);

    const carregarCandidato = () => {
        axios.get('/api/candidato')
            .then(response => {
                setCandidato(response.data);
                setLoading(false);
            })

            .catch(() => {
                toast.error("Houve um erro ao carregar os Candidatos");
                setLoading(false);
            });
    }

    useEffect(() => {
        if (candidato == null && loading == true)
            carregarCandidato();
    }, [])
    if (loading)
        return <div>Carregando...</div>
    else
        return (
            <div>
                <div className='row'>
                    <div className='col d-flex justify-content-between align-items-center'>

                        <h2>
                            Candidatos
                        </h2>
                        <Link type="button" className="btn btn-outline-primary  btn-sm" to={`/candidato/0`} >
                            <addIcon />
                            Cadastrar Candidato</Link>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col'>

                        <DataGrid rows={candidato}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pagesize: 5,

                                    }
                                }
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick />
                    </div>

                </div>

            </div>

        )
}

export default Candidato


