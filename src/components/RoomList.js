import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoom: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoom
    });
    this.setState({newRoom: ''});
  }

  handleNewRoomName(e) {
    this.setState({ newRoom: e.target.value });
  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    const roomsList = ( 
      this.state.rooms.map( (room, index) =>
        <li id={'room' + index} key={'room' + index}>{room.name}</li>
      )
    );

    return (
      <section className='chat-rooms'>
        <h1>Bloc Chat</h1>
        <form className='new-room' onSubmit={ (e) => this.createRoom(e)}>
          <input type="text" placeholder="Enter a new room name" value={ this.state.newRoom } onChange={ (e) => this.handleNewRoomName(e) } />
          <input type="submit" />
        </form>
        <ul className='rooms-list'>
          {roomsList}
        </ul>
      </section>
    );
  }
}

export default RoomList;
