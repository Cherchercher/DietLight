import React from 'react';
import { ScrollView, StyleSheet, View, Text, Picker } from 'react-native';
import Parse from '../APIs/Parse';


export default class LinksScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Manual Entry`,
    });
    state = {time: ''}
    updateTime = (time) => {
        this.setState({ time: time })
    }
    constructor(props) {
        super(props);
        this.state = {
            Parse:new Parse(),
            isLoading: true,
        }
    }

    render() {
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Picker 
                        selectedValue = {this.state.time}
                        onValueChange = {this.updateTime}
                        style={{height: 50, width: 150}}
                        >
                        <Picker.Item label = "Breakfast" value = "breakfast" />
                        <Picker.Item label = "Lunch" value = "lunch" />
                        <Picker.Item label = "Dinner" value = "dinner" />
                    </Picker>
                    <Text style={styles.text}> {this.state.time} </Text>
                    <Text style={styles.text}> BSUG INPUT </Text>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 50,
    alignSelf: 'center',
    color: 'red'
  },
});
