import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

var config = {
  apiKey: "AIzaSyBaI2ws1B52fUbQDCLvEyAjtPW8RObNn7k",
  authDomain: "bloc-chat-react-c0db3.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c0db3.firebaseio.com",
  projectId: "bloc-chat-react-c0db3",
  storageBucket: "bloc-chat-react-c0db3.appspot.com",
  messagingSenderId: "811868769665"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList 
        firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
