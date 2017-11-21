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
import { logInUser, getTweets, createTweet, createLike } from './http/Request';
import Timestamp from 'react-timestamp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isModalOpen: true,
      isSuccess: false,
      name: "",
      time: ""
    }
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    logInUser(this.state.text)
    .then((response) => {
      this.setState({
        isSuccess: response['data'].status
      })
      if(this.state.isSuccess) {
        this.state.user = response['data'].user
        localStorage.setItem('current_user', JSON.stringify(response['data'].user))
        this.setState({
          name: response['data'].user.email,
          time: response['data'].user.created_at
        })
        this.handleTweets()
        this.setState({
          isModalOpen: false
        }) 
      }
    }).catch((error) => {
      alert(error);
    })
  }

  handleTweets() {
    getTweets().then((response) => {
      this.setState({
        tweets: response.data
      })
    })
  }

  handleTweet(tweetText) {
    let tweetObj = {
      description: tweetText,
      liked: false
    }
    createTweet(tweetText);
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
    console.log(tweet.id)
    createLike(tweet.id).then((response) => {
      if(response.status) {
        
      }
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
                <h1 className="profile-name">{
                  this.state.name.substring(0, this.state.name.lastIndexOf("@"))
                }</h1>
                <h2 className="profile-link"> 
                  <span>
                    <a href="https://facebook.com/PCGMikeon">
                      { 
                        this.state.name
                      }
                    </a>
                  </span>
                </h2>
                <h2 className="profile-link"> 
                  <span>
                    <a href="#">
                      Joined 
                      <Timestamp time={this.state.time} precision={3} />
                    </a>
                  </span>
                </h2>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div>
                { 
                  this.state.tweets.map((data) => 
                    <Tweet tweet={data}
                      handleLike={this.handleLike.bind(this)}
                    />
                  )
                }
              </div>
              <div style={{ paddingTop: '20px'}}>
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

              <Button className="is-primary button" onClick={() => { 
                this.closeModal()}}>Submit
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
