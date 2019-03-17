const { AsyncStorage } = require('react-native');
const Parse = require('parse/react-native');

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'ZIKomhlZm0IheXSsxQ2nRwSCZxIS2fAl1LComQtp', // This is your Application ID
  'bj0kbdKkM8QDUsCsLbwKqVckYfhaWr0M6TFGtZps' // This is your Javascript key
);


class ParseAPI {
	constructor() {
    	this.parse = Parse
	}

	create(className,params){
        const MyCustomClass = this.parse.Object.extend(className);
        const myNewObject = new MyCustomClass();
        //can set multiple
     
        Object.keys(params).forEach((key) => (params[key] == null) && delete params[key]);
        Object.keys(params).forEach(key => myNewObject.set(key, params[key]));
         
        myNewObject.save().then(
          (result) => {
            if (typeof document !== 'undefined')
            console.log('ParseObject created', result);
          },
          (error) => {
            if (typeof document !== 'undefined');
            console.error('Error while creating ParseObject: ', error);
          }
        );
    }


    get(className,keyName,valName){
        const MyCustomClass = this.parse.Object.extend(className);
        const query = new Parse.Query(MyCustomClass);
        query.equalTo(keyName, keyName);
        query.find().then((results) => {
            // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          if (typeof document !== 'undefined')
          console.log('ParseObjects found:', results);
        }, (error) => {
          if (typeof document !== 'undefined')
          console.error('Error while fetching ParseObjects', error);
        });
    }


    update(className,objID,keyName,valName){
        const MyCustomClass = Parse.Object.extend(className);
        const query = new Parse.Query(MyCustomClass);
        // here you put the objectId that you want to update
        query.get(objID).then((object) => {
          object.set(keyName, valName);
          object.save().then((response) => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")
            if (typeof document !== 'undefined')
            console.log('Updated ', response);
          }, (error) => {
            if (typeof document !== 'undefined')
            console.error('Error while updating ', error);
          });
        });
    }

    delete(className,objID){
        const MyCustomClass = Parse.Object.extend(className);
        const query = new Parse.Query(MyCustomClass);
        // here you put the objectId that you want to delete
        query.get(objID).then((object) => {
          object.destroy().then((response) => {
            if (typeof document !== 'undefined')
            console.log('Deleted ParseObject', response);
          }, (error) => {
            if (typeof document !== 'undefined')
            console.error('Error while deleting ParseObject', error);
          });
        });
    }
}

export default ParseAPI;