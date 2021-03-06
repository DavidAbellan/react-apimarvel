import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const api_key = '?apikey=2416ff630c2380ca9a68e9d40a869c3f'
const url = 'https://gateway.marvel.com/v1/public/characters/'
const url_c = 'https://gateway.marvel.com/v1/public/comics/'

class tr extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            personaje: null,
            posicionComic: props.match.params.idComic,
            portadaComic: null

        }
        this.id = props.match.params.id;
        this.recuperaPersonaje(this.id);
        
    }
    async recuperaPersonaje(id) {
        let pers = await axios.get(url + id + api_key)
        this.setState({ personaje: pers })
        this.recuperaComic();

    }
    async recuperaComic() {
        let c = this.state.personaje.data.data.results[0].comics.items[this.state.posicionComic].resourceURI;
        let arraype = c.split('/')
        let comicid = arraype[arraype.length - 1];
        let com = await axios.get(url_c + comicid + api_key);
        this.setState({ portadaComic: com })


    }
    recortaId(url) {
        let arr = url.split('/');
        return arr[arr.length - 1]

    }
    render() {
        if (this.state.personaje == null || this.state.portadaComic == null) {
            return (
                <h1>Working on...</h1>)
        } else {
            return (
                <div  className="comicDetail">
                    <img src={this.state.portadaComic.data.data.results[0].images[0].path + 
                        '.' + this.state.portadaComic.data.data.results[0].images[0].extension} />
                    <h1>{this.state.personaje.data.data.results[0].comics.items[this.state.posicionComic].name}</h1>
                    <p> {this.state.personaje.data.data.results[0].comics.items[this.state.posicionComic].description} </p>

                    <h1>Characters</h1>
                    
                        {this.state.portadaComic.data.data.results[0].characters.items.length !== 0 ? this.state.portadaComic.data.data.results[0].characters.items.map(a =>  <Link to={"/result/personaje/ch/" + this.recortaId(a.resourceURI)} >{a.name}</Link>) : <p>Unknow Characters</p>}
                    

                </div>
            )
        }




    }


}





export default tr;

