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
        {
            if( localStorage.getItem("SidebarSearch") === "genre")
                this.setContent(localStorage.getItem("GenreId"), this.props.genres)
            else
                this.setContent(localStorage.getItem("searchTitle"), this.props.movie) 
        }
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

    updateContent = (name, id) =>{
        //send data to the upper state
        this.props.selectedId(name, id)

        this.setState({isLoaderOn:true})

        // update the content
        this.setContent(id, this.props.genres)
    }

    //update users input
    userInputupdate = (query) =>{
        this.props.userInput(query)
        
        //transfer to present screen
        this.props.history.push("/present")

        this.setState({isLoaderOn:true})

        // update the content
        this.setContent(query, this.props.movie)
    }

    render(){
        if( !this.state.error && this.state.total_results>0){
            return(
                <div>
                    <Navbar 
                        categories = {this.props.categories}
                        title={localStorage.getItem("searchTitle")}
                        selectedId={this.updateContent}
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

export default Present;