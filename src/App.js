import React, { Component } from 'react';
import logo from './1500x500.jpeg';
import './App.css';
import TweetBox from './TweetBox';
import Tweet from './model/Tweet';
import Request from './http/Request';
import TweetList from './view/TweetList';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Col, Row, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ProfileImage from './profile.jpg';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import miniLogo from './twitter.jpg';

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
      }],
      isModalOpen: true
    }
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    if(this.state.text) {
       this.setState({
        isModalOpen: false
      }) 
    } else {
      alert('Please input your email');
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

  handleIfNull(text) {
    this.setState({
      text: text
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
              <div className="profile-image">
                <img src={ProfileImage} className="circular-image" />
              </div>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              <span style={{display: 'block', fontWeight: 'bold'}}>
                Following
              </span>
              <span style={{display: 'block', fontWeight: 'bold'}}>
                524
              </span>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <span style={{display: 'block', fontWeight: 'bold'}}>
                Follower
              </span>
              <span style={{display: 'block', fontWeight: 'bold'}}>
                15k
              </span>
            </NavItem>
          </Nav>
        </Navbar>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={6} md={3}>
              <div>
                <h1 className="profile-name">Alecks Johanssen</h1>
                <h2 className="profile-link"> 
                  <span>
                    <a href="https://facebook.com/PCGMikeon">
                      @AlecksJohanssen
                    </a>
                  </span>
                </h2>
                <h2 className="profile-link"> 
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
        <Modal
          isOpen={this.state.isModalOpen}
          closeTimeoutMS={0}
          contentLabel="Example Modal"
          portalClassName="ReactModalPortal"
          overlayClassName="ReactModal__Overlay"
          className="ReactModal__Content"
          bodyOpenClassName="ReactModal__Body--open"
          ariaHideApp={true}
          shouldCloseOnOverlayClick={true}
          role="dialog"
          parentSelector={() => document.body} >
          <img src={miniLogo} style={{marginBottom: '15px'}}/>
          <h2 style={{textAlign: 'center'}}>Please input your email below</h2>
          <div className="outerMailForm">
            <form className="emailForm">
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel><b>Email:</b></ControlLabel>
                <FormControl componentClass="input" placeholder="Your email here" onChange={(e) => this.handleIfNull(e.target.value)} />
              </FormGroup>

              <Button className="is-primary button" onClick={() => this.closeModal()}>Submit
              </Button>
            </form>
          </div>
				</Modal>
      </div>
    );
  }
}

export default App;
