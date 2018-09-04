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
        if (this.props.selection === 'genre')
            this.setGenreContent(this.props.userQuery)
        else
            this.setMovieContent(this.props.userQuery)    
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
                        title={this.props.title}
                        selectedId={this.updateContent}
                        userInput = {this.userInputupdate}
                        saveFilter = {(filter) => this.props.saveFilter(filter)}
                    />
                    <div className="results">
                    <Loader show={this.state.isLoaderOn} />
                    <Results
                        data={this.state.data}
                        movieId={this.props.movieId}
                    />
                    
                    </div>
                    
                </div>
        );
    }
}

export default Present;