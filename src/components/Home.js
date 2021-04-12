import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";

class Home extends Component{

  state={
    titleValue:'',
    messageValue:'',
  }

  onClickHandler=(e)=>{
    e.preventDefault();
    const {titleValue,messageValue}=this.state;
    if(titleValue !== '' && messageValue !== ''){
      this.props.addPost(titleValue,messageValue);
      this.setState({titleValue:'', messageValue:''})
    }else{
      alert('Enter both field - Title and Message')
    }
  }

  handleTitle=(e)=>{
    this.setState({titleValue:e.target.value})
  }

  handleMessage=(e)=>{
    this.setState({messageValue:e.target.value})
  }

  render(){
        const {posts} = this.props;
        const postList = posts.length ? (
            posts.map(post =>{
                return(
                    <div className='post card' key={post.id}>
                        <div className='card-content'>
                            <Link to={`/${post.id}`} >
                            <span className='card-title'>{post.title}</span>
                            </Link>
                            <p>{post.message}</p>
                        </div>
                    </div>
                )
            })
        ) : (
            <div className='center'>No posts Yet!</div>
        )
    return ( 
       <div className='container'>
           <h4 className='center'>Home</h4>
           
  <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">title</i>
          <textarea id="title" placeholder='Enter Title' className="materialize-textarea" value={this.state.titleValue} onChange={this.handleTitle}></textarea>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">mode_comment</i>
          <textarea id="message" placeholder='Enter Message' className="materialize-textarea" value={this.state.messageValue} onChange={this.handleMessage}></textarea>
        </div>      
      </div>
      <div className="center">
        <button className='btn waves-effect waves-light' type="submit" onClick={this.onClickHandler}>Submit
            <i className="material-icons right">send</i>
        </button>
        </div>
    </form>
  </div>
           {postList}
       </div>

     );
    }
}

const mapStateToProps = (state)=>{
    return {
        posts: state.posts
    }
}

const mapDispatchToProps =(dispatch)=>{
  return{
      // deletePost: (id) => {dispatch(deletePost(id))}
      addPost: (title,message) => {dispatch(addPost(title,message))}
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Home);