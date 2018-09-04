import React, { Component } from 'react';
import { Welcome , Main, Present, View } from './components'
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
  fetchMovieInfo = MOVIE_CALL.fetchMovieInfos

  componentDidMount(){
      this.fetchMovieInfo(399360).then(movie=> console.log(movie))
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
                      userInput = { query => this.setState({query:query,title:query})}
                      saveFilter = {(filter) => console.log(filter)}
                      movieId={(id) => this.setState({chosenMovieId: id})}
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
                      names={this.state.names}
                      saveFilter = {(filter) => console.log(filter)}
                      movieId={(id) => this.setState({chosenMovieId: id})}
                      {...props}
                    />
                  )}/>
                  <Route path="/view" render={ (props) =>(
                    <View
                      categories = {this.fetchCategories}
                      selectedId = {(name,id) => this.setState({title:name,query:id, selection:'genre'})}
                      userQuery = {this.state.query}
                      title ="Antonis"
                      userInput = { query => this.setState({query:query,title:query})}
                      saveFilter = {(filter) => console.log(filter)}
                      chosenId={this.state.chosenMovieId}
                      infos={this.fetchMovieInfo}
                      {...props}
                      />
                  )}
                  />
                </Switch>
              </BrowserRouter>
            </MuiThemeProvider>
          );
  }
}

export default App;