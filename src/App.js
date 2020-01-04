import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Error from './components/Error';
import Navbar from './components/Navigation/Navbar';
import Post from './components/Posts/Post';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import PostWrite from './components/Posts/PostWrite';
import UserProfile from './components/Users/UserProfile';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount() {
    const token = sessionStorage.getItem("token");
    if(token != null) {
      this.setState({ loggedIn: true })
    }
  }

  render() {
    let loggedState = this.state.loggedIn;
    console.log(loggedState)
    return (
      <BrowserRouter>
        <div>
          <Navbar loggedIn={loggedState}/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path='/post/:id' component={Post} />
            <Route path='/posts/write' component={PostWrite}  exact/>
            <Route path='/user/profile/:id' component={UserProfile}  exact/>
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
