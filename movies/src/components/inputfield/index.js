import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'

class InputField extends Component{

    constructor(props){
        super(props)
        this.state={
            query:''
        }
    }

    // send user input either by clicking the search button or with the enter key
    enterButtonPressed = (e) =>{
        if ( e.key === "Enter" && this.state.query !== '')
            this.props.query( e.target.value )
    }
    sendSearch = () =>{
        this.props.query(this.state.query)
    }
    
    render(){
        const styles = {
            floatingLabelStyle: {
              color: "#fff",
              borderColor: "#962A38",
              fontFamily:'Helvetica Neue',
              fontWeight:'100',
              fontSize:18,
              letterSpacing:1
            },
            floatingLabelFocusStyle: {
              color: "#962A38",
              textAlign: "center",
              fontFamily:'Helvetica Neue', 
              letterSpacing:1
              
            }
          }

        return(
            <div>
                <TextField
                    floatingLabelText=" movie name . . . "  
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.floatingLabelStyle}
                    inputStyle={styles.floatingLabelFocusStyle}
                    onChange={(e) => this.setState({query:e.target.value})}
                    onKeyPress={this.enterButtonPressed}
                />
                <Link to ="/present">
                    <button onClick={this.sendSearch} className="button_search"> Search</button>
                </Link>
            </div>
        );
    }
}

export default InputField;
