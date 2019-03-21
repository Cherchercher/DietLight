import React from 'react';
import { ScrollView, StyleSheet, View, Text, Picker, AppRegistry, TextInput, TouchableOpacity } from 'react-native';
import Parse from '../APIs/Parse';


export default class LinksScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Manual Entry`,
    });
    updateTime = (time) => {
        this.setState({ time: time })
    }
    constructor(props) {
        super(props);
        this.state = {
            Parse:new Parse(),
            isLoading: true,
            time: 'breakfast',
            bsug: '',
        }
    }

    handleBloodSugar = (text) => {
        this.setState({ bsug: text })
    }

    submit = async(time, bsug) => {
        if (time === "breakfast"){
            check = 'morningGlucose';
        } else if (time === "lunch"){
            check = 'noonGlucose';
        } else {
            check = 'nightGlucose';
        }
        await this.state.Parse.update('Day','KYZzfD4PLE',check,parseInt(bsug));
        alert('time: ' + time + '   ' + 'blood/sugar: ' + bsug + 'submitted');
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
                    <TextInput style={{height: 40}}
                        placeholder="Text here"
                        onChangeText={this.handleBloodSugar}
                    />
                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {
                            () => this.submit(this.state.time, this.state.bsug)
                        }>
                        <Text style = {styles.submitButtonText}> Submit </Text>
                    </TouchableOpacity>
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
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    }
});
