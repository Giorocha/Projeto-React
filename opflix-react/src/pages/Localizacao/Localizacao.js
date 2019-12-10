import React, { Component } from 'react';

import Rodape from '../../components/Rodape.js'
import Logo from '../../assets/img/opflix.nome.png'

import '../../assets/css/localizacao.css'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class Localizacao extends Component {

    constructor() {
        super();
        this.state = {
            localizacao: [],

            titulo: "",

        }
    }

    componentDidMount() {
        this.trazerLocalizacao();
    }

    trazerLocalizacao = () => {
        fetch("http://192.168.4.233:5000/api/localizacoes", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(respose => respose.json())
            .then(data => this.setState({ localizacao: data }))
            .catch(error => console.log(error))
    }

    displayMarkers = () => {
        return this.state.localizacao.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                onClick={() => console.log(store)} />
        })
    }


    render() {
        return (
                <div className="rayssa">
                    <div className="navbar">
                        <img className="logo" src={Logo}></img>
                        <a href="/">Deslogar</a>
                        <a class="active" href="/Localizacao">Localização</a>
                        <a class="" href="/HomeClie">Home</a>
                    </div>

                    <h2 style={{  color: "white", textAlign: "center", fontSize: "25px" }}>Localizações</h2>
                    <Map
                        google={this.props.google}
                        zoom={3}
                        style={mapStyles}
                        initialCenter={{ lat: -8.5464085, lng: -53.4404716 }}
                    >
                        {this.displayMarkers()}
                    </Map>
                </div>
        )
    }
}

export default GoogleApiWrapper({
})(Localizacao);

const mapStyles = {
    width: '70%',
    height: '70%',
    left: 200,
    borderRadius: "3%"
};