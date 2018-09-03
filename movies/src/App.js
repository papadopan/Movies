import React, { Component } from 'react';
import { Welcome , Main } from './components'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import MOVIES from './lib/callAPI'

const MOVIE_CALL = MOVIES(fetch)

class App extends Component {

  
  fetchMovies =MOVIE_CALL.fetchMovies
  fetchCategories = MOVIE_CALL.fetchCategories

  componentDidMount(){
    
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
                    />
                  )}/>
                </Switch>
              </BrowserRouter>
            </MuiThemeProvider>
          );
  }
}

export default App;
