import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './error.css'

class Error extends Component{
    render(){
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


export default Error;