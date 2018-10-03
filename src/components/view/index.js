import React , { Component } from 'react'
import { Navbar, Error, Loader} from '../../components'
import star from '../../assets/star.png'
import time from '../../assets/time.png'
import money from '../../assets/money.png'
import { Carousel } from 'react-bootstrap'
import './view.css'



class View extends Component{
    constructor(props){
        super(props)
        this.state={
            recommendedMovies:[],
            error:false
        }
    }

    componentDidMount(){
        this.setState({error:false, isLoaderOn:true})
        this.fetchInfos()
        this.fetchRecommendations()
    }
    fetchInfos =()=>{
        this.props.infos( this.props.match.params.movieID )
        .then( movie=> this.setState({
            title: movie.original_title,
            votes: movie.vote_average,
            budget: movie.budget,
            time: movie.runtime,
            image:`http://image.tmdb.org/t/p/w185/${movie.poster_path}`,
            overview:movie.overview,
            isLoaderOn:false
        }) )
        .catch(error => this.setState({error:true}))
    }

    fetchRecommendations = () =>{
        this.props.fetchRecommended ( this.props.match.params.movieID )
        .then(response=>  this.setState({recommendedMovies:response.results}))
        .catch(error=> this.setState({error:true}))
    }
    render(){
        if( !this.state.error){
            return(
                <div>
                    <Navbar  
                    categories = {this.props.categories}
                    title={this.state.title}
                    selectedId={this.props.selectedId}
                    userInput = {query=> this.props.history.push(`/movies/${query}`)}
                    saveFilter = {(filter) => this.props.saveFilter(filter)}
                    />
                    <div className="movie_details">
                        <div className="movie_infos">
                            <div className="movie_poster">
                                <img src={this.state.image} alt="movie poster"/>
                            </div>
                            <div className="movie_more">
                                <p className="movie_overview">{this.state.overview}</p>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="time">
                                <img src={time} alt="minutes" className="icon"/>
                                <p> {this.state.time}</p>
                            </div>
                            <div className="stars">
                                <img src={star} alt="minutes" className="icon"/>
                                <p>{this.state.votes}</p>
                            </div>
                            <div className="money">
                                <img src={money} alt="minutes" className="icon"/>
                                <p> {this.state.budget}</p>
                            </div>
                        </div>
                        <Loader show={this.state.isLoaderOn}/>
                        <div className="recommendations">
                            <div className="recommend_title">
                                <span>recommended movies ...</span>
                            </div>
                            
                            <div className="carousel">                            
                                <div>
                                    <Carousel
                                    indicators={false}
                                    interval={2000}
                                    >
                                        {
                                            this.state.recommendedMovies.map( (movie, index) =>{
                                                return      <Carousel.Item key={index}>
                                                                <img width={500} height={500} alt="900x500" src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
                                                            </Carousel.Item>
                                            })
                                        }
                                    </Carousel>
                                </div>
                            </div>
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

export default View;