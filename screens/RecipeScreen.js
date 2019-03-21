
    import React, { Component } from 'react';
    import Spoonacular from '../APIs/Spoonacular';
    import { SearchBar } from 'react-native-elements';
    import Parse from '../APIs/Parse';
    import { 
        StyleSheet, 
        Text, 
        View, 
        FlatList,
        Linking,
        Image,
        TouchableOpacity,
        ActivityIndicator, Button } from 'react-native';
    
    const URL = 'https://www.themealdb.com/api/json/v1/1/latest.php';
    
    export default class RecipeScreen extends React.Component {
        static navigationOptions = ({ navigation }) => ({
            title: `Recommendations`,
          });

        constructor(props) {
            super(props);
              this.state = {
                        Spoonacular:new Spoonacular(),
                        isLoading: true,
                        query: '',
                        displayResults:true,
                        meals:'',
                        dislikes:[],
                        spoons:'',
                        Parse:new Parse(),
                        data:['aaaaaaa','bbbbbb','cccccc']
              }
        }
        
        updateSearch(text){
            this.setState({ query: text, displayResults:false});
            newData = this.Spoonacular.autocomplete(text);
            this.setState({data: newData});
        };
        
        async resetDay(){
            await this.state.Parse.update('Day','KYZzfD4PLE','currentFat',0);
            await this.state.Parse.update('Day','KYZzfD4PLE','currentCarbs',0);
            
            record = await this.state.Parse.getCal('MedicalRecord','userId',1);
            curr = await this.state.Parse.getDay('Day', 'daynum',7);
                     
            fat = record.maxFat-curr.fat;
            cal = record.maxCal-curr.cal;
            URL2 = this.state.Spoonacular.filterByNutrients(cal,fat);
            fetch(URL2, { 
                method: 'get', 
                headers: new Headers({
                  'Accept': 'application/json',
                  'X-RapidAPI-Key': '4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7', 
                }), 
              })
              .then(result => result.json())
              .then(data => {
                    data.sort((a,b) => b.calories - a.calories);
                    this.setState({ 
                        isLoading: false,
                        spoons:'hi',
                        meals:data});
              })
              .catch((err) =>{
                    this.setState({spoons: err});
                    console.log(err);
              });
        }

        async addRecipe(cal, fat) {
            curr = await this.state.Parse.getDay('Day', 'daynum',7);
            
            //await this.state.Parse.update('Day','KYZzfD4PLE','currentFat',0);
            //await this.state.Parse.update('Day','KYZzfD4PLE','currentCarbs',0);
            await this.state.Parse.update('Day','KYZzfD4PLE','currentFat',fat+curr.fat);
            await this.state.Parse.update('Day','KYZzfD4PLE','currentCarbs',cal+curr.cal);
             
            record = await this.state.Parse.getCal('MedicalRecord','userId',1);
            curr = await this.state.Parse.getDay('Day', 'daynum',7);
                     
            fat = record.maxFat-curr.fat;
            cal = record.maxCal-curr.cal;
            URL2 = this.state.Spoonacular.filterByNutrients(cal,fat);
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
                    data.sort((a,b) => b.calories - a.calories);
                    for (i = 0; i < this.state.dislikes.length; i++) { 
                        data = data.filter(item => item.title.toLowerCase().indexOf(this.state.dislikes[i]) < 0);
                    }
                   
                    this.setState({ 
                        isLoading: false,
                        meals:data});
              })
              .catch((err) =>{
                    this.setState({spoons: err});
                    console.log(err);
              });
    
        }
       

        

    async componentDidMount() {
        record = await this.state.Parse.getCal('MedicalRecord','userId',1);
        curr = await this.state.Parse.getDay('Day', 'daynum',7);
        fat = record.maxFat-curr.fat;
        cal = record.maxCal-curr.cal;
        URL2 = this.state.Spoonacular.filterByNutrients(cal,fat);
        fetch(URL2, { 
            method: 'get', 
            headers: new Headers({
              'Accept': 'application/json',
              'X-RapidAPI-Key': '4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7', 
            }), 
          })
          .then(result => result.json())
          .then(data => {
                data.sort((a,b) => b.calories - a.calories);
                for (i = 0; i < this.state.dislikes.length; i++) { 
                    data = data.filter(item => item.title.toLowerCase().indexOf(this.state.dislikes[i]) < 0);
                }
                this.setState({ 
                    isLoading: false,
                    spoons:'hi',
                    meals:data});
          })
          .catch((err) =>{
                this.setState({spoons: err});
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
            

            <Button
                        onPress={()=> this.resetDay()}
                        title="Reset Day"
            />
       
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
                        Calories: {item.calories} Protein: {item.protein} Fat: {item.fat} Carbs {item.carbs}
                    </Text>

                    <Button
                        onPress={()=> this.addRecipe(parseInt(item.calories),parseInt(item.fat))}
                        title="Add"
                    />
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