const { AsyncStorage } = require('react-native');
const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'EGpXbJXDNK3SyRn1zsIx3ChFCbMr4YZZGFw8cm5v', // This is your Application ID
  'y5rzOjNLA7I5TpxGkn89Oo9BPA4TAvjJDkRrATIm' // This is your Javascript key
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


    async getCal(className,keyName,valName){
        const MyCustomClass = this.parse.Object.extend(className);
        const query = new Parse.Query(MyCustomClass);
        query.equalTo(keyName, valName);
        
        result  = await query.find().then((results) => {

            // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          return {'maxCal':results[0].get("maxCalorie"),'maxFat':results[0].get("maxFat")}
          //  return results.get("maxCalorie");
        }, (error) => {
          return JSON.stringify(results);;
        });
        return result;
    }


    async getDay(className,keyName,valName){
        const MyCustomClass = this.parse.Object.extend(className);
        const query = new Parse.Query(MyCustomClass);
        query.equalTo(keyName, valName);
        
        result  = await query.find().then((results) => {

            // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          return {'nightGlucose':results[0].get("nightGlucose"),'noonGlucose':results[0].get("noonGlucose"),'morningGlucose':results[0].get("morningGlucose"),'fat':results[0].get("currentFat"), 'cal':results[0].get("currentCarbs") }
          //  return results.get("maxCalorie");
        }, (error) => {
          return JSON.stringify(results);;
        });
        return result;
    }

    async getLikes(className,keyName,valName){
      const MyCustomClass = this.parse.Object.extend(className);
      const query = new Parse.Query(MyCustomClass);
      query.equalTo(keyName, valName);
      
      result  = await query.find().then((results) => {

          // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")
        return {'likes':results[0].get("likes"),'dislikes':results[0].get("dislikes") }
        //  return results.get("maxCalorie");
      }, (error) => {
        return JSON.stringify(results);;
      });
      return result;
  }



    update(className,objID,keyName,valName){
        const MyCustomClass = Parse.Object.extend(className);
        const query = new Parse.Query(MyCustomClass);
        // here you put the objectId that you want to update
        query.get(objID).then(async(object) => {
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