import React, { Component } from 'react';

import Rodape from '../../components/Rodape.js'
import '../../assets/css/HomeClie.css'

import Logo from '../../assets/img/opflix.nome.png'

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
            imagem: "",
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
                    <div className="navbar">
                        <img className="logo" src={Logo}></img>
                        <a href="/">Deslogar</a>
                        <a class="active" href="/HomeClie">Home</a>
                    </div>

                        <h2 className="lanca">Lançamentos</h2>
                            <div className="containerF">
                                {this.state.listaLancamento.map(element => {
                                    return (

                                    <div className="itemF">
 
                                            <img src={element.imagem} width='144px' border='5px solid red'></img>                                     
                                            <td>{element.titulo}</td>
                                            <td>{element.dataLancamento}</td>  
                                    </div>
                                    )
                                })}
                           </div>
                </body>
                <div className="footer">
                    <Rodape/>
                </div>
            </div>
        )
    }
}