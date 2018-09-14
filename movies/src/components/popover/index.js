import React, { Component } from 'react'
import './popover.css'
import { Popover, Divider, TextField } from 'material-ui';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

class PopOver extends Component{
    constructor(props){
        super(props)
        this.state={
            newTag:''
        }
    }

    //handle tag input from the user
    handleTagInput = (e) =>{
        console.log(e.target.value)
    }
    // if enter key is pressed
    enterKeyPress = (e) =>{
        if(e.key=== "Enter")
            this.props.tagUpdate(this.state.newTag, this.props.movie.firebase_ids)
    }
    render(){
                    
    const styles = {
        floatingLabelStyle: {
          color: "#818181",
          borderColor: "#962A38"
        },
        floatingLabelFocusStyle: {
          color: "#962A38",
          textAlign: "center"
        },
        add:{
          border: "1px solid #962A38",
        },
        white:{
          color: "#FFFFFF"
        },
        tagFocusStyle: {
          color: "#141414",
          borderColor:"#141414",
          textAlign: "center"
        }
      }
        return(
            <div>
                <Popover
                 open={this.props.show}
                 animated={true}
                 onRequestClose={this.props.onRequestClose}
                 anchorEl={this.props.anchorEl}
                 anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 style={{
                   background:"#962A38"
                 }}
                >
                 <p className="tag_list"> List of tags</p>
                <Divider key={this.props.movie.firebase_ids} />
                <Menu
                    disableAutoFocus={true}
                >
                <MenuItem  primaryText="all" onClick={() => this.props.tagUpdate("all", this.props.movie.firebase_ids)}/>
                    {
                        this.props.movie.allTags.map( (tag , index) =>
                            {
                                return <MenuItem key={index} primaryText={tag} onClick={() => this.props.tagUpdate(tag, this.props.movie.firebase_ids)}/>
                            })
                    }
                </Menu>
                <Divider key={this.props.movie.id} />
                <TextField
                    floatingLabelText="add a new tag . . ."
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.tagFocusStyle}
                    underlineFocusStyle={styles.tagFocusStyle}
                    inputStyle={styles.tagFocusStyle}
                    onChange = { (e)=> this.setState({newTag:e.target.value})}    
                    onKeyPress={this.enterKeyPress}      
                />
                <button type="button" className="btn add_tag_button"  onClick={() => this.props.tagUpdate(this.state.newTag, this.props.movie.firebase_ids)}>a d d</button>   
                </Popover>
            </div>
        );
    }
}

export default PopOver;