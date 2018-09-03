import React , { Component } from 'react'
import './navbar.css'
import { Sandwich, Sidebar } from '../../components'
import logo from "../../assets/logo1.png"

class Navbar extends Component{

    constructor(props){
        super(props)
        this.state={
            showingSideBar:false
        }
    }

    // handle hamburger click
    handleHamburgerClick = () =>{
        this.setState({showingSideBar: !this.state.showingSideBar})
    }
    render(){
        return(
            <div className="header_nav">

                <div className="logo_img">
                    <a className="navbar-brand" >
                        <span>movie</span>
                        <img src={logo} alt="logo img"/>
                        <span>gram</span>
                    </a>
                    
                </div>
                <div className="header_title">
                    <span>{this.props.title} </span>
                </div>  

                <Sandwich 
                    show={this.state.showingSideBar}
                    handleClick = {this.handleHamburgerClick}
                /> 
                <Sidebar 
                    show={this.state.showingSideBar}
                    categories={this.props.categories}
                    userInput = {this.props.userInput}
                    selectedId = {this.props.selectedId}
                    
                />          
            </div>
        );
    }
}

export default Navbar;