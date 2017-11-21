import React, { Component } from 'react';
import { getTweets } from '../http/Request';
import Timestamp from 'react-timestamp';
import ProfileImage from '../profile.jpg';
import {Tabs, Icon, Button} from 'reactbulma';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: JSON.parse(localStorage.getItem('current_user')) ? JSON.parse(localStorage.getItem('current_user')).email : ""
    }
  }

  render() {
    let tweet = this.props.tweet;
    return (
      <div className="tweet" >
        <div className="ProfileHeading">
          <ul className="ul-ProfileHeading">
            <li className="li-ProfileHeading">
              <span> Tweets </span>
            </li>
          </ul>
        </div>
        <div className="item-header">
          <a className="account-group">
            <img className="avatar" src={ProfileImage}/>
            <span className="FullName">
              <b>
                {
                  this.state.name.substring(0, this.state.name.lastIndexOf("@"))
                }
              </b>
            </span>
            <span className="time" style={{ }}>
              <Timestamp time={tweet.created_at ? tweet.created_at : new Date()} precision={1} />
            </span>
          </a>
        </div>
        <div className="tweet-message">
          <p style={{textAlign: 'left'}}>
            {tweet.description}
          </p>
        </div>
        <br />
        <Button className="button-footer"
          onClick={() => this.props.handleLike(tweet)}> 

          <Icon small>
            <i className={tweet.likes[0] == null ? "fa fa-heart-o" : "fa fa-heart"}/>
          </Icon>
        </Button>
      </div>
    )
  }
}

export default Tweet;
