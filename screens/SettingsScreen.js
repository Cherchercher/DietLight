import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PureChart from 'react-native-pure-chart';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Analytics`,
  });
  render() {
    let sampleData = [30, 200, 170, 250, 10]

    return (
      <View style={styles.container}>
        <PureChart data={sampleData} type='line' />
      </View>
    )
  }
}

export default SettingsScreen;

