import React, { Component } from 'react'
import { Box} from '../../components'
import './results.css'


class Results extends Component{
    render(){
        return(
            <div className="results">
            {
                this.props.data.map( (movie,index)=>{   
                    return <div key={index} className="movies_slides">
                                <Box  
                                    title = {movie.title}
                                    date= {movie.release_date}
                                    id={movie.id}
                                    image = { `https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                                    movieId={this.props.movieId}
                                    myMovies={this.props.myMovies}
                                    handleUserClick = {this.props.handleUserClick}
                                />
                            </div>
                })

            }
            </div>
        );
    }
}

export default Results;
