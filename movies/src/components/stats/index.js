import React , { Component} from 'react'
import './stats.css'

class Stats extends Component{
    render(){
        return (
            <div className="profileStats">
            <div className="movieNum">
                <div>
                    <p className="numbers">{this.props.number}</p>
                    <p>#movies</p>
                </div>
            </div>
            <div className="movieFavouriteGenre">
                <div>
                    <p className="numbers">{this.props.genre}</p>
                    <p>favourite genre</p>
                </div>
            </div>
            <div className="movieRuntime">
                <div>
                    <p className="numbers">{this.props.time} mins</p>
                    <p>watch time</p>
                </div>
            </div>
            
            </div>

        );
    }
}

export default Stats;