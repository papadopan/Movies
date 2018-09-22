import React, { Component } from 'react'
import './box.css'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {Link} from 'react-router-dom'


class Box extends Component{
    constructor(props){
        super(props)
        this.state={
            movie_id:this.props.id,
        }
    }
    // send the id of the movie which is about to view
    sendMovieId = () =>{
        this.props.movieId( this.state.movie_id )
    }

    // handle the user clicking, deciding whether like it or not
    IconButtonHandle = (e) =>{
         // check if the image already exists
         if ( this.props.myMovies.indexOf(e.target.id) === -1)
            this.props.handleUserClick(e.target.id , "add")
        else    
            this.props.handleUserClick(e.target.id, "delete")

    }
    render(){
        return(
                <div className="card" id={this.props.id} onClick={this.sendMovieId}>
                    <Link to={`view/${this.props.id}`} style={{ textDecoration: 'none', color:'#FFFFF' }}>
                        <div className="card_image">
                            <img src={this.props.image} alt="movie theater"/>
                        </div>
                    </Link>
                    <div className="card_title">
                        <p>{this.props.title}</p>
                        <p>{this.props.date}</p>
                    </div>            
                    <div className="card_button">
                    <IconButton 
                        onClick={(e) => this.IconButtonHandle(e)}  
                        className="favourite"
                    >
                        <FontIcon  className="material-icons " id={this.props.id} color = {this.props.myMovies.includes( this.props.id.toString()) ? "#962A38" : "#FFFF"}>
                            favorite
                        </FontIcon>      
                    </IconButton>
                    
                    </div>
                </div>    
            
        );
    }
}

export default Box;