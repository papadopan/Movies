import React, { Component } from 'react'
import logo from "../../assets/logo1.png"
import { Box,Loader, Results , Navbar } from '../../components'
import { Link } from 'react-router-dom'
import './main.css'

class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            showingSideBar:false,
            filterName:'Upcoming',
            filtering:'upcoming',
            data:[],
            isLoaderOn:true,
            error:false
        }
    }

    //set to the state
    componentDidMount(){
        // set the loader on
        this.setState({isLoaderOn:true, error:false})
        // set movies to the state
        this.setMovies( this.state.filtering)
    }
    setMovies = (filter) =>{
        this.props.fetchingMovies(filter)
        .then( movie => this.setState({
            total_results : movie.total_results,
            total_pages : movie.total_pages,
            active_page : movie.page,
            data: movie.results,
            isLoaderOn:false
        }))
        .catch( () => this.setState({error:true}) )

    }


    //change filter
    changefilter = (e) =>{
        this.setState({ filterName:e.target.name , filtering:e.target.id, isLoaderOn:true})
        this.setMovies(e.target.id)
        
    }
    userInputupdate = (query) =>{
        this.props.userInput(query)
        
        //transfer to present screen
        this.props.history.push("/present")
    }

    render(){
        if( !this.state.error){
            return (
                <div className="main_container">
                    <div className="header">
                        <div className="brands">
                            <Navbar
                                categories = {this.props.categories}
                                title="Box office time ..."
                                selectedId={this.props.selectedId}
                                userInput = {this.userInputupdate}
                                prop ={this.props}
                            />
                        </div>
                        <div className="user_options">
                            <div className="dropdown_selection">
                                <div className="form-group">
                                    <div className="dropdown">
                                        <button className="btn filtered dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            {this.state.filterName}
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            <li onClick={this.changefilter}><a id="popular" name="Popular">Popular</a></li>
                                            <li onClick={this.changefilter}><a id="now_playing" name="Now Playing">Now Playing</a></li>
                                            <li onClick={this.changefilter}><a id="top_rated" name="Top Rated">Top rated</a></li>
                                            <li onClick={this.changefilter}><a id="upcoming" name="Upcoming">Upcoming</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div> 
                    
                    <div className="results">
                    <Loader show={this.state.isLoaderOn} />
                    <Results
                        data={this.state.data}
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

export default Main;