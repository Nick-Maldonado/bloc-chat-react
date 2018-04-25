import React, { Component } from 'react';



class User extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() { return(
    <section className="log-in-out">
      <div>Welcome, {this.props.user ? this.props.user.displayName : 'guest'}!</div>
      {
        this.props.user ?
        <button className="log-out" onClick={() => this.signOut()}>Sign out</button>
        :
        <button className="log-in" onClick={() => this.signIn()}>Sign in</button>
      }
    </section>
  )};
}

export default User;