import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  View,
} from 'react-native';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import socketIO from 'socket.io-client';

import { setSocket } from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    setSocket: socket => dispatch(setSocket(socket))
  };
}

// METTRE EN PLACE UN BOUTON POUR SE DECONNECTER (SET LE TOKEN SUR NULL + NAVIGATE ICI)
// TRY AND CATCH SUR TOUT LES ACCES STORAGE POUR PRENDRE EN COMPTE LES ERR

class connectedAuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    if (userToken) {
      const isTeacher = await AsyncStorage.getItem('isTeacher');

      this.props.setSocket(socketIO('http://localhost:3000'));

      isTeacher ? this.props.navigation.navigate('TeacherHomeScreen') : this.props.navigation.navigate('StudentHomeScreen');
    }
    else
      this.props.navigation.navigate('AuthScreen');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthLoadingScreen = connect(null, mapDispatchToProps)(connectedAuthLoadingScreen);

export default AuthLoadingScreen;