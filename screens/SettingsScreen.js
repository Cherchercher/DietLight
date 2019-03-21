import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { ProgressCircle, LineChart, YAxis, Grid } from 'react-native-svg-charts'
import Parse from '../APIs/Parse';

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
  title:{
    marginLeft: 12,
    fontSize: 15,
    marginTop: 12,
    fontWeight: 'bold',
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
            data1 : '',
            data2 : '',
            data3 : '',
            contentInset : {top: 20, bottom: 20},
            isLoading: true,
            Parse:new Parse(),
      } 
    }

    async refreshChart(){
        record = await this.state.Parse.getCal('MedicalRecord','userId',1);
        day1 = await this.state.Parse.getDay('Day', 'daynum',1);
        day2 = await this.state.Parse.getDay('Day', 'daynum',2);
        day3 = await this.state.Parse.getDay('Day', 'daynum',3);
        day4 = await this.state.Parse.getDay('Day', 'daynum',4);
        day5 = await this.state.Parse.getDay('Day', 'daynum',5);
        day6 = await this.state.Parse.getDay('Day', 'daynum',6);
        day7 = await this.state.Parse.getDay('Day', 'daynum',7);
        this.setState({data1:[day1.morningGlucose,day2.morningGlucose,day3.morningGlucose,day4.morningGlucose,day5.morningGlucose,day6.morningGlucose,day7.morningGlucose]})
        this.setState({data2:[day1.noonGlucose,day2.noonGlucose,day3.noonGlucose,day4.noonGlucose,day5.noonGlucose,day6.noonGlucose,day7.noonGlucose]})
        this.setState({data3:[day1.nightGlucose,day2.nightGlucose,day3.nightGlucose,day4.nightGlucose,day5.nightGlucose,day6.nightGlucose,day7.nightGlucose]})
        this.setState({total:record.maxCal})
        this.setState({accu:day7.cal})   
    }
    async componentWillMount(){
        record = await this.state.Parse.getCal('MedicalRecord','userId',1);
        day1 = await this.state.Parse.getDay('Day', 'daynum',1);
        day2 = await this.state.Parse.getDay('Day', 'daynum',2);
        day3 = await this.state.Parse.getDay('Day', 'daynum',3);
        day4 = await this.state.Parse.getDay('Day', 'daynum',4);
        day5 = await this.state.Parse.getDay('Day', 'daynum',5);
        day6 = await this.state.Parse.getDay('Day', 'daynum',6);
        day7 = await this.state.Parse.getDay('Day', 'daynum',7);
        this.setState({data1:[day1.morningGlucose,day2.morningGlucose,day3.morningGlucose,day4.morningGlucose,day5.morningGlucose,day6.morningGlucose,day7.morningGlucose]})
        this.setState({data2:[day1.noonGlucose,day2.noonGlucose,day3.noonGlucose,day4.noonGlucose,day5.noonGlucose,day6.noonGlucose,day7.noonGlucose]})
        this.setState({data3:[day1.nightGlucose,day2.nightGlucose,day3.nightGlucose,day4.nightGlucose,day5.nightGlucose,day6.nightGlucose,day7.nightGlucose]})
        this.setState({total:record.maxCal})    
        this.setState({accu:day7.cal})   
    }
    async componentDidMount() {
       record = await this.state.Parse.getCal('MedicalRecord','userId',1);
       day1 = await this.state.Parse.getDay('Day', 'daynum',1);
       day2 = await this.state.Parse.getDay('Day', 'daynum',2);
       day3 = await this.state.Parse.getDay('Day', 'daynum',3);
       day4 = await this.state.Parse.getDay('Day', 'daynum',4);
       day5 = await this.state.Parse.getDay('Day', 'daynum',5);
       day6 = await this.state.Parse.getDay('Day', 'daynum',6);
       day7 = await this.state.Parse.getDay('Day', 'daynum',7);
       this.setState({data1:[day1.morningGlucose,day2.morningGlucose,day3.morningGlucose,day4.morningGlucose,day5.morningGlucose,day6.morningGlucose,day7.morningGlucose]})
       this.setState({data2:[day1.noonGlucose,day2.noonGlucose,day3.noonGlucose,day4.noonGlucose,day5.noonGlucose,day6.noonGlucose,day7.noonGlucose]})
       this.setState({data3:[day1.nightGlucose,day2.nightGlucose,day3.nightGlucose,day4.nightGlucose,day5.nightGlucose,day6.nightGlucose,day7.nightGlucose]})
       this.setState({total:record.maxCal})    
       this.setState({accu:day7.cal})    
       
    }
    


  render() {
  
  const { total, accu, burned, contentInset, data1, data2, data3} = this.state;
  const percentage = accu/total;
  return (
    <View>
        <View>
            <Text style={styles.title}> Calories Chart (kcal): </Text>
        </View>
        <Button
                        onPress={()=> this.refreshChart()}
                        title="Refresh Chart"
            />
       
        <View>
            <ProgressCircle
                  style={ { height: 150 } }
                  progress={ percentage }
                  progressColor={'rgb(134, 65, 244)'}
                  startAngle={ 0 }
                  endAngle={ Math.PI * 2 }
                  strokeWidth = { 30 }
            />
            <Text style={styles.ptext}> Calories Acumulated: {accu}/{total}</Text>
            <Text style={styles.ptext}> Calories Burned: {burned}</Text>
        </View>
        <View>
            <Text style={styles.title}> Blood-Sugar Chart (mg/dl): </Text>
        </View>
        <View style={{ height: 150, flexDirection: 'row' }}>
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
                        max={200}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={ data1 }
                        svg={{ stroke: 'green' }}
                        contentInset={ contentInset }
                        yMin={0}
                        yMax={200}
                    >
                        <Grid/>
                    </LineChart>
                    <LineChart
                        //style={{ flex: 1, height: 200, marginLeft: 16 }}
                        style={[StyleSheet.absoluteFill, styles.chart]}
                        data={ data2 }
                        svg={{ stroke: 'red' }}
                        contentInset={ contentInset }
                        yMin={0}
                        yMax={200}
                    >
                        <Grid/>
                    </LineChart>
                    <LineChart
                        //style={{ flex: 1, height: 200, marginLeft: 16 }}
                        style={[StyleSheet.absoluteFill, styles.chart]}
                        data={ data3 }
                        svg={{ stroke: 'purple' }}
                        contentInset={ contentInset }
                        yMin={0}
                        yMax={200}
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

