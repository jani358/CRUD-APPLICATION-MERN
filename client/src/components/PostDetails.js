import React, { Component } from 'react';
import axios from 'axios';

export default class PostDetails extends Component {
  constructor(props){
    super(props);

    this.state={
      post:{}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    axios.get(`/post/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          post:res.data.post
        });
        console.log(this.state.post)
      }
    });
  }


  render() {

    const {topic,description,postCategory} = this.state.post;
    return (
      <div style={{margin:'20px'}}>
        <h4>{topic}</h4>
        <hr/>

        <d1 className="row">
          <dt className="col-sm-3">Description</dt>
          <dd className="col-sm-9">{description}</dd>
          <dt className="col-sm-3">Post Category</dt>
          <dd className="col-sm-9">
          {postCategory}
          </dd>
        </d1>
      </div>
    )
  }
}
