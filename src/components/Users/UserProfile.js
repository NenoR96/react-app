import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PostsService from '../../services/PostsService';
import UsersService from '../../services/UsersService';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            modal: false,
            editedUser: {}
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentWillMount() {
        UsersService.getUserByID(this.props.match.params.id).then(myJson =>
                this.setState({ user: myJson, editedUser: myJson }),
                PostsService.getPostsByUser(this.props.match.params.id).then(myJson => this.setState({ posts: myJson }))
        )
    }

    updateUser() {
        let user = this.state.editedUser;
        console.log(user);
        UsersService.updateUser(user);
        this.setState({ user: user, modal: false})
    }

    handleEdit(event) {
        event.persist();
        this.setState(prevState => ({
            editedUser: {
                ...prevState.editedUser,
                [event.target.name]: event.target.value            
            }
        }))
    }

    handleModal() {
        this.setState({ modal: !this.state.modal });
    }

    deleteUser() {
        UsersService.deleteUser(this.state.user.id);
    }

    render() {
        let user = this.state.user, editedUser = this.state.editedUser, posts = this.state.posts;
        let crud = '';
        var token = JSON.parse(sessionStorage.getItem("token"));
        if(token) {
            if(token.admin || token.username === user.username) {       
            crud = <Card.Body>
            <div><Button variant="primary" onClick={this.handleModal}>Edit</Button>
            <Button variant="primary" onClick={this.deleteUser}>Delete</Button></div>
            </Card.Body>
            }
        }
        return (
            <div className="row">
                <Modal show={this.state.modal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                    <Col>
                        <Form.Control as="input" autoFocus type="title" name="username" defaultValue={editedUser.username} onChange={this.handleEdit} />
                    </Col>
                    <Col>
                        <Form.Control as="input" autoFocus type="body" name="email" defaultValue={editedUser.email} onChange={this.handleEdit} />
                    </Col>
                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.updateUser}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>                
                <div className="col-sm-6 col-md-4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={user.image} />
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                        </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Age: {user.age}</ListGroupItem>
                            <ListGroupItem>Gender: {user.gender}</ListGroupItem>
                            <ListGroupItem>E-mail: {user.email}</ListGroupItem>
                        </ListGroup>
                        {crud}
                    </Card>
                </div>

                <div className="col-sm-6 col-md-8">
                    {posts.map(post =>
                        <div key={post.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.body}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                <NavLink to={`/post/${post.id}`}>
                                See comments
                                </NavLink>
                                <p>{post.date} {post.time}</p>
                                </Card.Footer>                                
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default UserProfile;