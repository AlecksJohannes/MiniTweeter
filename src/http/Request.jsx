import React, { Component } from 'react';
import axios from 'axios';
import Querystring from 'query-string';
const BASE_URL = "http://127.0.0.1:8888";

export { logInUser, getTweets, createTweet, createLike };

function logInUser(email) {
  const url = `${BASE_URL}/users`;
  var buildEmail = "email=" + email;
  return axios.post(url, buildEmail, { headers: {
      'Content-type': 'application/x-www-form-urlencoded',
  }})
}

function getTweets() {
  const url = `${BASE_URL}/tweets`;
  return axios.get(url, {
    params: {
      id: JSON.parse(localStorage.getItem('current_user')).id
    }
  });
}

function createTweet(tweet) {
  const url = `${BASE_URL}/tweets`;
  var data = Querystring.stringify({ 
              "user_id": JSON.parse(localStorage.getItem('current_user')).id,
              "description": tweet
             });
  return axios.post(url, data, { headers: {
      'Content-type': 'application/x-www-form-urlencoded',
  }})
}

function createLike(id) {
  const url = `${BASE_URL}/tweets/` + id + `/likes`;
  var data = Querystring.stringify({ 
              "user_id": JSON.parse(localStorage.getItem('current_user')).id,
              "is_liked": true
             });
   return axios.post(url, data, { headers: {
      'Content-type': 'application/x-www-form-urlencoded',
  }})
}
