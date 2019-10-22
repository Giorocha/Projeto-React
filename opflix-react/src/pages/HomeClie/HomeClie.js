import React, { Component } from 'react';

import Rodape from '../../components/Rodape.js'
import '../../assets/css/HomeClie.css'

export default class HomeClie extends Component {

    constructor() {
        super();
        this.state = {
            listaLancamento: [],
            idCategoriaNavigation: [],
            idPlataformaNavigation: [],
            idClassificacaoNavigation: [],
            idTipoLancamentoNavigation: [],

            titulo: "",
            sinopse: "",
            dataLancamento: "",
            idCategoria: "",
            idPlataforma: "",
            duracaoMin: "",
            idClassficacao: "",
            idTipoLancamento: "",
        }
    }

    componentDidMount() {
        this.listarLancamentos();
    }

    listarLancamentos = () => {
        fetch("http://192.168.4.233:5000/api/lancamentos", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(respose => respose.json())
            .then(data => this.setState({ listaLancamento: data }))
            .catch(error => console.log(error))
        // console.log(this.state.listaLancamento, "olá");
    }

    render() {
        return (
            <div>
                <body className='paginaCliente'>
                    <div class="navbar">
                        <a class="active" href="/HomeClie">Home</a>
                        <a href="/">Deslogar</a>
                    </div>

                    <div className='tabelaLançamentos'>
                        <h2>Lançamentos</h2>

                        <table className='tabelaLista'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Titulo</th>
                                    <th>Sinopse</th>
                                    <th>Data Lançamento</th>
                                    <th>Categoria</th>
                                    <th>Plataforma</th>
                                    <th>Duração(min)</th>
                                    <th>Classificação</th>
                                    <th>Modelo</th>
                                </tr>
                            </thead>

                            <tbody className='tabela'>
                                {this.state.listaLancamento.map(element => {
                                    return (
                                        <tr key={element.idLancamento}>
                                            <td>{element.idLancamento}</td>
                                            <td>{element.titulo}</td>
                                            <td>{element.sinopse}</td>
                                            <td>{element.dataLancamento}</td>
                                            <td>{(element.idCategoriaNavigation === undefined) ?
                                                'categoria não registrada' : element.idCategoriaNavigation.nome}</td>
                                            <td>{(element.idPlataformaNavigation === undefined) ?
                                                'plataforma não registrada' : element.idPlataformaNavigation.nome}</td>
                                            <td>{element.duracaoMin}</td>
                                            <td>{(element.idClassificaoNavigation === undefined) ?
                                                'classificação nula' : element.idCategoriaNavigation.idade}</td>
                                            <td>{(element.idTipoLancamentoNavigation === undefined) ?
                                                'tipo não registrado' : element.idTipoLancamentoNavigation.tipo}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </body>
                <div className="footer">

                </div>
            </div>
        )
    }
}