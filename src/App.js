import  React , { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component
{
  constructor()
  {
    super();

    this.state=
    {
      pokemons : [],
      searchField : ""
    }; 
  }
  componentDidMount()
  {
    const fetchpokemon=()=>
    {

        // array for storing all the 150 promises inorder to perform parallel async fetch to save time
        const promises = [] ;
        //  max value 898
        for( let i=1;i<=200;i++)
        {
          const url=`https://pokeapi.co/api/v2/pokemon/${i}`;
          promises.push( fetch(url)
            .then(res =>res.json() ) ); 
        }
        // all the promises are pushed into an array and once all of them are resolved then our details are collected
        var pokemon= []
        Promise.all(promises).then(results =>
        {
              pokemon= results.map((data) => (
              {
                name:data.name,
                id:data.id,
                image:`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
                type:data.types.map((type) => type.type.name).join(', ')
              }));
            this.setState({ pokemons:pokemon})
          });      
    };
    fetchpokemon()
  }

  handleChange=(e)=>
  {
    this.setState( { searchField:e.target.value})
  }
  render()
  {
    // console.log(this.state.pokemons)
    const { pokemons, searchField } = this.state;
    const filteredPokemons =  pokemons.filter( pokemon => 
    pokemon.name.toLowerCase().includes(searchField.toLowerCase()) )
    return (
      <div className="App">
        <img className='image_heading' src='https://cdn.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png' alt='pokemon logo' height='50px'/>
        <br/>
        <SearchBox
          placeholder = '  search pokemons'
          handleChange = {this.handleChange} />
        <CardList pokemons={filteredPokemons}/>
      </div>
    );
  }
}

export default App;
