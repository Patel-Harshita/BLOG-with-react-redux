import React, { Component } from 'react';
import { connect } from "react-redux";
import { deletePost,updatePost } from "../actions/postActions";

class Post extends Component {
    state={
        isPostEditable:false,
        updatedTitle:'',
        updatedMessage:'',
        isUpdateEnable:false
    }

    handleDelete =()=>{
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/')
    }

    handleEditButton=()=>{
        this.setState({isPostEditable:true})
    }

    handleUpdate=()=>{
        let id = this.props.post.id
        const {updatedTitle,updatedMessage} = this.state
        let title = updatedTitle === '' ? this.props.post.title : updatedTitle
        let message = updatedMessage === '' ? this.props.post.message : updatedMessage
        this.props.updatePost(id,title,message);
        this.setState({isPostEditable:false,isUpdateEnable:false}); 
    }

    handleCancel=()=>{
        this.setState({isPostEditable:false}); 
    }

    onTitleChange=(e)=>{
        this.setState({updatedTitle:e.target.value,isUpdateEnable:true})
    }
    onMessageChange=(e)=>{
        this.setState({updatedMessage:e.target.value,isUpdateEnable:true})
    }
 
    render() {
        const {post} = this.props 
        let message = post && post.message.replace( /[\r\n]+/gm, " " );
        let CanPostUpdate = this.state.isUpdateEnable ?'btn blue accent-2' :'btn blue accent-2 disabled'
        const postData = post ? (
            <div className='post'>
                {this.state.isPostEditable ? (
                    <div className='center'>
                        <input className='center' defaultValue={post.title} style={{margin:'20px', fontSize:'20px', fontWeight:'500', border:'1px solid'}} onChange={this.onTitleChange}/>
                        <textarea defaultValue={message} style={{width:'776px', height:'154px', fontSize:'15px', lineHeight:'1.5', padding:'10px'}} onChange={this.onMessageChange} />
                        <div className='center'>
                        <button className={CanPostUpdate} style={{margin:'20px'}} onClick={this.handleUpdate}>Update
                        <i className="material-icons left">autorenew</i>
                        </button>
                        <button className='btn red lighten-1' onClick={this.handleCancel}>Cancel
                        <i className="material-icons left">cancel</i>
                        </button>
                        </div>
                  </div>
                ) :(
                    <div>
                    <h4 className='center'>{post.title}</h4>
                    <p>{post.message}</p>
                    <div className='center'>
                <button className="btn waves-effect waves-light" style={{margin:'20px'}} onClick={this.handleEditButton}>Edit Post
                    <i className="material-icons right">edit</i>
                </button>
                    <button className='btn red lighten-2' onClick={this.handleDelete}>Delete Post
                    <i className="material-icons right">delete_forever</i>
                    </button>
                </div>
                    </div>
                )}                              
            </div>
        ) : (
            <div className='center'>Loading post...</div>
        );
        return ( 
            <div className='container'>
            {postData}
            </div>
         );
    }
}

const mapStateToProps = (state,ownProps)=>{
    let id = ownProps.match.params.post_id;
    return {
        post: state.posts.find(post => post.id === id)
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        deletePost: (id) => {dispatch(deletePost(id))},
        updatePost:(id,title,message)=>{dispatch(updatePost(id,title,message))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Post);