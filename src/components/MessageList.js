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
    console.log(this.props.activeRoom)
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      // console.log(message.roomId);
      if (message.roomId.toString() === this.props.activeRoom.toString()) {
        console.log(message)
      }
      // message.key = snapshot.key
      // this.setState({ messages: this.state.messages.concat( message ) });
    });
  }


  render() {
    // const messages = ( 
    //   this.state.messages.map( (message, index) =>
    //     <div className="message">
    //       <div className="message-username">{message.username}</div>
    //       <div className="message-sentAt">{message.sentAt}</div>
    //       <div className="message-content">{message.content}</div>
    //     </div>
    //   )
    // );

    return(
      <section className="chat-messages">
        {this.state.messages}
        {this.props.activeRoom}
        {/* {messages} */}
      </section>
    );
  }
}

  

export default MessageList;