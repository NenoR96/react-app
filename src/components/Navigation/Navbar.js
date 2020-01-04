import React, { Component } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            loggedIn: false
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        console.log(token)
        if (token) {
            this.setState({ user: token, loggedIn: true });
            this.forceUpdate();
        } else {
            this.setState({ user: token, loggedIn: false });
        }
    }

    logout() {
        sessionStorage.setItem("token", '');
        sessionStorage.clear();
    }

    render() {
        var token = JSON.parse(sessionStorage.getItem("token"));
        console.log("navbar")
        return (
            <div >
                <Nav className="justify-content-center" defaultActiveKey="/" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link href="/">Homepage</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/posts/write">Write post</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {this.state.loggedIn ? <NavDropdown title={token.username} id="basic-nav-dropdown">
                            <Nav.Link href={`/user/profile/${token.id}`}>Profile</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link href="/logout" onClick={this.logout}>Logout</Nav.Link>
                        </NavDropdown> : <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default Navbar;