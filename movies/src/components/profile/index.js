import React , { Component } from 'react'
import { Navbar, ProfileBox} from '../../components'
import './profile.css'
import firebase from '../../firebase'
import ModalComponent from '../modal';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            ids:[],
            movies:[],
            names:[],
            infos:[],
        }
    }
    userInputHandle = ( filter )=>{
        this.props.userInput(filter)

        this.props.history.push('/present')
    }
    componentDidMount(){
        this.fetchFirebaseData()
        this.setState({openModal:false})
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
            if (a.original_title < b.original_title)
              return -1;
            if (a.original_title > b.original_title)
              return 1;
            return 0;
          }
          movies.sort(compare);

        // clear the state
        this.setState({
            time : 0,
            tags : tags,

            movies:[],
            infos:[]
          })
          
        movies.map( id =>{
            this.props.fetchMovieInfo(id.data).then( movie =>{

                // instance of the state
                let movies = this.state.movies.slice()

                // push firebase data to every object
                movie.firebase_ids = id.uid
                movie.stars=id.stars
                movie.tag = id.tag
                movie.comments = id.comments

                //add the new movie 
                movies.push(movie)


                //upodate the state
                this.setState({movies:movies})
            })
        })
        
        
    })
  
    }
    render(){
        return(
            <div>
                <Navbar
                    categories = {this.props.categories}
                    title="My profile ..."
                    selectedId={this.props.selectedId}
                    userInput = {this.userInputHandle}
                    saveFilter = {(filter) => this.props.saveFilter(filter)}
                />
               <div className="results movieShow">
               
                {
                    this.state.movies.map( (movie, index)=>{
                        return <ProfileBox
                                key={movie.firebase_ids}
                                movie={movie}
                                index={index}
                                handleModal={this.handleModal}   
                                />
                    })
                }
                </div>
            </div>
        );
    }
}
export default Profile;