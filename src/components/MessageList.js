import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }  

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoom === this.props.activeRoom) { return };
    this.setState({ messages: [] });
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      if (message.roomId.toString() === nextProps.activeRoom.toString()) {
        console.log(message.roomId.toString())
        this.setState({ messages: this.state.messages.concat( message ) });
      }
    });
  }


  render() {
    const messages = ( 
      this.state.messages.map( (message, index) =>
        <div className="message" key={`message ${index}`}>
          <div className="message-username">{message.username}</div>
          <div className="message-sentAt">{message.sentAt}</div>
          <div className="message-content">{message.content}</div>
        </div>
      )
    );

    return(
      <section className="chat-messages">
        {messages}
      </section>
    );
  }
}

  

export default MessageList;