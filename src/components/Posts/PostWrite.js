import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import PostsService from '../../services/PostsService';

class PostWrite extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      date: '',
      time: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.posting = this.posting.bind(this);
    this.getDateTime = this.getDateTime.bind(this);
  }
  
  componentWillMount() {
    this.getDateTime();
  }

  posting() {
    var token = JSON.parse(sessionStorage.getItem("token"));
    if (token == null) { return this.props.history.push('/login'); }
    const post = { userId: token.id, username: token.username, title: this.state.title, body: this.state.body, date: this.state.date, time: this.state.time };
    PostsService.addPost(post);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

getDateTime() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hour = new Date().getHours();

  var minutes = new Date().getMinutes();
  var d = new Date();
  hour = (d.getHours() < 10 ? '0' : '') + d.getHours();
  minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  this.setState({ date: date + '/' + month + '/' + year, time: hour + ':' + minutes })
}

  render() {
    return (
      <div>
        <Form.Group controlId="title">
          <Form.Label>Write title</Form.Label>
          <Form.Control as="input" name="title" type="title" defaultValue={this.state.title} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Write body</Form.Label>
          <Form.Control as="textarea" name="body" type="body" defaultValue={this.state.body} onChange={this.handleChange} />
        </Form.Group>
        <Button type="submit" onClick={this.posting}>Post</Button>
      </div>
    );
  }
}

export default PostWrite;