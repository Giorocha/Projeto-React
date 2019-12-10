
import React, { Component } from 'react'
import '../../assets/css/Cadastro.css';
import Axios from 'axios';

import Rodape from '../../components/Rodape'

import Logo from '../../assets/img/opflix.nome.png'

export default class Cadastro extends Component {

    constructor() {
        super();
        this.state = {
            nome: "",
            email: "",
            senha: "",
            idTIpoUsuario: "",
            erro: ""
        }
    }

    setarEstadoNome = (event) => {
        this.setState({nome: event.target.value})
    }

    setarEstadoEmail = (event) => {
        this.setState({email: event.target.value})
    }

    setarEstadoSenha = (event) => {
        this.setState({senha: event.target.value})
    }

    setarEstadoTipoUsuario = (event) => {
        this.setState({idTIpoUsuario: event.target.value})
    }

    cadastrarUsuario = (event) => {
        event.preventDefault();

        Axios.post('http://192.168.4.233:5000/api/usuarios', {
            // headers: {
            //     'Authorization': 'Bearer ' + localStorage.getItem('token')
            // },          

            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            idTIpoUsuario: 2
        })           
        .catch(erro => {
            this.setState({erro: 'Ocorreu algum prolema. Por favor insira as suas informações de novo.'})
            console.log(this.state)
        })
    }

    render() {  
        return (
            <section className='container'>

                <div className='paginaCadastro'>
                    <div className='titulo'>
   
                    </div>
                    <img className="logo"src={Logo}></img>

                    <div className='formCadastro'>
                        <form onSubmit={this.cadastrarUsuario} className="tudo">
                        <h1 className="cadastro">Cadastrar</h1>
                            <div className='item'>
                            <label className="name1" for="username" >Username</label>
                                <input className='input1'
                                required="required"
                                    type='text'
                                    onChange={this.setarEstadoNome}
                                    value={this.state.nome}
                                />
                            </div>

                            <div className='item'>
                            <label className="name1" for="email" >Email</label>
                                <input className='input1'
                                required="required"
                                    type='text'
                                    onChange={this.setarEstadoEmail}
                                    value={this.state.email}
                                />
                            </div>

                            <div className='item'>
                            <label className="name1" for="senha" >Senha</label>
                                <input className='input1' 
                                required="required"
                                    type='password'
                                    onChange={this.setarEstadoSenha}
                                    value={this.state.senha}                                    
                                />
                            </div>

                            <div className='loginButton'>
                                <button href="/" className='button1'>Cadastrar </button>
                            </div>
                            <a href="/" className="voltarr"><p> Voltar para o login </p></a>

                            <p 
                                className="text__login"
                                style={{color: "red", textAlign: "center"}}
                            >   
                                {this.state.erro}
                            </p>
                        </form>
                    </div>
                    <div className="footerC">
                        <Rodape/>
                    </div>
                </div>
            </section>
        );
    }
}