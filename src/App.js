import React, { Component } from 'react';
import logo from './1500x500.jpeg';
import './App.css';
import TweetBox from './TweetBox';
import Tweet from './model/Tweet';
import Request from './http/Request';
import TweetList from './view/TweetList';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Col, Row } from 'react-bootstrap';
import ProfileImage from './profile.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [{
        text: "Hello",
        liked: true
      }, {
        text: "World",
        liked: false
      }]
    }
  }

  handleTweet(tweetText) {
    let tweetObj = {
      text: tweetText,
      liked: false
    }
    this.setState({
      tweets: this.state.tweets.concat(tweetObj)
    })
  }

  handleLike(tweet) {
    let tweets = this.state.tweets.map( (t) => {
      if(t.text == tweet.text) {
        return {
          text: t.text,
          liked: !t.liked
        }
      }
      return t;
    });

    this.setState({
      tweets
    }) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
							<div class="profile-image">
								<img src={ProfileImage} class="circular-image" />
							</div>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={6} md={3}>
              <div>
                <h1 class="profile-name">Alecks Johanssen</h1>
                <h2 class="profile-link"> 
                  <span>
                    <a href="facebook.com/PCGMikeon">
                      @AlecksJohanssen
                    </a>
                  </span>
                </h2>
                <h2 class="profile-link"> 
                  <span>
                    <a href="#">
                      Joined July 2017
                    </a>
                  </span>
                </h2>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div>
                { this.state.tweets.map( tweet => 
                  <Tweet tweet={tweet}
                    handleLike={this.handleLike.bind(this)}
                  />
                )}
              </div>
              <div>
                  <TweetBox prompt="What's in your mind?" onTweet={this.handleTweet.bind(this)}/>
              </div>
            </Col>
            <Col xs={6} md={3}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
