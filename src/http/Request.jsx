import React, { Component } from 'react';
import axios from 'axios';
const BASE_URL = "http://127.0.0.1:8888";

export { logInUser };

function logInUser(email) {
  const url = `${BASE_URL}/users`;
  var buildEmail = "email=" + email;
  return axios.post(url, buildEmail, { headers: {
      'Content-type': 'application/x-www-form-urlencoded',
  }})
}
