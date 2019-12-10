import React, { Component } from 'react';
import Rodape from '../../components/Rodape'
import Axios from 'axios';
import '../../assets/css/App.css';
import { parseJwt } from '../../services/auth'

import Logo from '../../assets/img/opflix.nome.png'



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      senha: "",
      erro: ""
    }
  }

  mudarEstadoEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  mudarEstadoSenha = (event) => {
    this.setState({ senha: event.target.value })
  }

  efetuarLogin = (event) => {
    event.preventDefault();

    // Axios.post("http://localhost:5000/api/usuarios/login", {
    Axios.post("http://192.168.4.233:5000/api/usuarios/login", {
      email: this.state.email,
      senha: this.state.senha,
    })
      .then(data => {
        if (data.status == 200) {
          localStorage.setItem("usuario-opflix", data.data.token);

          if (parseJwt().Permissao === 'CLIENTE') {
            this.props.history.push('/HomeClie')
          } else {
            this.props.history.push('/HomeAdm')
          }

        } else {
          console.log("Errou!")
        }

      })
      .catch(erro => {
        this.setState({ erro: "Usuario ou senha invalida" });
        console.log(erro)
      })
  }
  render() {
    return (
      //   <div className="site">
      //     <div className="tudoComFooter">
      //       <form onSubmit={this.efetuarLogin} className="tudo" >

      //         <h1 className="login">Logar</h1>

      //         <div className="">
      //           <label className="name" for="username" >Username</label>
      //           <input type="text" id="username" required="required" onChange={this.mudarEstadoEmail} value={this.state.email} />
      //         </div>


      //         <div className="">
      //           <label className="senha" for="password">Password</label>
      //           <input type="password" id="password" required="required" onChange={this.mudarEstadoSenha} value={this.state.senha} />
      //         </div>

      //         <button className="button">Login</button>
      //         <a href="/Cadastro" className="cadastrar"><p> Cadastrar-se </p></a>
      //         <p style={{ color: "red", textAlign: "center" }}>
      //           {this.state.erro}
      //         </p>


      //       </form>
      //       <div className="footer">

      //         <Rodape />
      //       </div>
      //     </div>
      //   </div>
      // );
      <section className='container'>

        <div className='paginaCadastro'>

          <div className='titulo'>

          </div>
          <img className="logo" src={Logo}></img>

          <div className='formCadastro'>
            <form onSubmit={this.efetuarLogin} className="tudo1">
              <h1 className="login">Logar</h1>

              <div className="">
                <label className="name" for="username" >Username</label>
                <input className="input2" type="text" id="username" required="required" onChange={this.mudarEstadoEmail} value={this.state.email} />
              </div>


              <div className="">
                <label className="name" for="password">Password</label>
                <input className="input2" type="password" id="password" required="required" onChange={this.mudarEstadoSenha} value={this.state.senha} />
              </div>

              <button className="button">Login</button>
              <a href="/Cadastro" className="cadastrar"><p> Cadastrar-se </p></a>
              <p style={{ color: "red", textAlign: "center" }}>
                {this.state.erro}
              </p>
            </form>
          </div>

          <div className="footerL">
            <Rodape />
          </div>
        </div>
      </section>
    );
  }

}