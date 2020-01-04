import React, {Component} from 'react';
import {Form, Button, Col, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

class Login extends Component {
  constructor(){
    super();
    this.state = {
     email: '',
     password: '',
     loggedIn: false,
     users: []
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const url = `http://localhost:3000/users`
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ users: json}))
  }

  login() {
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }
    this.state.users.forEach(item => {
      if (item.email === credentials.email && item.password === credentials.password) {
        const token = { id: item.id, username: item.username, admin: item.admin }
        sessionStorage.setItem('token', JSON.stringify(token));
        this.setState({ loggedIn: true}); 
      }
    })
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    if (this.state.loggedIn) window.location.href = "/"
     return (
      <Container className="Login">
        <h2>Login</h2>
        <Form className="form">
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button onClick={this.login}>Submit</Button>
            <NavLink to="/register"><Button>Register</Button></NavLink>
          </Col>
        </Form>
      </Container>
    );
  }
}

export default Login;