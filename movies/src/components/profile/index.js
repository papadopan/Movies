import React , { Component } from 'react'
import { Navbar, ProfileBox, Filtering, Stats, Loader} from '../../components'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import './profile.css'
import firebase from '../../firebase'


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            ids:[],
            movies:[],
            names:[],
            infos:[],
            error:false
        }
    }
    userInputHandle = ( filter )=>{
        this.props.userInput(filter)

        this.props.history.push('/present')
    }
    componentDidMount(){
        this.setState({openModal:false, error:false, isLoaderOn:true})
        this.fetchFirebaseData()  
    }
    
    // fetch data from firebase
    fetchFirebaseData = () =>{

        const itemsRef = firebase.database().ref('movies_list')
        itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let movies = []
        let tags =[]

        for (let item in items)
        {
          movies.push(items[item])

  
          if(items[item].tag === "all")
            continue
            
          if(!tags.includes(items[item].tag))
          {
            tags.push(items[item].tag)
          }
        }

        // sort movies based on the stars
        function compare(a,b) {
            if (a.tag < b.tag)
              return -1;
            if (a.tag > b.tag)
              return 1;
            return 0;
          }
          movies.sort(compare);
          

        // clear the state
        this.setState({
            time : 0,
            tags : tags,
            movies:[],
            allMovies:[],
            infos:[],
            allGenres:[],
            moviesNumber: movies.length
          })
          let length = 0; 
                   
        movies.map( id =>{
            
            this.props.fetchMovieInfo(id.data).then( movie =>{

                // instance of the state
                let movies = this.state.movies.slice()

                // instance of genres
                let genres = this.state.allGenres.slice();
                
                // all the genres in one array 
                movie.genres.map( genre=>{
                    genres.push(genre.name)
                })

                // most common genre
                let max =-1;
                let maxGenre =""
                for ( let i in genres){
                    let count =0;
                    for (let j=i;j<genres.length;j++){
                        if( genres[i] === genres[j] )
                            count++;
                        if( count > max){
                            max= count;
                            maxGenre= genres[i]
                        } 
                    }
                }
                // calculate the length time for the profile 
                length+=movie.runtime

                // push firebase data to every object
                movie.firebase_ids = id.uid
                movie.stars=id.stars
                movie.tag = id.tag
                movie.comments = id.comments
                movie.allTags= tags

                //add the new movie 
                movies.push(movie)


                //upodate the state
                this.setState({movies:movies, allMovies:movies, moviesLength:length, allMoviesLength:length, allGenres:genres, maxGenre: maxGenre, isLoaderOn:false})
            })
            .catch( error => this.setState({error:true}))
        })
        
        
    })
  
    }

    // when the user drops the movie to the delete area, the movie is automatically removed
    onDrop = (e)=>{
        this.props.deleteId(this.state.dragId)
        this.setState({isLoaderOn:true, maxGenre:'not movies yet', moviesLength:'0'})
    }
    onDragOver = (e) =>
    {
        e.preventDefault();
    }

    // update showing movies
    updateShowingMovies = (tag) =>{
        if (tag !== "all"){
            let newMovies=[]
            let length = 0
            for (let i in this.state.allMovies){
                if( this.state.allMovies[i].tag === tag){
                    newMovies.push(this.state.allMovies[i])
                    length+=this.state.allMovies[i].runtime
                }
            }
    
            this.setState({movies: newMovies, moviesNumber:newMovies.length, moviesLength:length})

        }else{
            this.setState({movies:this.state.allMovies, moviesNumber:this.state.allMovies.length, moviesLength:this.state.allMoviesLength})   
        }


    }
    render(){
        if( !this.state.error){ 
            return(
                <div>
                    <Loader show={this.state.isLoaderOn} />
                    <Navbar
                        categories = {this.props.categories}
                        title="My profile"
                        selectedId={this.props.selectedId}
                        userInput = {this.userInputHandle}
                        saveFilter = {(filter) => this.props.saveFilter(filter)}
                    />
                    <Stats
                        number ={this.state.moviesNumber}
                        time={this.state.moviesLength}
                        genre={this.state.maxGenre }
                    />
                    <Filtering 
                        tags={this.state.tags}
                        updateShowingMovies={this.updateShowingMovies}
                    />
                <div className="results movieShow">
                
                    {
                        this.state.movies.map( (movie, index)=>{
                            return <ProfileBox
                                    key={movie.firebase_ids}
                                    movie={movie}
                                    index={index}
                                    handleModal={this.handleModal}   
                                    drag={(id) =>this.setState({dragId:id})}
                                    />
                        })
                    }
                    </div>
                
                <div 
                        className="trash" 
                        onDrop = {(e) => this.onDrop(e)}
                        onDragOver = {(e)=>this.onDragOver(e)}>
                        <FontAwesome
                            className="far fa-trash-alt"
                            size="2x"
                            name="trash"
                        />
                </div>
                </div>
            );
        }
        else{
            return(
                <div className="main_container">
                <div className="error_message">
                    <span >Our service is unavailable now, please visit us another time </span>
                    <Link to="/">
                        <button className="home_button">home</button>
                    </Link>
                </div>
 
                </div>
            );
        }
    }
}
export default Profile;