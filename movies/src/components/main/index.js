import React, { Component } from 'react'
import logo from "../../assets/logo1.png"
import { Box,Loader, Sandwich, Sidebar } from '../../components'
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

    //handle the hamburger icon
    handleHamburgerClick = () =>{
        this.setState({showingSideBar: !this.state.showingSideBar})
    }

    //change filter
    changefilter = (e) =>{
        this.setState({ filterName:e.target.name , filtering:e.target.id, isLoaderOn:true})
        this.setMovies(e.target.id)
        
    }

    render(){
        if( !this.state.error){
            return (
                <div className="main_container">
                    <div className="header">
                        <div className="brands">
                            <nav className="navbar navbar-default">
                                <div className="container-fluid">
                                    <Sandwich 
                                        show={this.state.showingSideBar}
                                        handleClick = {this.handleHamburgerClick}
                                    />
                                    <Sidebar 
                                        show={this.state.showingSideBar}
                                        categories={this.props.categories}
                                    />
                                    <div className="navbar-header">
                                        <a className="navbar-brand" >
                                            <span>movie</span>
                                            <img src={logo} alt="logo img"/>
                                            <span>gram</span>
                                        </a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="user_options">
                            <div className="title">
                                <p>Box office time ...</p>
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
                    </div> 
                    
                    <div className="results">
                    <Loader show={this.state.isLoaderOn} />
                    {
                        
                        this.state.data.map( (movie,index)=>{
                            return <div key={index} className="movies_slides">
                                        <Box  
                                            title = {movie.title}
                                            date= {movie.release_date}
                                            image = { `http://image.tmdb.org/t/p/w185//${movie.poster_path}`}
                                        />
                                    </div>
                        })
    
                    }
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