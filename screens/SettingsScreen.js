import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  text:{
    marginLeft:'auto',
    marginRight:'auto',
  }
});

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Analytics`,
  });

  constructor(props) {
    super(props);
      this.state = {
            total:2000,
            accu:1500,
            isLoading: true
      
      } 
    }


    componentDidMount() {

    }
    


  render() {
  
  const { total, accu } = this.state;
  return (
    <View>
      <ProgressCircle
          style={ { height: 200 } }
          progress={ 0.75 }
          progressColor={'rgb(134, 65, 244)'}
          startAngle={ -Math.PI * 0.8 }
          endAngle={ Math.PI * 0.8 }
      />
      <Text style={styles.text}> Calories Acumulated: {accu}/{total}</Text>
    </View>
)
}
}


export default SettingsScreen;

