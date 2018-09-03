import React, { Component } from 'react'
import { Loader, Box} from '../../components'
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
                                    image = { `http://image.tmdb.org/t/p/w185//${movie.poster_path}`}
                                />
                            </div>
                })

            }
            </div>
        );
    }
}

export default Results;