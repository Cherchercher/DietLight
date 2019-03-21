import React from 'react';
import { ScrollView, StyleSheet, Button, View, Text, Picker, AppRegistry, TextInput, TouchableOpacity } from 'react-native';
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
            likes: '',
            disklikes: '',
        }
    }
    
    async resetPreference(){
        await this.state.Parse.update('fakeUser','kF8l08CQuO','dislikes',null);
    }
    handleBloodSugar = (text) => {
        this.setState({ bsug: text })
    }
    
    handleLikes = async(text) => {
        this.setState({ likes: text });

    }

    handleDislikes = async(text) => {
        this.setState({dislikes: text });
    }

    submitbs = async(time, bsug) => {
        alert('time: ' + time + '   ' + 'blood/sugar: ' + bsug);
        if(time === 'breakfast'){
            key = 'morningGlucose';
        } else if (time ==="lunch"){
            key = 'noonGlucose';
        } else{
            key = 'nightGlucose';
        }
        await this.state.Parse.update('Day','KYZzfD4PLE',key,parseInt(bsug));
    }

    submitlikes = async(likes) => {
        alert('user likes: ' + likes)
        await this.state.Parse.update('fakeUser','kF8l08CQuO','likes',[likes]);
        
    }

    submitDislikes = async(dislikes) => {
        alert('user dislikes: ' + dislikes)
        await this.state.Parse.update('fakeUser','kF8l08CQuO','dislikes',[dislikes]);
    }

    render() {
        return (
           
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Button
                    onPress={()=> this.resetPreference()}
                    title="Reset Preference"
                />
                <Text style = {styles.title}> Enter Blood Sugar: </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Picker 
                        style = {{marginTop: 50}}
                        selectedValue = {this.state.time}
                        onValueChange = {this.updateTime}
                        style={{height: 50, width: 150}}
                        >
                        <Picker.Item label = "Breakfast" value = "breakfast" />
                        <Picker.Item label = "Lunch" value = "lunch" />
                        <Picker.Item label = "Dinner" value = "dinner" />
                    </Picker>
                    <TextInput style={styles.input}
                        placeholder="mg/dl"
                        onChangeText={this.handleBloodSugar}
                    />
                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {
                            () => this.submitbs(this.state.time, this.state.bsug)
                        }>
                        <Text style = {styles.submitButtonText}> Submit </Text>
                    </TouchableOpacity>
                </View>
                <Text style = {styles.title}> Enter Likes/Dislikes: </Text>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TextInput style={styles.input}
                            placeholder="Likes"
                            onChangeText={this.handleLikes}
                        />
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress = {
                                () => this.submitlikes(this.state.likes)
                            }>
                            <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TextInput style={styles.input}
                            placeholder="Dislikes"
                            onChangeText={this.handleDislikes}
                        />
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress = {
                                () => this.submitDislikes(this.state.dislikes)
                            }>
                            <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
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