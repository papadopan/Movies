import React, { Component } from 'react';
import { Welcome , Main, Present, View, Profile, Movies } from './components'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import firebase from './firebase.js'
import './App.css'

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
  fetchRecommended = MOVIE_CALL.fetchRecommended

  componentDidMount(){
    if ( localStorage.getItem("myMovies"))
    {
        this.setState({
          myMovies:JSON.parse(localStorage.getItem("myMovies")),
          moviesIDS:JSON.parse(localStorage.getItem("myUids"))
      })
    }
    else
      this.fetchFirebaseData()
  }

  // establish the connection with the firebase database
  fetchFirebaseData = () =>{
    const itemsRef = firebase.database().ref('movies_list')
    itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let movies = []
    let uids = []
    
    
    for (let item in items)
    {
      movies.push(items[item].data)
      uids.push(items[item].uid)
    }

    this.setState({
        myMovies:movies,
        moviesIDS:uids
    })


    localStorage.setItem("myMovies", JSON.stringify(movies))
    localStorage.setItem("myUids" , JSON.stringify(uids))

    });

  }

  // handle user like/dislike click
  handleUserClick = (id, target) =>{

    if ( target === "delete"){
      //delete from movies
      this.deleteFromMovies(id)      
    }

    if( target === "add" && id !== "" && id !== " "){
        // add id to the state
        let movies = this.state.myMovies.slice()
        movies.push(id)

        this.setState({myMovies:movies})

        localStorage.setItem("myMovies", JSON.stringify(movies))

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

        // add uid to the state
        let uids = this.state.moviesIDS.slice();
        uids.push(uid)

        this.setState({moviesIDS: uids})
        localStorage.setItem("myUids" , JSON.stringify(uids))

        // send data
        var updates = {}
        updates['/movies_list/'+uid] = data
        firebase.database().ref().update(updates)
      }
  }
  // function to delete movies from firebase
  deleteFromMovies = (id) =>{
    let uid = this.state.moviesIDS[this.state.myMovies.indexOf(id)]
    firebase.database().ref().child('/movies_list/' + uid).remove();

      // update the movies and the local storage
      let movies = this.state.myMovies.slice();
      let uids = this.state.moviesIDS.slice();
      let idIndex = this.state.myMovies.indexOf(id)

      // remove this specific id from the arrays
      if (idIndex > -1){
        movies.splice( idIndex , 1)
        uids.splice( idIndex, 1)
      }

      this.setState({myMovies:movies})
      this.setState({moviesIDS:uids})

      //update the local storage
      localStorage.setItem("myMovies", JSON.stringify(movies))
      localStorage.setItem("myUids" , JSON.stringify(uids))

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
                      movieId={(id) => this.setState({chosenMovieId: id})}
                      myMovies={this.state.myMovies}
                      handleUserClick = {this.handleUserClick}
                      {...props}
                    />
                  )}/>
                  
                  <Route path="/movies/:movieName" render = { (props)=>(
                    <Movies
                      categories = {this.fetchCategories}
                      selectedId = {(name,id) => this.setState({title:name,query:id, selection:'genre'})}
                      userInput = { query => this.setState({query:query,title:query})}
                      userQuery = {this.state.query}
                      genres = {this.fetchGenreList}
                      title ={ this.state.title}
                      selection = {this.state.selection}
                      movie = {this.fetchMovie}
                      names={this.state.names}
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
                      chosenId={this.state.chosenMovieId}
                      infos={this.fetchMovieInfo}
                      fetchRecommended = {this.fetchRecommended}
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
                      deleteId={this.deleteFromMovies}
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
