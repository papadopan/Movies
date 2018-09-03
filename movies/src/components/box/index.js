import React, { Component } from 'react'
import './box.css'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'


class Box extends Component{
    render(){
        return(
            <div className="card">
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
        );
    }
}

export default Box;