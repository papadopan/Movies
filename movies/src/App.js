import React, { Component } from 'react';
import { Welcome , Main, Present, View, Profile } from './components'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from './firebase.js'
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
    this.fetchFirebaseData()

  }

  // make the connection with the firebase database
  fetchFirebaseData = () =>{
    const itemsRef = firebase.database().ref('movies_list')
    itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let movies = []
    let uids = []
    
    
    for (let item in items)
    {
      movies.push(items[item].data)

    }
  
    for (let item in items)
    {
      uids.push(items[item].uid)
    }

    this.setState({
        myMovies:movies,
        moviesIDS:uids
    })
    
    localStorage.setItem("myMovies", movies)

    });

  }

  // handle user like/dislike click
  handleUserClick = (id, target) =>{

    if ( target === "delete"){
      let uid = this.state.moviesIDS[this.state.myMovies.indexOf(id)]
      firebase.database().ref().child('/movies_list/' + uid).remove();
    }

    if( target === "add"){
      // add id to the state
      let movies = this.state.myMovies.slice()
      movies.push(id)

      this.setState({myMovies:movies})


      // update the firebase

      var uid = firebase.database().ref().child('movies_list').push().key

      var data ={
        uid : uid,
        data : id,
        category : "mymovies",
        stars : 1,
        comments:[""],
        tag : "all"
      }

      this.setState({moviesIDS: uid})

      // send data
      var updates = {}
      updates['/movies_list/'+uid] = data
      firebase.database().ref().update(updates)

    }
    
    
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
                      myMovies={this.state.myMovies}
                      handleUserClick = {this.handleUserClick}
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
                      myMovies={this.state.myMovies}
                      handleUserClick = {this.handleUserClick}
                      {...props}
                    />
                  )}/>
                  <Route path="/view/:movieID" render={ (props) =>(
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
                  <Route path="/profile" render={ (props) =>(
                    <Profile 
                      categories = {this.fetchCategories}
                      selectedId = {(name,id) => this.setState({title:name,query:id, selection:'genre'})}
                      userInput = { query => this.setState({query:query,title:query})}
                      userQuery = {this.state.query}
                      myMovies= {this.state.myMovies}
                      fetchMovieInfo = {this.fetchMovieInfo}
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
