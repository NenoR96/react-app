import React, { Component } from "react";
import { Button, Form, Col, Container, Dropdown, DropdownButton } from "react-bootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      gender: "",
      age: 0,
      date: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.setState({ date: date + '/' + month + '/' + year })
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      age: this.state.age,
      about: '',
      registered: this.state.date,
      admin: false,
      image: ""
    }
    if (user.gender === "male") { user.image = "/images/male.png" }
    else if (user.gender === "female") { user.image = "/images/female.png" }
    try {
      const url = `http://localhost:3000/users`
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          gender: user.gender,
          age: user.age,
          about: user.about,
          registered: user.registered,
          admin: user.admin,
          image: user.image,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(json => console.log(json))
    } catch (e) {
      alert(e.message);
    }
  }

  handleSelect(e) {
    this.setState({ gender: e });
    }

  render() {
    return (

      <Container className="Register">
        <h2>Register</h2>
        <Form className="form">
        <Col>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                name="username"
                id="username"
                placeholder="@johnsmith"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
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

          <Form.Row>
    <Col>
    <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="age"
                name="age"
                id="exampleAge"
                placeholder="24"
                onChange={this.handleChange}
              />
            </Form.Group>    </Col>
    <Col>
    <DropdownButton title='Gender' onSelect={this.handleSelect}>
            <Dropdown.Item eventKey='male'>Male</Dropdown.Item>
            <Dropdown.Item eventKey='female'>Female</Dropdown.Item>
          </DropdownButton>    </Col>
  </Form.Row>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Col>
        </Form>
      </Container>
    );
  }
}

export default Register;