import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify'; // Biblioteca de notificação opcional
import Autocomplete from '@mui/material/Autocomplete'; // Exemplo de Autocomplete (MUI)
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const BuscarItem = forwardRef(({
    idItem,
    recebeItem,
    path,
    recebeInputValue,
    disabled,
    placeholder
}, ref) => {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    // Função para buscar a lista de itens (GET All)
    const carregarDados = (pesquisa) => {
        setLoading(true);
        axios.get(`${path}`, {
            params: {
                search: pesquisa // Parâmetro de pesquisa, se houver
            }
        })
            .then((response) => {
                setLoading(false);
                setItems(response.data); // Define os itens recebidos da API
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Erro ao buscar itens: " + error.message);
            });
    };

    // Função para buscar item por ID (GET By ID)
    const getItem = async (idItem) => {
        try {
            const response = await axios.get(`${path}/${idItem}`);
            setValue(response.data); // Define o valor do item recebido
            recebeItem(response.data); // Envia o item para o pai
        } catch (error) {
            toast.error("Erro ao buscar item por ID: " + error.message);
        }
    };

    // Função para limpar os campos
    const _limparCampos = () => {
        setInputValue('');
        setValue(null);
        carregarDados(''); // Busca novamente todos os itens
        recebeItem(null); // Notifica o pai sobre o item limpo
    };

    // Para tornar o método `_limparCampos` acessível ao componente pai
    useImperativeHandle(ref, () => ({
        limparCampos() {
            _limparCampos();
        }
    }));

    // Executa a busca de itens conforme o inputValue (com debounce de 1 segundo)
    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            carregarDados(inputValue);
        }, 1000);

        return () => clearTimeout(searchTimeout); // Limpa o timeout
    }, [inputValue]);

    // Executa a busca de item por ID ao montar ou quando o idItem mudar
    useEffect(() => {
        if (idItem) {
            getItem(idItem);
        }
    }, [idItem]);

    // Função para renderizar cada item da lista
    const renderItems = (item) => (
        <div key={item.id || item.codigo} style={{ zIndex: 1 }}>
            <div><strong>{item.id || item.codigo}</strong> - {item.descricao || item.name || item.nome}</div>
        </div>
    );

    return loading ? (
        "Carregando..."
    ) : (
        <Autocomplete
            disablePortal
            options={items}
            getOptionLabel={(option) => option.name || option.descricao || option.nome || inputValue}
            getItemValue={(option) => option.descricao ?? option.nome}
            freeSolo
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={(options) => options}
            renderInput={(params) => (
                <div className="input-group" ref={params.InputProps.ref}>
                    <div className="input-group-prepend">
                        <div className="form-control input-group-text">
                            <i>
                                {value ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />}
                            </i>
                        </div>
                    </div>
                    <input
                        type="text"
                        {...params.inputProps}
                        className="form-control noborder"
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                    {!disabled && (
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={_limparCampos}>
                                Limpar
                            </button>
                        </div>
                    )}
                </div>
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {renderItems(option)}
                </li>
            )}
            noOptionsText={'Nenhum resultado encontrado'}
            value={value}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                if (recebeInputValue) {
                    recebeInputValue(newInputValue);
                }
                setInputValue(newInputValue); // Atualiza o valor do input
            }}
            onChange={(event, newValue) => {
                recebeItem(newValue); // Envia o item selecionado ao componente pai
                setValue(newValue); // Define o item selecionado
            }}
            disabled={disabled}
        />
    );
});

export default BuscarItem;
BuscarItem.displayName = "BuscarItem";

BuscarItem.propTypes = {
    idItem: PropTypes.number,
    recebeItem: PropTypes.func.isRequired,
    recebeInputValue: PropTypes.func,
    path: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};
