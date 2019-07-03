import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';

import { Button } from '../../components/Button';
import { createAccount } from '../../actions/index';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  teacherAccount: t.Boolean
});

const options = {
  fields: {
    username: {
      error: 'A valid username is needed'
    },
    password: {
      error: 'A valid password is needed',
      secureTextEntry: true,
      password: true
    },
  },
  stylesheet: formStyles,
};

mapDispatchToProps = dispatch => {
  return {
    createAccount: formData => dispatch(createAccount(formData))
  };
}

mapStateToProps = state => {
  return { 
    createdAccountUsername: state.createdAccountUsername,
    createdAccountError: state.createdAccountError
  }
};

class connectedSignUpScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Form
            ref={c => this._form = c}
            type={User}
            options={options}
          />
        </ScrollView>
        <View>
          <Button title={"Sign up"} action={this._signUpAsync} />
        </View>
      </View>
    );
  }

  _signUpAsync = async () => {
    if (this._form.validate().isValid() == true){
      const value = this._form.getValue();
      this.props.createAccount(value);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Alert for success
    if (prevProps.createdAccountUsername !== this.props.createdAccountUsername) {
      Alert.alert(
        null,
        'Your account was created successfully ' + this.props.createdAccountUsername + '!',
        [
          {text: 'Go to login', onPress: () => this.props.navigation.navigate('SignIn')}
        ]
      )
    }
    // Alert for error
    if (prevProps.createdAccountError !== this.props.createdAccountError) {
      Alert.alert(
        null,
        'There was an error, please contact the administrator'
      )
    }
  }
}

connectedSignUpScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1
  }
});

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
  }
};

const SignUpScreen = connect(mapStateToProps, mapDispatchToProps)(connectedSignUpScreen);

export default SignUpScreen;