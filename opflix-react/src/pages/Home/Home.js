import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import Rodape from '../../components/Rodape'

import '../../assets/css/Home.css'

export default class Home extends Component {

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

    componentDidMount(){
        this.listarLancamentos();
         this.listarCategorias();
        // this.listarPlataformas();
        // this.listarClassificacoes();
        // this.listarModelos();
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

    listarCategorias = () => {
        Axios.get("http://192.168.4.233:5000/api/categorias", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(response => {
                this.setState({ idCategoriaNavigation: response.data });
                console.log(response.data)
            })
            .catch(erro => console.log(erro))
            // console.log(this.state.idCategoriaNavigation, "bem-vindo")
    }

    // listarPlataformas = () => {
    //     Axios.get('http://localhost:5000/api/lancamentos')
    //         .then(response => {
    //             this.setState({idPlataformaNavigation: response.data})
    //         })
    //         .catch(erro => console.log(erro))
    // }

    // listarClassificacoes = () => {
    //     Axios.get('http://localhost:5000/api/lancamentos')
    //         .then(response => {
    //             this.setState({idClassificacaoNavigation: response.data})
    //         })
    //         .catch(erro => console.log(erro))
    // }

    // listarModelos = () => {
    //     Axios.get('http://localhost:5000/api/lancamentos')
    //         .then(response => {
    //             this.setState({idTipoLancamentoNavigation: response.data})
    //         })
    //         .catch(erro => console.log(erro))
    // }

    tituloLancamento = (event) => {
        this.setState({ titulo: event.target.value });
    }

    sinopseLancamento = (event) => {
        this.setState({ sinopse: event.target.value });
    }

    dataLancamento = (event) => {
        this.setState({ dataLancamento: event.target.value });
    }

    categoriaLancamento = (event) => {
        this.setState({ idCategoria: Number(event.target.value) });
    }

    plataformaLancamento = (event) => {
        this.setState({ idPlataforma: event.target.value });
    }

    duracaoMinLancamento = (event) => {
        this.setState({ duracaoMin: event.target.value });
    }

    classficacaoLancamento = (event) => {
        this.setState({ idClassficacao: event.target.value });
    }

    tipoLancamento = (event) => {
        this.setState({ idTipoLancamento: event.target.value });
    }


    cadastrarLancamento = (event) => {
        event.preventDefault();

        fetch("http://192.168.4.233:5000/api/lancamentos", {
            method: "POST",
            body: JSON.stringify({
                titulo: this.state.titulo,
                sinopse: this.state.sinopse,
                dataLancamento: this.state.dataLancamento,
                idCategoria: this.state.idCategoria,
                idPlataforma: this.state.idPlataforma,
                duracaoMin: this.state.duracaoMin,
                idClassficacao: this.state.idClassficacao,
                idTipoLancamento: this.state.idTipoLancamento
            }),

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => this.listarLancamentos())
            .catch(error => console.log(error))
    }


    render() {
        return (
            <body className='paginaAdministrador'>

                <header className='nav'>
                    <nav className='navBar'>

                    </nav>
                </header>

                <div className='adm'>

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
                                    <th>Duração</th>
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

                    <div className='cadastroLancamento'>
                        <h2>Cadastrar Lançamento</h2>
                        <form onSubmit={this.cadastrarLancamento}>
                            <div>
                                <input className="titulo" placeholder="Titulo" type="text" onChange={this.tituloLancamento} value={this.state.titulo} />
                                <input className="sinopse" placeholder="Sinopse" type="text" onChange={this.sinopseLancamento} value={this.state.sinopse} />
                                <input className="dataLancamento" placeholder="Data Lançamento" type="date" onChange={this.dataLancamento} value={this.state.dataLancamento} />

                                <select classNome='categoria' onChange={this.categoriaLancamento}>
                                    {this.state.idCategoriaNavigation.map(element => {
                                        return (
                                            <option value={element.idCategoria} key={element.idCategoria}>{element.nome}</option>
                                        )
                                    })}
                                </select>

                                <input className="plataforma" placeholder="Plataforma" type="text" onChange={this.plataformaLancamento} value={this.state.idPlataforma} />
                                <input className="duracao" placeholder="Duração em min" type="text" onChange={this.duracaoMinLancamento} value={this.state.duracaoMin} />
                                <input className="classificacao" placeholder="Classificação" type="text" onChange={this.classficacaoLancamento} value={this.state.idClassficacao} />
                                <input className="modelo" placeholder="Modelo" type="text" onChange={this.tipoLancamento} value={this.state.ID} />
                            </div>
                            <button >
                                Cadastrar
                            </button>
                        </form>
                    </div>

                    <div className='tabelaCategorias'>
                        <h2>Gêneros</h2>

                        <table className='tabelaLista'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>

                            <tbody className='tabela'>
                                {this.state.idCategoriaNavigation.map(element => {
                                    return (
                                        <tr key={element.idCategoria}>
                                            <td>{element.idCategoria}</td>
                                            <td>{element.nome}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Rodape />
            </body>

        );
    }
}