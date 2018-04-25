import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
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
      </section>
    );
  }
}

  

export default MessageList;