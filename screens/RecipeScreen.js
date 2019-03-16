
    import React, { Component } from 'react';
    import Autocomplete from 'react-native-autocomplete-input';
    import Spoonacular from '../APIs/Spoonacular';
    import { SearchBar } from 'react-native-elements';
    import { 
        StyleSheet, 
        Text, 
        View, 
        FlatList,
        Linking,
        Image,
        TouchableOpacity,
        ActivityIndicator } from 'react-native';

    const URL = 'https://www.themealdb.com/api/json/v1/1/latest.php';
    
    export default class RecipeScreen extends React.Component {
        constructor(props) {
            super(props);
              this.state = {
                        Spoonacular:new Spoonacular(),
                        isLoading: true,
                        query: '',
                        displayResults:true,
                        meals:'',
                        spoons:'',
                        data:['aaaaaaa','bbbbbb','cccccc']
              }
        }
    
        updateSearch(text){
            this.setState({ query: text, displayResults:false});
            newData = this.Spoonacular.autocomplete(text);
            this.setState({data: newData});
        };
        
       
       componentDidMount() {
        URL2 = this.state.Spoonacular.filterByNutrients();
        fetch(URL2, { 
            method: 'get', 
            headers: new Headers({
              'Accept': 'application/json',
              'X-RapidAPI-Key': '4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7', 
            }), 
          })
          .then(result => result.json())
          .then(data => {
                const spoons = data;
                this.setState({ 
                    isLoading: false,
                    meals:data});
          })
          .catch((err) =>{
                this.setState({ spoons: err});
                console.log(err);
          });

      }
    
      render() {
        const { query,data,displayResults,spoons } = this.state;
        if (this.state.isLoading) {
          return (
            <View style={{flex: 1}}>
              <ActivityIndicator
                color = '#bc2b78'
                size = "large"
                style = {styles.activityIndicator}
              />
            </View>
          );
        }
    
        return (
        <View style={styles.container}>
           
                {/*<View style={styles.autocompleteContainer}>
                    <Autocomplete
                        data={data}
                        hideResults={displayResults}
                        defaultValue={query}
                        onChangeText={text => this.updateSearch(text)}
                        placeholder="Search by ingredients"
                        renderItem={item => (
                    <TouchableOpacity onPress={() => this.setState({ query: item,displayResults:true})}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                    )}
                />
                </View> */}

            <FlatList
                data={this.state.meals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <View key={item.id}>
                    <Image
                      style={{width: '100%', height: 250}}
                      source={{uri: item.image}}
                    />
                    <Text 
                        style={styles.title}
                        onPress={() => Linking.openURL(item.strSource)}
                    >     
                        {item.title}
                        Calories: {item.calories} Protein: {item.protein} Sat. Fat: {item.suturatedFat} Carbs {item.carbs}
                    </Text>
                </View>}
            />
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      activityIndicator: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 80
      },
      title: {
          textAlign: 'center',
          fontSize: 20,
          marginBottom: 10
      },
      autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
      }
    });