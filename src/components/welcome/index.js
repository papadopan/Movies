import React, { Component } from 'react'
import './welcome.css'
import { Link } from 'react-router-dom'

class Welcome extends Component{
    render(){
        return(
            <div className="index_view">
                <div className="welcome">
                    <p>The #1 Movie search engine</p>
                    <Link to="/main"> <div className="button_search"> Search</div></Link>
                </div>
            </div>
        );
    }
}

export default Welcome;