import React, { Component } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import PostsService from '../../services/PostsService';
import CommentsService from '../../services/CommentsService';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            comment: "",
            date: '',
            time: '',
            modal: false,
            editedPost: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.onComment = this.onComment.bind(this);
        this.getDateTime = this.getDateTime.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentWillMount() {
        PostsService.getPostByID(this.props.match.params.id).then(myJson =>
            this.setState({ post: myJson, editedPost: myJson }),
            CommentsService.getCommentsByPost(this.props.match.params.id).then(myJson => this.setState({ commments: myJson }))
        );
        CommentsService.getCommentsByPost(this.props.match.params.id).then(myJson =>
            this.setState({ comments: myJson })
        );
    }

    deletePost() {
        PostsService.deletePost(this.state.post.id);
    }

    updatePost() {
        let post = this.state.editedPost;
        PostsService.updatePost(post);
        this.setState({ post: post, modal: false})
    }

    handleEdit(event) {
        event.persist();
        this.setState(prevState => ({
            editedPost: {
                ...prevState.editedPost,
                [event.target.name]: event.target.value            
            }
        }))
    }

    handleModal() {
        this.setState({ modal: !this.state.modal });
    }

    handleChange(event) {
        this.getDateTime();
        this.setState({ comment: event.target.value });
    }

    removeComment(index) {
        let comment = this.state.comments[index];
        CommentsService.deleteComment(comment.id).then(this.setState({
            comments: this.state.comments.filter((_, i) => i !== index)
        }))
      }

    onComment() {
        var token = JSON.parse(sessionStorage.getItem("token"));
        let comment = { userId: token.id, username: token.username, postId: this.state.post.id, body: this.state.comment, date: this.state.date , time: this.state.time };
        CommentsService.addComment(comment).then(json => this.setState({
        comments: [...this.state.comments, json], comment: "" }))
    }

    getDateTime() {
        var d = new Date(), date = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
        var hour = (d.getHours() < 10 ? '0' : '') + d.getHours();
        var minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        this.setState({ date: date + '/' + month + '/' + year, time: hour + ':' + minutes })
    }

    render() {
        let post = this.state.post, editedPost = this.state.editedPost, comments = this.state.comments, crud = '';
        var token = JSON.parse(sessionStorage.getItem("token"));
        if(token) {
            if(token.admin || token.username === post.username) {
                crud = <div><Button variant="primary" onClick={this.handleModal}>Edit</Button>
                <Button variant="primary" onClick={this.deletePost}>Delete</Button></div>
            }
        }
        
        comments = comments.sort(
            function(a, b) {
              var date1 =   new Date(...a.date.split('/').reverse());
              var date2 =   new Date(...b.date.split('/').reverse());

              if (date1 < date2) return 1;
              else if (date1 > date2) return -1;
          
              if (a.time < b.time) return 1;
              else if (a.time > b.time) return -1;
              return 0;
            }
          );
            return (
            <div className="row">
                <Modal show={this.state.modal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    <Form.Control as="input" autoFocus type="title" name="title" defaultValue={editedPost.title} onChange={this.handleEdit} />
                    
                    <Form.Control as="textarea" autoFocus type="body" name="body" defaultValue={editedPost.body} onChange={this.handleEdit} />

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.updatePost}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="col-sm-6 col-md-4">
                <Card>
                    <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    </Card.Body>
                    <Card.Footer>Posted by {post.username} on {post.date} {post.time} {crud}</Card.Footer>
                </Card>
                <Form.Group controlId="comment">
                <Form.Label>Write comment</Form.Label>
                <Form.Control as="input" autoFocus type="comment" value={this.state.comment} onChange={this.handleChange} />
                </Form.Group>
                <Button type="submit" onClick={this.onComment}>Comment</Button>
                </div>
                <div className="col-sm-6 col-md-4">
                    {comments.map((comment, i) =>
                    <div key={i}>
                        <Card>
                            <Card.Body>
                                <Card.Text>{comment.body}    {i}</Card.Text>
                            </Card.Body>
                            <Card.Footer>{comment.username} {comment.date} {comment.time}
                                <Button size="sm" type="submit" onClick={this.removeComment.bind(this,i)}>x</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                )}
                </div>
            </div>
        );
    }
}

export default Post;