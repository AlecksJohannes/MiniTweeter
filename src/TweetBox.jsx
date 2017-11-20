import React, { Component } from 'react';
import { Textarea } from 'reactbulma';

class TweetBox extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      text: "",
      charsRemaining: 140
    };
  }

  handleChange(text) {
    this.setState({
      text: text, 
      charsRemaining: 140 - text.length
    });
  }

  render() {
    return (
      <div>
        <div className="tweetBox">
          <Textarea type="text" className="tweetBox"
            placeholder={this.props.prompt}
            onChange={(e) => this.handleChange(e.target.value)}
          />
          <div className="tweetBoxToolbar">
            <button className="tweetButton"
              onClick={() => this.props.onTweet(this.state.text)}
              disabled={this.state.charsRemaining < 0}> 
              <b>Tweet</b>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TweetBox;
