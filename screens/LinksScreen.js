import React from 'react';
import { ScrollView, StyleSheet, View, Text, Picker, AppRegistry, TextInput, TouchableOpacity } from 'react-native';

const { AsyncStorage } = require('react-native');
const Parse = require('parse/react-native');

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
 'EGpXbJXDNK3SyRn1zsIx3ChFCbMr4YZZGFw8cm5v', // This is your Application ID
 'y5rzOjNLA7I5TpxGkn89Oo9BPA4TAvjJDkRrATIm' // This is your Javascript key
);

var id;

export default class LinksScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Manual Entry`,
    });

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            time: 'breakfast',
            bsug: '',
            Name: '',
            Age: '',
            Height: '',
            Gender: '1',
            Weight: '',
            Weight_goal: '',
            DietPreference:'vegetarian',
            Likes: '',
            Disklikes: '',
        }
    }

    updateTime = (time) => {
        this.setState({ time: time })
    }

    updateDietPreference = (pref) => {
        this.setState({ DietPreference: pref })
     }

    handleBloodSugar = (text) => {
        this.setState({ bsug: text })
    }
    
    handleName = (text) => {
        this.setState({ Name: text })
     }
    handleAge = (text) => {
        this.setState({Age: text})
    }
     handleHeight = (text) => {
        this.setState({ Height: text })
     }
     handleGender = (text) => {
        this.setState({ Gender: text })
     }
     handleWeight = (text) => {
        this.setState({ Weight: text })
     }
     handleWeight_goal = (text) => {
        this.setState({ Weight_goal: text })
     }

    handleLikes = (text) => {
        this.setState({ Likes: text })
    }

    handleDislikes = (text) => {
        this.setState({Dislikes: text })
    }


    login = (Name, Height) => {

        const Users = Parse.Object.extend('Users');
        const myNewObject = new Users();
        
        myNewObject.set('Name', this.state.Name);
        myNewObject.set('Age', parseInt(this.state.Age));
        myNewObject.set('Likes', this.state.Likes.split(' '));
        myNewObject.set('Dislikes', this.state.Disklikes.split(' '));
        myNewObject.set('Gender', (this.state.Gender == "1"));
        myNewObject.set('Height_cm', parseInt(this.state.Height));
        myNewObject.set('WeightGoal_kg', parseInt(this.state.Weight_goal));
        myNewObject.set('Weight_kg', parseInt(this.state.Weight));
        myNewObject.set('DietPreference', this.state.DietPreference);
        
        myNewObject.save().then(
          (result) => {
            if (typeof document !== 'undefined') 
                alert(myNewObject.id);
                this.setState({userID: myNewObject.id});
          },
          (error) => {
            if (typeof document !== 'undefined') document.write(`Error while creating Users: ${JSON.stringify(error)}`);
            console.error('Error while creating Users: ', error);
          }
        );
        
        alert('Name: ' + this.state.Name + '\nHeight: ' + this.state.Height + 
        '\nMeal of the day: ' + this.state.time +
        '\nDiet preference: ' + this.state.DietPreference +
        '\nGender: ' + this.state.Gender +
        '\nUser ID:' + this.state.userID)
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.Container}>
           
                <TextInput style = {styles.input}
                placeholder = "Name"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleName}/>

                <TextInput style = {styles.input}
                placeholder = "Age"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleAge}/>

                <TextInput style = {styles.input}
                placeholder = "Height/cm"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHeight}/>

                <Text style = {styles.subtitle} >Gender: </Text>
                <View style = {styles.drop_list_container}>
                    <Picker 
                        selectedValue = {this.state.Gender}
                        onValueChange = {itemValue => this.handleGender(itemValue)}
                        >
                        <Picker.Item label = "Male" value = "1" />
                        <Picker.Item label = "Female" value = "0" />
                    </Picker>

                </View>

                <TextInput style = {styles.input}
                placeholder = "Weight/kg"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleWeight}/>

                <TextInput style = {styles.input}
                placeholder = "Weight_goal/kg"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleWeight_goal}/>


                <TextInput style = {styles.input}
                placeholder = "Likes"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLikes}/>

                <TextInput style = {styles.input}
                placeholder = "Dislikes"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleDislikes}/>

                <TextInput style = {styles.input}
                    placeholder = "Blood sugar(mg/dl)"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleBloodSugar}/>

                <Text style = {styles.subtitle} >Meal of the day: </Text>
                <View style = {styles.drop_list_container}>
                    <Picker 
                        selectedValue = {this.state.time}
                        onValueChange = {itemValue => this.updateTime(itemValue)}
                        >
                        <Picker.Item label = "Breakfast" value = "breakfast" />
                        <Picker.Item label = "Lunch" value = "lunch" />
                        <Picker.Item label = "Dinner" value = "dinner" />
                    </Picker>

                </View>

                <Text style = {styles.subtitle} >Diet preference: </Text>
                <View style = {styles.drop_list_container}>
                    <Picker 
                        selectedValue = {this.state.DietPreference}
                        onValueChange = {itemValue => this.updateDietPreference(itemValue)}
                        >
                        <Picker.Item label = "Vegetarian" value = "vegetarian" />
                        <Picker.Item label = "Vegan" value = "vegan" />
                        <Picker.Item label = "None" value = "none" />
                    </Picker>

                </View>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.login()
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
     },
    drop_list_container:{
        flex: 2,
        justifyContent: "center",
        margin :10
     },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin : 15,
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
