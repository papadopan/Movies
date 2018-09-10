import React, { Component } from 'react'
import './present.css'

import { Navbar, Results , Loader} from '../../components'


class Present extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.setState({isLoaderOn:true})

        // set the content, decide which api call to make 
        if (localStorage.getItem("SidebarSearch") === 'genre')
            this.setGenreContent(localStorage.getItem("GenreId"))
        else
            this.setMovieContent(localStorage.getItem("searchTitle"))    
    }

    

    // Set Movie Content
    setMovieContent = (query) =>{
        this.props.movie( query )        
        .then( movie => this.setState({
            total_results : movie.total_results,
            total_pages : movie.total_pages,
            active_page : movie.page,
            data: movie.results,
            isLoaderOn:false
        }))
        .catch( () => this.setState({error:true}) )

    } 

    // Set Genre Content
    setGenreContent = (query) =>{
        this.props.genres( query )        
        .then( movie => this.setState({
            total_results : movie.total_results,
            total_pages : movie.total_pages,
            active_page : movie.page,
            data: movie.results,
            isLoaderOn:false
        }))
        .catch( () => this.setState({error:true}) )
    }

    updateContent = (name, id) =>{

        //send data to the upper state
        this.props.selectedId(name, id)

        this.setState({isLoaderOn:true})

        // update the content
        this.setGenreContent(id)
    }
    userInputupdate = (query) =>{
        this.props.userInput(query)
        
        //transfer to present screen
        this.props.history.push("/present")

        this.setState({isLoaderOn:true})

        // update the content
        this.setMovieContent(query)
    }
    render(){
        return(
                <div>
                    <Navbar 
                        categories = {this.props.categories}
                        title={localStorage.getItem("searchTitle")}
                        selectedId={this.updateContent}
                        userInput = {this.userInputupdate}
                        saveFilter = {(filter) => this.props.saveFilter(filter)}
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
}

export default Present;