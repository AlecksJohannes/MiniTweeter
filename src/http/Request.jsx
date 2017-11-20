import React, { Component } from 'react';

export default class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  getTweets() {
    return fetch("https://api.myjson.com/bins/yfhff")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return("")
  }
}

