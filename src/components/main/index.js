import React, { Component } from 'react'
import { Loader, Results , Navbar, Error } from '../../components'
import Pagination from "react-js-pagination"
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
        this.setState({isLoaderOn:true,filterName: localStorage.getItem("selectedFilterName") ? localStorage.getItem("selectedFilterName") : 'Upcoming' ,error:false})
           
        // set movies to the state
        this.setMovies( localStorage.getItem("selectedFilter") ? localStorage.getItem("selectedFilter") : "upcoming" , 1)
    }

    // fetch all the movies 
    setMovies = (filter, page_number) =>{
        this.props.fetchingMovies(filter, page_number)
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
        localStorage.setItem("selectedFilter", e.target.id)
        localStorage.setItem("selectedFilterName", e.target.name)
        
    }
    //pagination handle
    handlePageChange = (page_number) =>
    {
        // present 20 pages for every type
        if(page_number <=20){

            this.setState({active_page:page_number, isLoaderOn:true})
            
            // update the movies content
            this.setMovies( this.state.filtering, page_number)
        }
    
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
                                userInput = {query=>this.props.history.push(`/movies/${query}`)}
                                saveFilter = {(filter) => this.props.saveFilter(filter)}
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
                        movieId={this.props.movieId}
                        myMovies={this.props.myMovies}
                        handleUserClick = {this.props.handleUserClick}
                    />
                    </div>
                    <div className="pagination">
                        <div>
                            <Pagination
                            activePage={this.state.active_page}
                            itemsCountPerPage={21}
                            totalItemsCount={this.state.total_results - 50}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            hideFirstLastPages={true}
                            />
                        </div> 
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

export default Main;