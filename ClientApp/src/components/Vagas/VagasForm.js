import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialVaga = {
    id: 0,
    nome: '',
    descricao: ''
};

export const VagasForm = () => {
    const [vaga, setVaga] = useState(initialVaga);
    const [loading, setLoading] = useState(false);

    const { vagaId } = useParams();
    const navigate = useNavigate();

    const carregarVaga = () => {
        setLoading(true);
        axios.get(`/api/vaga/${vagaId}`)
            .then(response => {
                setVaga(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Houve um erro ao carregar as Vagas.");
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaga((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const salvarVaga = () => {
        const method = vagaId != 0 ? 'put' : 'post';
        const url = vagaId != 0 ? `/api/vaga/${vagaId}` : '/api/vaga';

        axios[method](url, vaga)
            .then(() => {
                toast.success("Vaga salva com sucesso!");
                navigate('/vagas');
            })
            .catch(() => {
                toast.error("Houve um erro ao salvar a vaga.");
            });
    };

    const deletarVaga = () => {
        if (window.confirm('Tem certeza que deseja deletar essa vaga?')) {
            axios.delete(`/api/vaga/${vagaId}`)
                .then(() => {
                    toast.error("Vaga deletada com sucesso!");
                    navigate('/vagas');
                })
                .catch(() => {
                    toast.error("Houve um erro ao deletar a vaga.");
                });
        }
    };

    useEffect(() => {
        if (vagaId && vagaId != 0) carregarVaga();
    }, []);

    return (
        <div className='row'>
            <div className='col'>
                <h2>{vagaId != 0 ? "Editar vaga" : "Criar vaga"}</h2>
            </div>

            {vagaId != 0 && (
                <div className='row'>
                    <div className='col'>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-2 col-form-label">Id</label>
                            <div className="col-6">
                                <input type='text' className='form-control' disabled value={vaga.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='row mt-3'>
                <div className='col'>
                    <div className="form-group row">
                        <label htmlFor="nome" className="col-2 col-form-label">Nome</label>
                        <div className="col-6">
                            <input type='text' className='form-control' name="nome" value={vaga.nome} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <div className="form-group row">
                        <label htmlFor="descricao" className="col-2 col-form-label">Descrição</label>
                        <div className="col-6">
                            <input type='text' className='form-control' name="descricao" value={vaga.descricao} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-1'>
                    <button className='btn btn-success mr-2' onClick={salvarVaga} disabled={loading}>
                        {vagaId != 0 ? 'Atualizar' : 'Salvar'}
                    </button>

                </div>
                <div className='col'>
                    {vagaId != 0 && (
                        <button className='btn btn-outline-danger ml-2' onClick={deletarVaga} disabled={loading}>
                            Deletar
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};
