import React, { Component } from 'react'
import loader from '../../assets/loader1.gif'
import './loader.css'



class Loader extends Component{
    render(){
        return(
            <div className={this.props.show ? "loader show" : "loader hide"}>
                <img src={loader} alt=" loader "/>
            </div>
        );
    }
}

export default Loader;