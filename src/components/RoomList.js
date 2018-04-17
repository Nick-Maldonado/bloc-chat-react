import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    const rooms = this.state.rooms;
    const roomsList = ( 
      this.state.rooms.map( (room) =>
         <li className={room.name}>{room.name}</li>
      )
    );
    return (
      <section className='chat-rooms'>
        <h1>Bloc Chat</h1>
        <ul className='rooms-list'>
          {roomsList}
        </ul>
      </section>
    );
  }
}

export default RoomList;
