import React , { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import RaisedButton from 'material-ui/RaisedButton'
import { ModalComponent, PopOver } from '../../components'
import './profile_box.css'
import firebase from '../../firebase'


class ProfileBox extends Component{

    constructor(props){
        super(props)
        this.state={
            openModal:false
        }
    }

    componentDidMount(){
        this.setState({openModal:false, showPopOver:false})
    }

    //handle star rating system
   handleStars = (nextValue, prevValue, name) =>{
    firebase.database().ref('movies_list/'+ name).update({stars : nextValue})
    }

    handleModal = (index) =>{
        this.setState({ modalId:index , openModal:true })
        console.log(this.props.movie[index])
        
    }
    // Drag and Drop

    // save the id of the box which started to drag
    onDragStart = (e) =>{
        this.setState({ dragId : e.target.id})
        this.props.drag(e.target.id)
    }
    onDragOver = (e) =>
    {
        e.preventDefault();
    }
    // update movie tag
    tagUpdate = (tag, firebaseId) =>{
        if(tag.replace(/\s/g, '').length !== 0 || tag!=="")
            firebase.database().ref('movies_list/'+ firebaseId).update({tag : tag})
        this.setState({showPopOver:false})
    }

    render(){
        return(
                <div 
                    className="presentBox"
                    draggable
                    onDragStart ={ (e) => this.onDragStart(e)}
                    onDragOver = { (e)=>this.onDragOver(e)}
                    >
                    <div className="moviePoster">
                        <img src={`http://image.tmdb.org/t/p/w185/${this.props.movie.poster_path}`} id={this.props.movie.id} className="moviePosterSpecs" alt=""/>
                    </div>
                    <div className="movieStars">
                        <StarRatingComponent
                            name = {this.props.movie.firebase_ids}
                            starCount={5}
                            value={this.props.movie.stars}
                            starColor="#962A38"
                            editing={true}
                            onStarClick={this.handleStars.bind(this)} 
                        />
                    </div>
                    <div className="movieOverview">
                        <button className="commentButton" onClick={()=>this.handleModal(this.props.index)}>Comments</button>
                        <div className="tagButton">
                            <RaisedButton
                                label="tags +"
                                buttonStyle={{background:"#962A38"}}
                                onClick={ (e) =>this.setState({showPopOver:true, anchorEl:e.currentTarget})}
                            />  
                            <PopOver
                                movie={this.props.movie}
                                show={this.state.showPopOver}
                                anchorEl={this.state.anchorEl}
                                tagUpdate={this.tagUpdate}
                                onRequestClose={()=>this.setState({showPopOver:false})}
                            />
                        </div>
                        <div className="tagName">
                            <p>tag: {this.props.movie.tag}</p>
                        </div>
                    </div>
                    <ModalComponent 
                        modalId={this.state.modalId}
                        show={this.state.openModal}
                        movie={this.props.movie}
                        closeModal={()=> this.setState({openModal:false})}
                    />
                </div>
        );
    }
}

export default ProfileBox;