import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      user: null
    };

    this.roomsRef = firebase.database().ref('rooms');
  }
  
  setActiveRoom(roomKey) {
    this.setState({ activeRoom: roomKey });
  }

  setUser(user) {
    this.setState( { user: user });
  }
  
  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase} setActiveRoom={ (roomKey) => this.setActiveRoom(roomKey) } />
          <User firebase={firebase} user={this.state.user} setUser={ (user) => this.setUser(user) } />
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </main>
      </div>
    );
  }
}

export default App;
