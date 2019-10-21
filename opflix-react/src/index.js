import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//pages
import App from './pages/Login/App.js';
import HomeAdm from './pages/HomeAdm/HomeAdm.js'
import HomeClie from './pages/HomeClie/HomeClie.js'
import Cadastro from './pages/Cadastro/Cadastro.js'
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.js';


import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";


const RotaPrivada = ({component: Component}) => (
    <Route 
        render={ props => 
            localStorage.getItem("usuario-opflix") !== null  ?
            (
                <Component {...props} />
            )  :  (
                <Redirect 
                    to={{pathname: "/Login", state: {from: props.location}}}
                />
            )
        }
    />
)

const RotaAdm = ({component: Component}) => (
    <Route 
        render={ props => 
            localStorage.getItem("usuario-opflix") !== null  ?
            (
                <Component {...props} />
            )  :  (
                <Redirect 
                    to={{pathname: "/Login", state: {from: props.location}}}
                />
            )
        }
    />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App}/>
                <RotaAdm path='/HomeAdm' component={HomeAdm}/>
                <RotaPrivada path='/HomeClie' component={HomeClie}/>
                <Route exact path='/Cadastro' component={Cadastro}/>
                <Route component={NaoEncontrado}/>

            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
