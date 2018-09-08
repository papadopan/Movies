import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from '../../firebase'
import './modal.css'

class ModalComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[],
            title:''
        }
    }

    componentDidMount(){
       this.setState({movie:this.props.movie, show:this.props.show, inputComment:""})

    }
    // delete comment 
    commentTrash = (e) =>{
        
        var comments = this.props.movie.comments

        if( e.target.id>0 && e.target.id < comments.length)
        {
          comments.splice(e.target.id , 1)
        }
        
      
        firebase.database().ref('movies_list/'+ this.props.movie.firebase_ids).update({comments : comments})
    }
    //handle comment input
    handleCommentInput = (e) =>{
        this.setState({inputComment: e.target.value})
    }
    // save users comment
    saveComment = () =>{
        if(this.state.inputComment.replace(/\s/g, '').length !==0){
            
            var new_comments = this.props.movie.comments
            new_comments.push(this.state.inputComment)
            
            // save comments to firebase
            firebase.database().ref('movies_list/'+ this.props.movie.firebase_ids).update({comments : new_comments})
            
        }    
    }
    enterKey = (e)=>{
        if(e.key === "Enter")
            this.saveComment()
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
            <Modal
                show={this.props.show}
                className="modal"
            >
                <Modal.Header className="modalHeader">
                    <Modal.Title id="contained-modal-title">
                         {this.props.movie.original_title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    {
                        this.props.movie.comments.map((comment, index)=>{
                            return  <div key={index} className={index > 0 ?"modalCommentBox" :'none'}  >
                                        <p  className="modalComments">{comment}</p>
                                        <div className="commentTrash">
                                            <IconButton 
                                                onClick={(e)=>this.commentTrash(e)} 
                                                id={index}
                                            >
                                                <FontIcon id={index} color="#962A38" className="material-icons">
                                                    delete
                                                </FontIcon>                    
                                            </IconButton>
                                        </div>
                                    </div>
                        })
                    }
                </Modal.Body>
                <Modal.Footer className="modalFooter">
                <div className="modal_form">
                        <div className="insertComment">
                        <TextField
                            floatingLabelText=" add a comment . . . "  
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelFocusStyle}
                            onChange = {this.handleCommentInput}
                            onKeyPress={this.enterKey}
                            />
                        </div>
                        <div className="modal_buttons">
                          <RaisedButton label="e x i t" data-dismiss="modal"  backgroundColor="#962A38" onClick={this.props.closeModal}/>
                          <RaisedButton label="a d d"  onClick={this.saveComment}  buttonStyle={styles.add} data-dismiss="modal" backgroundColor="#141414" labelStyle={styles.white}/>
                        </div>
                    </div>
                </Modal.Footer>

            </Modal>
            
        );
    }
}


export default ModalComponent;