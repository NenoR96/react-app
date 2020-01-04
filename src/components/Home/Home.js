import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './Home.css';
import PostsService from '../../services/PostsService';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        };
    }

    componentWillMount() {
        PostsService.getPosts().then(json => this.setState({ posts: json }))
    }

    render() {
        let posts = this.state.posts;
        posts = posts.sort(
            function (a, b) {
                var date1 = new Date(...a.date.split('/').reverse());
                var date2 = new Date(...b.date.split('/').reverse());

                if (date1 < date2) return 1;
                else if (date1 > date2) return -1;

                if (a.time < b.time) return 1;
                else if (a.time > b.time) return -1;
                return 0;
            }
        );
        return (
            <div className="Home">
                {posts.map(post =>
                    <div key={post.id}>
                        <Card >
                            <Card.Body className="card-home">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.body}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="card-home-footer">{post.date} {post.time}
                                <NavLink to={`/post/${post.id}`}>
                                    <Button className="card-home-button" variant="outline-warning">See comments</Button>
                                </NavLink>
                            </Card.Footer>
                        </Card>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;