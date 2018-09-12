import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import './sidebar.css'


class InputField extends Component{

    constructor(props){
        super(props)
        this.state={
            query:''
        }
    }

    Pressed = (e) =>{
        if ( e.key === "Enter" && this.state.query !== '')
            this.props.query( e.target.value )
    }
    send = () =>{
        this.props.query(this.state.query)
    }
    render(){
        const styles = {
            floatingLabelStyle: {
              color: "#fff",
              borderColor: "#962A38"
            },
            floatingLabelFocusStyle: {
              color: "#962A38",
              textAlign: "center"
            }
          }

        return(
            <div>
            <TextField
                floatingLabelText=" Search  . . . "  
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.floatingLabelStyle}
                inputStyle={styles.floatingLabelFocusStyle}
                onChange={(e) => this.setState({query:e.target.value})}
                onKeyPress={this.Pressed}
            />
            <Link to ="/present">
                <button onClick={this.send} className="button_search"> Search</button>
            </Link>
            <Link to ="/profile">
                <button  className="mt50"> profile</button>
            </Link>
            </div>
        );
    }
}


class Sidebar extends Component{

    constructor(props){
        super(props)
        this.state={
            categories:[],
            name: 'Select Genre',
            selection:'movies',
            selected_id:undefined,
            
        }
    }

    componentDidMount(){
        this.props.categories().then(cat=> this.setState({categories : cat.genres}))
                                .catch( () => console.log("antonis"))
        this.setState({selection:'movies'})
    }

    // set the query category movies or actors
    changeFilter = (filter) =>{
        this.setState({selection:filter})
        this.props.saveFilter(filter)
        
    }

    // when select the specific genre
    genreSelected = (name , id) =>{
        this.setState({name: name, selected_id:id})
        this.props.selectedId(name, id)
        console.log(name)
        // set the local storage    
        localStorage.setItem("searchTitle", name)
        localStorage.setItem("GenreId", id)
        localStorage.setItem("SidebarSearch", "genre")
    }
    inputInserted = (input) =>{
        this.props.userInput(input)
        localStorage.setItem("SidebarSearch", "userInputMovie")
        localStorage.setItem("searchTitle", input)
    }
    render(){
        return(
            <div className={this.props.show ? 'sidenavbar move' : 'sidenavbar'}>      
                <div className="searches">
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
    }
}


export default Sidebar;