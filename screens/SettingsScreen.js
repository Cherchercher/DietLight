import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle, LineChart, YAxis, Grid } from 'react-native-svg-charts'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  text:{
    marginLeft:'auto',
    marginRight: 15,
  },
  ptext:{
    marginLeft:'auto',
    marginRight: 'auto',
  },
  chart: {
      marginLeft: 16,
  },
  row: {
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: "row",
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
            burned: 250,
            isLoading: true,
            data1 : [55, 300, 90, 60, 56, 69, 91],
            data2 : [91, 69, 56, 60, 90, 62, 330],
            data3 : [82, 153, 63,  100, 113, 94, 116],
            contentInset : {top: 20, bottom: 20}
      } 
    }


    componentDidMount() {

    }
    


  render() {
  
  const { total, accu, burned, contentInset, data1, data2, data3 } = this.state;
  return (
    <View>
        <View>
            <ProgressCircle
                  style={ { height: 200 } }
                  progress={ 0.75 }
                  progressColor={'rgb(134, 65, 244)'}
                  startAngle={ 0 }
                  endAngle={ Math.PI * 2 }
                  strokeWidth = { 35 }
            />
            <Text style={styles.ptext}> Calories Acumulated: {accu}/{total}</Text>
            <Text style={styles.ptext}> Calories Burned: {burned}</Text>
        </View>
        <View style={{ height: 200, flexDirection: 'row' }}>
                    <YAxis
                        data={ data1 }
                        contentInset={ contentInset }
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={ 10 }
                        formatLabel={ value => `${value}` }
                        min={0}
                        max={400}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={ data1 }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={ contentInset }
                        yMin={0}
                        yMax={400}
                    >
                        <Grid/>
                    </LineChart>
                    <LineChart
                        //style={{ flex: 1, height: 200, marginLeft: 16 }}
                        style={[StyleSheet.absoluteFill, styles.chart]}
                        data={ data2 }
                        svg={{ stroke: 'rgb(200, 0, 180)' }}
                        contentInset={ contentInset }
                        yMin={0}
                        yMax={400}
                    >
                        <Grid/>
                    </LineChart>
                    <LineChart
                        //style={{ flex: 1, height: 200, marginLeft: 16 }}
                        style={[StyleSheet.absoluteFill, styles.chart]}
                        data={ data3 }
                        svg={{ stroke: 'rgb(0, 300, 100)' }}
                        contentInset={ contentInset }
                        yMin={0}
                        yMax={400}
                    >
                        <Grid/>
                    </LineChart>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}> Breakfast: </Text>
            <View style = {{       width: 10,
                                   height: 10,
                                   backgroundColor: 'green',
                                   marginTop: 5
                          }}         
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.text}> Lunch: </Text>
            <View style = {{       width: 10,
                                   height: 10,
                                   backgroundColor: 'red',
                                   marginTop: 5
                          }}         
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.text}> Dinner: </Text>
            <View style = {{       width: 10,
                                   height: 10,
                                   backgroundColor: 'purple',
                                   marginTop: 5
                          }}         
            />
        </View>
    </View>
 )
}
}

export default SettingsScreen;

