import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import Modal from 'react-native-modal';
import {myfont} from '../font';
import InputNumber from './component/InputNumber';

const SelectOperator = props => {
  return (
    <TouchableOpacity style={styles.operator} onPress={props.pressed}>
      <Text style={styles.action}>{props.operator}</Text>
    </TouchableOpacity>
  );
};

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      result: 0,
      input1: '',
      input2: '',
      input3: '',
      action1: false,
      action2: false,
      action3: false,
      isModalVisible: false,
      errorMessege: '',
    };
  }

  error1 = () => {
    return this.setState({
      isModalVisible: true,
      errorMessege: 'Please check at least 2',
    });
  };

  error2 = () => {
    this.setState({
      isModalVisible: true,
      errorMessege: 'Number cannot be empty',
    });
  };

  giveResult = ([...args], method) => {
    let i = 1;
    let Result = args[0];
    if (method == 'plus') {
      while (i < args.length) {
        Result += args[i];
        i++;
      }
      return this.setState({result: Result});
    } else if (method == 'minus') {
      while (i < args.length) {
        Result -= args[i];
        i++;
      }
      return this.setState({result: Result});
    } else if (method == 'times') {
      while (i < args.length) {
        Result *= args[i];
        i++;
      }
      return this.setState({result: Result});
    } else if (method == 'divided') {
      while (i < args.length) {
        Result /= args[i];
        i++;
      }
      return this.setState({result: Result});
    }
  };

  header = () => {
    return (
      <Header
        centerComponent={{
          text: 'Mini Calculator',
          style: styles.header,
        }}
        containerStyle={{
          height: Dimensions.get('window').height / 10,
        }}
      />
    );
  };

  handleOperation = type => {
    const {action1, action2, action3, input1, input2, input3} = this.state;
    let data = [];
    if (
      (action1 == false && action2 == false) ||
      (action1 == false && action3 == false) ||
      (action2 == false && action3 == false)
    ) {
      return this.error1();
    } else {
      if (action1) {
        if (input1.length > 0) data.push(parseFloat(input1));
        else return this.error2();
      }
      if (action2) {
        if (input2.length > 0) data.push(parseFloat(input2));
        else return this.error2();
      }
      if (action3) {
        if (input3.length > 0) data.push(parseFloat(input3));
        else return this.error2();
      }
    }
    return this.giveResult(data, type);
  };

  typeOfOperator = () => {
    return (
      <View style={styles.viewOperator}>
        <SelectOperator
          operator="+"
          pressed={() => this.handleOperation('plus')}
        />
        <SelectOperator
          operator="-"
          pressed={() => this.handleOperation('minus')}
        />
        <SelectOperator
          operator="x"
          pressed={() => this.handleOperation('times')}
        />
        <SelectOperator
          operator="/"
          pressed={() => this.handleOperation('divided')}
        />
      </View>
    );
  };

  /*
  I give the result fix to 2, so the answer will show 0.00 equal to 0, because i want
  to use operator for type input of float.
  */

  result = () => {
    return (
      <View style={styles.resultView}>
        <Text style={styles.text}>Result :</Text>
        <Text style={styles.text}> {this.state.result.toFixed(2)}</Text>
      </View>
    );
  };

  body = () => {
    return (
      <View style={styles.body}>
        <View style={styles.main}>
          <Text style={[styles.resultText, {marginTop: 5}]}>Input</Text>
          <InputNumber
            checked={this.state.action1}
            press={() => this.setState({action1: !this.state.action1})}
            input={text => this.setState({input1: text})}
          />
          <InputNumber
            checked={this.state.action2}
            press={() => this.setState({action2: !this.state.action2})}
            input={text => this.setState({input2: text})}
          />
          <InputNumber
            checked={this.state.action3}
            press={() => this.setState({action3: !this.state.action3})}
            input={text => this.setState({input3: text})}
          />
        </View>
        {this.typeOfOperator()}
        <View style={styles.hr}>
          <Text style={styles.action}>=</Text>
        </View>
        {this.result()}
      </View>
    );
  };

  modal = () => {
    const {isModalVisible, errorMessege} = this.state;
    return (
      <Modal isVisible={isModalVisible} style={{alignItems: 'center'}}>
        <View style={styles.modal}>
          <Text style={styles.text}>{errorMessege}</Text>
          <TouchableOpacity
            style={{alignItems: 'flex-end', marginTop: 40}}
            onPress={() => this.setState({isModalVisible: false})}>
            <Text style={styles.text}>Try Again!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.header()}
        {this.body()}
        {this.modal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontFamily: myfont,
    marginBottom: 20,
  },
  body: {
    flex: 1,
    backgroundColor: 'rgba(195, 191, 214, 0.7)',
  },
  main: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: myfont,
    fontSize: 18,
  },
  resultText: {
    fontFamily: myfont,
    fontSize: 23,
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 10,
  },
  viewOperator: {
    flexDirection: 'row',
    // marginRight: 20,
    marginTop: 15,
    justifyContent: 'center',
  },
  operator: {
    height: 50,
    width: 60,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    fontSize: 25,
    fontFamily: myfont,
  },
  hr: {
    width: Dimensions.get('window').width - 40,
    borderBottomWidth: 1.5,
    marginLeft: 20,
    alignItems: 'flex-end',
  },
  resultView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 35,
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 30,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
  },
});
