import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import { Button } from '../../components/Button';

/*
  * TODO :
  *
  *
*/

class TeacherHomeScreen extends Component {

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <Button 
              title={"Create a new form"} 
              action={() => this.props.navigation.navigate('FormCreationScreen')}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

TeacherHomeScreen.navigationOptions = {
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

export default TeacherHomeScreen;