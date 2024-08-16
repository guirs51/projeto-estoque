
import Header from '../Header';

import '../App.css';

import BotaoVoltar from '../componentes/BotaoVoltar';

//Utilizada para auxiliar no controle de outras funcoes da aplicacao
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import axiosInstance from '../axios/configuracaoAxios';


function Cadastro() {

    //cria novo estado para os campos da tela
    const [campos, setCampos] = useState({
        numeroNota: 0,
        codigoPeca: '',
        quantidadePeca: 0,
        precoPeca: 0,
        lote: ''
    });

    const [mensagem, setMensagem] = useState('');

    const [erros, setErros] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCampos(prevCampos => ({
            ...prevCampos,
            [name]: value
        }));

        setErros(prevErros => ({
            ...prevErros,
            [name]: ''
        }));
    }

    function validarCampos() {
        const novosErros = {};
        if (!campos.numeroNota) {
            novosErros.numeroNota = 'nota  é obrigatório';
        }

        if (!campos.codigoPeca) {
            novosErros.codigoPeca = 'codigo da peca é obrigatório';
        }

        if (!campos.quantidadePeca) {
            novosErros.quantidadePeca = 'quantidade de pecas  é obrigatório';
        }

        if (!campos.precoPeca) {
            novosErros.precoPeca = 'preco  da peca é obrigatório';
        }

        if (!campos.lote) {
            novosErros.lote = 'lote da peca é obrigatório';
        }
        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function handleFormSubmit(event) {

        event.preventDefault();

        if (!validarCampos()) {
            return;
        }

        console.log('Submetendo:', campos);

        axiosInstance.post('/usuarios', campos)
            .then(response => {
                setMensagem('Formulário enviado com sucesso!');
                console.log(response.data);

                // Limpar os campos do formulário após o envio
                setCampos({
                    numeroNota: 0,
                    codigoPeca: '',
                    quantidadePeca: 0,
                    precoPeca: 0,
                    lote: ''
                });

                // Limpar mensagem após 3 segundos
                setTimeout(() => {
                    setMensagem('');
                }, 3000);
            })
            .catch(error => {
                console.error('Houve um erro ao enviar o formulário:', error);
                setMensagem('Erro ao enviar o formulário. Tente novamente.');
            });
    }

    return (
        <div className="App">
            <Header title="Formulario de Cadastro" />

            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Dados de Cadastro</h2>
                        </legend>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label> numero da Nota:
                                    <input type="number"  step="0.00" name="numeroNota" id="notasdeentrada" value={campos.numeroNota} onChange={handleInputChange} />
                                    {erros.numeroNota && <p className="error">{erros.numeroNota}</p>}
                                </label>
                            </div>
                        </div>    

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>codigo pecas:
                                    <input type="text" name="codigoPeca" id="codigopecas" value={campos.codigoPeca} onChange={handleInputChange} />
                                    {erros.codigoPeca && <p className="error">{erros.codigoPeca}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>quantidade de pecas:
                                    <input type="number" step="0.01" name="quantidadepeca" id="quantidadepecas" value={campos.quantidadePeca} onChange={handleInputChange} />
                                    {erros.quantidadePeca && <p className="error">{erros.quantidadePeca}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>preco da Peca:
                                    <input type="number" step="0.00" name="precoPeca" id="nomemaile" value={campos.precoPeca} onChange={handleInputChange} />
                                    {erros.precoPeca && <p className="error">{erros.precoPeca}</p>}
                                </label>
                            </div>
                        </div>

                        <div className='inline-filds'>
                            <div className='field-maior'>
                                <label>lote:
                                    <input type='text' name='lote' id='lote' value={campos.lote} onChange={handleInputChange} />
                                    {erros.lote && <p className='erro'>{erros.lote}</p>}
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Salvar" />
                    </fieldset>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <BotaoVoltar></BotaoVoltar>
            </div>
        </div>
    )
}

export default Cadastro;