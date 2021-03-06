import React, { Component} from 'react'
import { Navbar, Results , Loader, Error} from '../../components'
import './movies.css'

class Movies extends Component{

    constructor(props){
        super(props)
        this.state={
            data:[],
            error:false
        }
    }

    componentDidMount(){
        this.setState({isLoaderOn:true, error:false})

        // set the content
        if( localStorage.getItem("SidebarSearch"))
            this.setContent(this.props.match.params.movieName, this.props.movie)
        else    
            this.setState({error:false})
    }

    // Set contents Content
    setContent = (query, apiCall) =>{
        apiCall( query )        
        .then( (movie, index) => this.setState({
            total_results : movie.total_results,
            total_pages : movie.total_pages,
            active_page : movie.page,
            index:index,
            data: movie.results,
            isLoaderOn:false
        }))
        .catch( () => this.setState({error:true}) )
    } 

    //update users input
    userInputupdate = (query) =>{
        
        //transfer to present screen
        this.props.history.push(`/movies/${query}`)

        // update the content
        this.setContent(query, this.props.movie)
    }

    render(){
        if( !this.state.error && this.state.total_results>0 ){
            return(
                <div>
                    <Navbar 
                        categories = {this.props.categories}
                        title={this.props.match.params.movieName}
                        selectedId={this.props.selectedId}
                        userInput = {this.userInputupdate}
                    />
                    <div className="results">
                        <Loader show={this.state.isLoaderOn} />
                        <Results
                            data={this.state.data}
                            movieId={this.props.movieId}
                            myMovies={this.props.myMovies}
                            handleUserClick = {this.props.handleUserClick}
                        />
                    </div>
                </div>
        );

        }
        else{
            return(
                <Error />
            );
            
        }

    }
}

export default Movies;