import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Initialcandidato = {
    id: 0,
    rg: '',
    nomecandidato: ''
}

export const CandidatoForm = () => {
    const [candidato, setCandidato] = useState(Initialcandidato);
    const [loading, setLoading] = useState(false);

    const { candidatoId } = useParams();
    const navigate = useNavigate();

    const carregarCandidato = () => {
        setLoading(true);
        axios.get(`/api/candidato/${candidatoId}`)
            .then(response => {
                setCandidato(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Houve um erro ao carregar os Candidatos");
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidato((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const salvarCandidato = () => {
        const method = candidatoId != 0 ? 'put' : 'post';
        const url = candidatoId != 0 ? `/api/candidato/${candidatoId}` : '/api/candidato';

        axios[method](url, candidato)
            .then(() => {
                toast.success("Candidato cadastrado com sucesso!");
                navigate('/candidato');
            })
            .catch(() => {
                toast.error("Houve um erro ao cadastrar o candidato");
            });
    };

    const deletarCandidato = () => {
        if (window.confirm('Tem certeza que deseja deletar o candidato?')) {
            axios.delete(`/api/candidato/${candidatoId}`)
                .then(() => {
                    toast.error("Candidato deletado com sucesso!");
                    navigate('/candidato');
                })
                .catch(() => {
                    toast.error("Houve um erro ao deletar o candidato");
                });
        }
    };

    useEffect(() => {
        if (candidatoId && candidatoId != 0) {
            carregarCandidato();
        }
    }, [candidatoId]);

    return (
        <div className='row'>
            <div className='col'>
                <h2>{candidatoId != 0 ? "Editar candidato" : "Criar candidato"}</h2>
            </div>

            {candidatoId != 0 && (
                <div className='row'>
                    <div className='col'>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-2 col-form-label">Id</label>
                            <div className="col-6">
                                <input type='text' className='form-control' disabled value={candidato.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='row mt-3'>
                <div className='col'>
                    <div className="form-group row">
                        <label htmlFor="rg" className="col-2 col-form-label">RG</label>
                        <div className="col-6">
                            <input type='text' className='form-control' name="rg" value={candidato.rg} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <div className="form-group row">
                        <label htmlFor="nomecandidato" className="col-2 col-form-label">Nome do Candidato</label>
                        <div className="col-6">
                            <input type='text' className='form-control' name="nomecandidato" value={candidato.nomecandidato} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-1'>
                    <button className='btn btn-success mr-2' onClick={salvarCandidato} disabled={loading}>
                        {candidatoId != 0 ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
                <div className='col'>
                    {candidatoId != 0 && (
                        <button className='btn btn-outline-danger ml-2' onClick={deletarCandidato} disabled={loading}>
                            Deletar
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};
