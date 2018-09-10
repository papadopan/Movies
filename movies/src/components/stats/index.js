import React , { Component} from 'react'
import './stats.css'

class Stats extends Component{
    render(){
        return (
            <div className="profileStats">
            <div className="movieNum">
                <p>30</p>
                <p>movie#</p>

            </div>
            <div className="movieFavouriteGenre"></div>
            <div className="movieRuntime"></div>
            
            </div>

        );
    }
}

export default Stats;