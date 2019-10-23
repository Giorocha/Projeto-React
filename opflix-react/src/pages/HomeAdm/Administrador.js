import React, { Component } from 'react';

import Axios from 'axios';
import Rodape from '../../components/Rodape.js'

import '../../assets/css/Home.css'

import Logo from '../../assets/img/opflix.nome.png'

export default class Administrador extends Component {

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
            idClassificacao: "",
            idTipoLancamento: "",
            imagem: "",
        }
    }

    componentDidMount() {
        this.listarLancamentos();
        this.listarCategorias();
        this.listarPlataformas();
        this.listarClassificacoes();
        this.listarModelos();
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

    listarPlataformas = () => {
        Axios.get('http://192.168.4.233:5000/api/plataformas', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(response => {
                this.setState({ idPlataformaNavigation: response.data })
            })
            .catch(erro => console.log(erro))
    }

    listarClassificacoes = () => {
        Axios.get('http://192.168.4.233:5000/api/classificacoes', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(response => {
                this.setState({ idClassificacaoNavigation: response.data })
            })
            .catch(erro => console.log(erro))
    }

    listarModelos = () => {
        Axios.get('http://192.168.4.233:5000/api/tipolancamentos', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(response => {
                this.setState({ idTipoLancamentoNavigation: response.data })
            })
            .catch(erro => console.log(erro))
    }

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
        this.setState({ idPlataforma: Number(event.target.value) });
    }

    duracaoMinLancamento = (event) => {
        this.setState({ duracaoMin: event.target.value });
    }

    classificacaoLancamento = (event) => {
        this.setState({ idClassificacao: (Number(event.target.value) === undefined) ? 1 : Number(event.target.value) });
        console.log('olá', this.state.idClassificacao)
    }

    tipoLancamento = (event) => {
        this.setState({ idTipoLancamento: Number(event.target.value) });
    }

    imagemLancamento = (event) => {
        this.setState({ imagem: event.target.value });
        console.log(this.state.imagem)
    }



    cadastrarLancamento = (event) => {
        event.preventDefault();

        fetch("http://192.168.4.233:5000/api/lancamentos", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix")
            },
            body: JSON.stringify({
                titulo: this.state.titulo,
                sinopse: this.state.sinopse,
                dataLancamento: this.state.dataLancamento,
                idCategoria: this.state.idCategoria,
                idPlataforma: this.state.idPlataforma,
                duracaoMin: this.state.duracaoMin,
                idClassificao: this.state.idClassificacao,
                idTipoLancamento: this.state.idTipoLancamento,
                imagem: this.state.imagem,
            }),
        })
            .then(response => this.listarLancamentos())
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <body className='paginaAdministrador'>
                    <div className="navbar">
                        <img className="logo" src={Logo}></img>
                        <a href="/">Deslogar</a>
                        <a class="active" href="#">Home</a>
                    </div>

                    <header className='nav'>
                        <nav className='navBar'>

                        </nav>
                    </header>

                    <div className='adm'>

                        <div className='tabelaLançamentos'>
                            <h2 style={{color: "white"}}>Lançamentos</h2>

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
                                                    'classificação nula' : element.idClassificaoNavigation.idade}</td>
                                                <td>{(element.idTipoLancamentoNavigation === undefined) ?
                                                    'tipo não registrado' : element.idTipoLancamentoNavigation.tipo}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className='cadastroLancamento'>
                            <h2 style={{color: "white"}}>Cadastrar Lançamento</h2>
                            <form className="adm">
                                <div>
                                    <h3 style={{color: "white"}}>Titulo</h3>
                                    <input className="titulo" type="text" onChange={this.tituloLancamento} value={this.state.titulo} />

                                    <h3 style={{color: "white"}}>Sinopse</h3>
                                    <input className="sinopse" type="text" onChange={this.sinopseLancamento} value={this.state.sinopse} />

                                    <h3 style={{color: "white"}}>Data de lançamento</h3>
                                    <input className="dataLancamento" type="dateTime" onChange={this.dataLancamento} value={this.state.dataLancamento} />

                                    <h3 style={{color: "white"}}>Gênero</h3>
                                    <select className='genero' onChange={this.categoriaLancamento}>
                                        <option value='null'>Selecione</option>
                                        {this.state.idCategoriaNavigation.map(element => {
                                            return (
                                                <option value={element.idCategoria} key={element.idCategoria}>{element.nome}</option>
                                            )
                                        })}
                                    </select>

                                    <h3 style={{color: "white"}}>Plataforma</h3>
                                    <select className='plataforma' onChange={this.plataformaLancamento}>
                                        <option value='null'>Selecione</option>
                                        {this.state.idPlataformaNavigation.map(element => {
                                            return (
                                                <option value={element.idPlataforma} key={element.idPlataforma}>{element.nome}</option>
                                            )
                                        })}
                                    </select>

                                    <h3 style={{color: "white"}}>Duração em min</h3>
                                    <input className="duracao" type="number" onChange={this.duracaoMinLancamento} value={this.state.duracaoMin} />

                                    <h3 style={{color: "white"}}>Classificação</h3>
                                    <select className='classificacao' onChange={this.classificacaoLancamento}>
                                        <option value='null'>Selecione</option>
                                        {this.state.idClassificacaoNavigation.map(element => {
                                            return (
                                                <option value={element.idClassificacao} key={element.idClassificacao}>{element.idade}</option>
                                            )
                                        })}
                                    </select>

                                    <h3 style={{color: "white"}}>Modelo</h3>
                                    <select className='modelo' onChange={this.tipoLancamento}>
                                        <option value='null'>Selecione</option>
                                        {this.state.idTipoLancamentoNavigation.map(element => {
                                            return (
                                                <option value={element.idTipoLancamento} key={element.idTipoLancamento}>{element.tipo}</option>
                                            )
                                        })}
                                    </select>

                                    <h3 style={{color: "white"}}>Imagem (URL)</h3>
                                    <input className="titulo" type="text" onChange={this.imagemLancamento} value={this.state.imagem} />

                                </div>

                                <button className='botaoCadastrar' onClick={this.cadastrarLancamento}>Cadastrar</button>
                            </form>
                        </div>


                        <div className='tabelaCategorias'>
                            <h2 style={{color: "white"}}>Gêneros</h2>

                            <table className='tabelaGeneros'>
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
                </body>
                <div className="footer">

                <Rodape />
                </div>

            </div>
        );
    }       
}