import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {myfont} from '../../font';

const InputNumber = props => {
  return (
    <View style={styles.viewInput}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="input number here"
        onChangeText={props.input}
      />
      <CheckBox
        uncheckedColor="black"
        containerStyle={styles.checkbox}
        checked={props.checked}
        size={35}
        onPress={props.press}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 80,
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 10,
    fontFamily: myfont,
    fontSize: 18,
  },
  checkbox: {
    marginRight: -25,
  },
});

export default InputNumber;
