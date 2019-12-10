import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { parseJwt } from './services/auth'


//pages
import App from './pages/Login/App.js';
import Administrador from   './pages/HomeAdm/Administrador.js';
import HomeClie from    './pages/HomeClie/HomeClie.js';
import Cadastro from    './pages/Cadastro/Cadastro.js';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.js';
import Localizacao from './pages/Localizacao/Localizacao.js'


import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// const RotaAdmin = ({ component: Component }) => (
//     <Router
//         render={props =>
//             localStorage.getItem("usuario-opflix") !== null && parseJwt().Permissao === 'ADMINISTRADOR' ?
//                 (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect
//                         to={{ pathname: "/", state: { from: props.location } }}
//                     />
//                 )
//         }

//     />
// );

const RotaCliente = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-opflix") !== null && parseJwt().Permissao !== 'ADMINISTRADOR' ?
                (
                    <Component {...props} />

                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                )
        }
    />
);

const RotaAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-opflix") !== null && parseJwt().Permissao !== 'CLIENTE' ?
                (
                    <Component {...props} />

                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                )
        }
    />
);

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <RotaAdmin path='/HomeAdm' component={Administrador} />
                <RotaCliente path='/HomeClie' component={HomeClie} />
                <Route exact path='/Cadastro' component={Cadastro} />
                <Route exact path='/Localizacao' component={Localizacao}/>
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
