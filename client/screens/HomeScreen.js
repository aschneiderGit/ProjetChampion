import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from "react-redux";
import socketIO from 'socket.io-client';

import { setSocket } from '../actions/index';
import { Button } from '../components/Button';

/*
  * TODO :
  *
  * - Automatiser la redirection en fonction du token utilisateur (prof ou élève)
  * - Démarrer une possibilité de visualisation pour un élève des formulaires crées par un prof
  * - Avoir la possibilité de répondre à un formulaire pour un élève
*/

function mapDispatchToProps(dispatch) {
  return {
    setSocket: socket => dispatch(setSocket(socket))
  };
}

class connectedHomeScreen extends Component {

  componentWillMount = () => {
    this.props.setSocket(socketIO('http://localhost:3000'));
  };

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <Button 
              title={"Go as a teacher"} 
              action={() => this.props.navigation.navigate('TeacherHomeScreen')}
            />

            <Button 
              title={"Go as a student"} 
              action={() => this.props.navigation.navigate('StudentHomeScreen')}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

connectedHomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});

const HomeScreen = connect(null, mapDispatchToProps)(connectedHomeScreen);

export default HomeScreen;