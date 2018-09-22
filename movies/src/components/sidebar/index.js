import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import user from "../../assets/user.png"
import './sidebar.css'
import { InputField, Error} from '../../components'

class Sidebar extends Component{

    constructor(props){
        super(props)
        this.state={
            categories:[],
            name: 'Select Genre',
            selection:'movies',
            selected_id:undefined,
            error:false
        }
    }

    componentDidMount(){
        this.setState({error:false})
        this.props.categories().then(cat=> this.setState({categories : cat.genres}))
                                .catch( (error) => this.setState({error:true}))
    }

    // when select the specific genre
    genreSelected = (name , id) =>{
        this.setState({name: name, selected_id:id})
        this.props.selectedId(name, id)
        
        // set the local storage    
        localStorage.setItem("searchTitle", name)
        localStorage.setItem("GenreId", id)
        localStorage.setItem("SidebarSearch", "genre")
    }

    // when the user sends the input
    inputInserted = (input) =>{
        this.props.userInput(input)
        localStorage.setItem("SidebarSearch", "userInputMovie")
        localStorage.setItem("searchTitle", input)
    }
    render(){
        if(!this.state.error){
            return(
                <div className={this.props.show ? 'sidenavbar move' : 'sidenavbar'}>      
                    <div className="searches">
                        <div className="profileIcon">
                            <Link to="/profile">
                                <img src={user} alt="profile user"/>
                            </Link>
                        </div>
                        <div className="form-group">
                            <p className="profile_text">I am interested in</p>
                            <div className="dropdown genres">
                                <button className="btn  dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span className="profile_text">{this.state.name}</span>
                                    <span className="caret profile_text"></span>
                                </button>
                                <ul className="dropdown-menu " aria-labelledby="dropdownMenu1">
                                    {
                                        this.state.categories.map(categorie=>{
                                        return <li key = {categorie.name}  onClick={() =>this.genreSelected( categorie.name, categorie.id) }> <Link to="/present" className ={categorie.name} id={categorie.id}>{categorie.name}</Link> </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="search">
                                <p className="profile_text">Looking for :</p>                            
                                <InputField 
                                    query={ this.inputInserted}  
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );

        }else{
            return(
                <Error/>
            );
        }
  
    }
}


export default Sidebar;