import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
  constructor(props){
    super(props);
    // State to hold the form input values
    this.state={
      topic:"",
      description:"",
      postCategory:""
    }
  }

  // Function to handle input changes in the form
  handleInputChange = (e) =>{
    const {name, value} = e.target;
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  // Function to handle form submission
  onSubmit = (e) =>{
    e.preventDefault();
    const {topic, description, postCategory} = this.state;
    const data ={
      topic: topic,
      description: description,
      postCategory: postCategory
    }
    console.log(data);

    // Sending a POST request to save the post data
    axios.post("/post/save", data).then((res) =>{
      if(res.data.success){
        // If post is successfully saved, clear the form inputs
        this.setState(
          {
            topic:"",
            description:"",
            postCategory:""
          }
        )
      }
    })
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create new post</h1>
        <form className="needs-validation" noValidate>
          {/* Input for Topic */}
          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Topic</label>
            <input 
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter Topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
          </div>

          {/* Input for Description */}
          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Description</label>
            <input 
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>

          {/* Input for Post Category */}
          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Post Category</label>
            <input 
              type="text"
              className="form-control"
              name="postCategory"
              placeholder="Enter Post Category"
              value={this.state.postCategory}
              onChange={this.handleInputChange}
            />
          </div>
             
          {/* Button to Submit the Form */}
          <button 
            className="btn btn-success" 
            type="submit" 
            style={{marginTop:'15px'}} 
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button>

        </form>
      </div>
    );
  }
}
