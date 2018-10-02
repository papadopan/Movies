import React, { Component } from 'react'
import './present.css'
import { Navbar, Results , Loader, Error} from '../../components'


class Present extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            error:false
        }
    }

    componentDidMount(){
        this.setState({isLoaderOn:true, error:false})

        // set the content, decide which api call to make 
        if (localStorage.getItem("SidebarSearch") !== undefined)
            this.setContent(localStorage.getItem("GenreId"), this.props.genres)
        else
            this.setState({error:true})
   
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

    render(){
        if( !this.state.error){
            return(
                <div>
                    <Navbar 
                        categories = {this.props.categories}
                        title={localStorage.getItem("genreTitle")}
                        selectedId={this.props.selectedId}
                        userInput = {query=> this.props.history.push(`/movies/${query}`)}
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

export default Present;