import React , { Component } from 'react'
import { Navbar, Error} from '../../components'
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
        this.setState({error:false})
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
            overview:movie.overview
        }) )
        .catch(error => this.setState({error:true}))
    }

    fetchRecommendations = () =>{
        this.props.fetchRecommended ( this.props.match.params.movieID )
        .then(response=>  this.setState({recommendedMovies:response.results}))
        .catch(error=> this.setState({error:true}))
    }

    userInputupdate = (query) =>{
        this.props.userInput(query)
        
        //transfer to present screen
        this.props.history.push("/present")
    }

    render(){
        if( !this.state.error){
            return(
                <div>
                    <Navbar  
                    categories = {this.props.categories}
                    title={this.state.title}
                    selectedId={this.props.selectedId}
                    userInput = {(query) => this.userInputupdate(query)}
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
                                                return     <Carousel.Item key={index}>
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