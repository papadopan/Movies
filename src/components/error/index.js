import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './error.css'

class Error extends Component{
    render(){
        return(
                <div className="main_container">
                    <div className="error_message">
                        <span >There is a problem to our service, please visit us again</span>
                        <Link to="/main">
                            <button className="home_button">home</button>
                        </Link>
                    </div>
                </div>
        );
    }
}


export default Error;