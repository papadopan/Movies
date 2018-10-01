import React , { Component } from 'react'
import './navbar.css'
import { Sandwich, Sidebar } from '../../components'
import logo from "../../assets/logo1.png"
import {Link} from 'react-router-dom'

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

    // update present component
    updateUserInput = ( query ) =>{
        this.handleHamburgerClick()

        this.props.userInput(query)
    }
    // update selected id
    updateSelectedId = (name, id)=>{
        this.props.selectedId(name, id)
        this.handleHamburgerClick();
    }
    render(){
        return(
            <div className="header_nav">

                <div className="logo_img">
                    <Link to="/main">
                        <div className="navbar-brand" >
                            <span>movie</span>
                            <img src={logo} alt="logo img"/>
                            <span>gram</span>
                        </div>
                    </Link>
                    
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
                    userInput = {this.updateUserInput}
                    selectedId = {this.updateSelectedId}
                />          
            </div>
        );
    }
}

export default Navbar;