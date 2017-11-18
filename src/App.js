import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TweetBox from './TweetBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: ['Hello World!', 'Coderschool is the best']
    }
  }

  handleTweet(tweet) {
    this.setState({
      tweets: this.state.tweets.concat(tweet)
    })
  }
  render() {
		return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div>
            <TweetBox prompt="What's in your mind?" onTweet={this.handleTweet.bind(this)}/>
          </div>
          <div>
            { this.state.tweets.map( tweet => 
             <p> {tweet} </p>
            )}
          </div>
        </p>
      </div>
    );
  }
}

export default App;
