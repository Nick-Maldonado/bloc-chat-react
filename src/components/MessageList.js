import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: null
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }  

  handleNewMessage(e) {
    this.setState({ newMessage: e.target.value });
    console.log(this.state.newMessage);
  }

  createMessage(e) {
    e.preventDefault();
    if (this.state.newMessage && this.props.user) {
      this.messagesRef.push({
        username: this.props.user.displayName,
        content: this.state.newMessage,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom
      })}      
    this.setState({ newMessage: null });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key=snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
   }


  render() {
    const messages = ( 
      this.state.messages.filter(message => message.roomId === this.props.activeRoom).map( (message, index) =>
        <div className="message" key={message.key}>
          <div className="message-username">{message.username}:</div>
          <div className="message-sentAt"> Sent at {message.sentAt}</div>
          <div className="message-content">{message.content}</div>
        </div>
      )
    );

    return(
      <section className="chat-messages">
        {messages}
        {
          this.props.activeRoom && this.props.user ?
          <form id="input-box" onSubmit={ (e) => this.createMessage(e) }>
            <input className="input-text" type="text" value={this.state.newMessage ? this.state.newMessage : ''} placeholder="Type your message here..." onChange={ (e) =>  this.handleNewMessage(e) } />
            <input type="submit" value="Send" />
          </form>
          :
          ''
        }
      </section>
    );
  }
}

  

export default MessageList;