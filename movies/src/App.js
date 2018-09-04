import React, { Component } from 'react';
import { Welcome , Main, Present } from './components'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import MOVIES from './lib/callAPI'

const MOVIE_CALL = MOVIES(fetch)

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      selectedId:undefined,
      title:'',
      names:[]
    }
  }

  // set all the api functions
  fetchMovies = MOVIE_CALL.fetchMovies
  fetchCategories = MOVIE_CALL.fetchCategories
  fetchGenreList = MOVIE_CALL.fetchSpecificGenre
  fetchMovie = MOVIE_CALL.fetchMovie

  componentDidMount(){
      this.fetchMovie(this.state.query).then(movie=> console.log(movie))
  }

  update = (query) =>{
    this.setState({query:query,title:query})

    var name = this.state.names.slice();
    this.fetchMovie(query).then( movie => {
        
          movie.results.map( movie=>{
            
            let new_name= movie.title
            name.push(new_name)
            
          })
          console.log(name)
          this.setState({names:name})
          this.SetThem(name)
    })


  }
  SetThem = ( name ) =>{
      console.log(name)
      console.log(this.state.names)
  }
  render() {
    return (
            <MuiThemeProvider>
              <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={Welcome}/>
                  <Route path="/main"  render={ (props) =>(
                    <Main
                      fetchingMovies = {this.fetchMovies}
                      categories = {this.fetchCategories}
                      selectedId = {(name,id) => this.setState({title:name,query:id, selection:'genre'})}
                      userQuery = {this.state.query}
                      title ={ this.state.title}
                      // userInput = { query => this.setState({query:query,title:query})}
                      userInput = { this.update}
                      {...props}
                    />
                  )}/>
                  <Route path="/present" render = { (props)=>(
                    <Present
                      categories = {this.fetchCategories}
                      selectedId = {(name,id) => this.setState({title:name,query:id, selection:'genre'})}
                      userInput = { query => this.setState({query:query,title:query})}
                      userQuery = {this.state.query}
                      genres = {this.fetchGenreList}
                      title ={ this.state.title}
                      selection = {this.state.selection}
                      movie = {this.fetchMovie}

                      {...props}
                    />
                  )}/>
                </Switch>
              </BrowserRouter>
            </MuiThemeProvider>
          );
  }
}

export default App;
