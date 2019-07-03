import React, { Component } from 'react';
import { connect } from "react-redux";

import { GiftedChat } from 'react-native-gifted-chat'

/*
    *   TODO :
    *
    *   - navigation par topics
    *   - sauvegarde des msgs sur la BD et récupération des msgs
    * 
*/

const mapStateToProps = state => {
    return { socket: state.socket }
};

class connectedChatScreen extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        this.props.socket.connect();
        this.props.socket.on('connect', () => { 
        console.log('connected to socket server'); 
        });
        this.props.socket.on('message', (msg) => this._storeMessages(msg));
    }

    onSend(messages = []) {
        this._storeMessages(messages);
        this.props.socket.emit('message', messages);
    }

    render() {
        return (
        <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
        />
        );
    }

    //helper functions
    _storeMessages(messages) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }
}

connectedChatScreen.navigationOptions = {
  title: 'Chat',
};

const ChatScreen = connect(mapStateToProps)(connectedChatScreen);

export default ChatScreen;