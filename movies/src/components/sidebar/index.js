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
            <TextField
            floatingLabelText=" Search  . . . "  
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.floatingLabelStyle}
            inputStyle={styles.floatingLabelFocusStyle}
            onChange={(e) => this.setState({query:e.target.value})}
            onKeyPress={this.Pressed}
            />
        );
    }
}


class Sidebar extends Component{

    constructor(props){
        super(props)
        this.state={
            categories:[],
            name: 'Select Genre',
            selection:'movies'
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
                                    return <li key = {categorie.name}  onClick={() => this.setState({name: categorie.name})}> <Link to="/" className ={categorie.name} id={categorie.id}>{categorie.name}</Link> </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="search">
                            <p className="profile_text">Looking for :</p>
                            <input type="radio" name="query_category" checked= {this.state.selection === 'movies'} onChange={() => this.changeFilter("movies")} /> Movies    
                            <input type="radio" name="query_category" checked={this.state.selection ==='actors'} className="radio_input" onChange={ ()=> this.changeFilter("actors")} /> Actors
                            <InputField 
                                query={ (query) => this.setState({user_input:query})}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Sidebar;