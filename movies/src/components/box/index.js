import React, { Component } from 'react'
import './box.css'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {Link} from 'react-router-dom'


class Box extends Component{
    constructor(props){
        super(props)
        this.state={
            movie_id:this.props.id
        }
    }
    sendMovieId = () =>{
        this.props.movieId( this.state.movie_id )
    }
    render(){
        return(
            <Link to="/view">
                <div className="card" id={this.props.id} onClick={this.sendMovieId}>
                    <div className="card_image">
                        <img src={this.props.image} alt="movie theater"/>
                    </div>
                    <div className="card_title">
                        <p>{this.props.title}</p>
                        <p>{this.props.date}</p>
                    </div>
                    <div className="card_button">
                    <IconButton 
                        onClick={(e) => this.ButtonHandle(e)}  
                        className="favourite"
                    >
                        <FontIcon  className="material-icons "  color = "#962A38" >
                            favorite
                        </FontIcon>      
                    </IconButton>
                    
                    </div>
                </div>    
            </Link>
        );
    }
}

export default Box;