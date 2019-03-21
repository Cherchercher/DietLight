
class Spoonacular {
   constructor() {
        this.url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/";
        this.key = "4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7";
   }


   
   getDishByIngredients(name){    
        var URL =  this.url + 'recipes/findByIngredients?number=5&ranking=1&ingredients=' + name;
        unirest.get(URL)
        .header("X-RapidAPI-Key", this.key)
        .end(function (result) {
          console.log(result.status, result.headers, result.body);
        });
    }

    autocomplete(name){    
      name = "bana";
      var URL =  this.url + "food/ingredients/autocomplete?number=10&intolerances=egg&query=" + name;
      unirest.get(URL)
      .header("X-RapidAPI-Key", this.key)
      .end(function (result) {
        console.log(result.status, result.headers, result.body);
      });
    }    

    filterByNutrients(maxCal=2000,maxFat=44){
      return ULR = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?&offset=0&number=10&maxCalories="+maxCal+"&maxFat=" + maxFat;
    }
 }
 
 export default Spoonacular;
 
 /* 
                //get by ingredients 
                unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=apples%2Cflour%2Csugar")
                .header("X-RapidAPI-Key", "4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7")
                .end(function (result) {
                  console.log(result.status, result.headers, result.body);
                });

                0:{6 items
                "id":641803
                "title":"Easy & Delish! ~ Apple Crumble"
                "image":"https://spoonacular.com/recipeImages/Easy---Delish--Apple-Crumble-641803.jpg"
                "usedIngredientCount":3
                "missedIngredientCount":4
                "likes":1
                }

                //auto complete   ..name ..image
                unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=10&intolerances=egg&query=appl")
                .header("X-RapidAPI-Key", "4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7")
                .end(function (result) {
                  console.log(result.status, result.headers, result.body);
                });
        

                  //get by ingredients 
                unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=apples%2Cflour%2Csugar")
                .header("X-RapidAPI-Key", "4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7")
                .end(function (result) {
                  console.log(result.status, result.headers, result.body);
                });

               

              
        
                "id":2
                "title":"Anchovies With Breadcrumbs & Scallions"
                "image":"https://spoonacular.com/recipeImages/anchovies_with_breadcrumbs_scallions-2.jpg"
                "imageType":"jpg"
                "calories":38
                "protein":"4g"
                "fat":"2g"
                "carbs":"0g"
        
                //get recipe by ID
                unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information")
                .header("X-RapidAPI-Key", "4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7")
                .end(function (result) {
                  console.log(result.status, result.headers, result.body);
                });
        


                {26 items
              "vegetarian":false
              "vegan":false
              "glutenFree":true
              "dairyFree":true
              "veryHealthy":false
              "cheap":false
              "veryPopular":false
              "sustainable":false
              "weightWatcherSmartPoints":21
              "gaps":"no"
              "lowFodmap":false
              "ketogenic":false
              "whole30":false
              "servings":10
              "sourceUrl":"http://www.epicurious.com/recipes/food/views/Char-Grilled-Beef-Tenderloin-with-Three-Herb-Chimichurri-235342"
              "spoonacularSourceUrl":"https://spoonacular.com/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992"
              "aggregateLikes":0
              "creditText":"Epicurious"
              "sourceName":"Epicurious"
              "extendedIngredients":[18 items
              0:{10 items
              "id":1022009
              "aisle":"Ethnic Foods"
              "image":"https://spoonacular.com/cdn/ingredients_100x100/chili-powder.jpg"
              "name":"ancho chile powder"
              "amount":1.5
              "unit":"teaspoons"
              "unitShort":"t"
              "unitLong":"teaspoons"
              "originalString":"1 1/2 teaspoons chipotle chile powder or ancho chile powder"
              "metaInformation":[]0 items
              }
              1:{10 items
              "id":13926
              "aisle":"Meat"
              "image":"https://spoonacular.com/cdn/ingredients_100x100/beef-tenderloin.jpg"
              "name":"beef tenderloin"
              "amount":3.5
              "unit":"pound"
              "unitShort":"lb"
              "unitLong":"pounds"
              "originalString":"1 3 1/2-pound beef tenderloin"
              "metaInformation":[]0 items
              }
              2:{...}10 items
              3:{...}10 items
              4:{...}10 items
              5:{...}10 items
              6:{...}10 items
              7:{...}10 items
              8:{...}10 items
              9:{...}10 items
              10:{...}10 items
              11:{...}10 items
              12:{...}10 items
              13:{...}10 items
              14:{...}10 items
              15:{...}10 items
              16:{...}10 items
              17:{...}10 items
              ]
              "id":156992
              "title":"Char-Grilled Beef Tenderloin with Three-Herb Chimichurri"
              "readyInMinutes":45
              "image":"https://spoonacular.com/recipeImages/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992.jpg"
              "imageType":"jpg"
              "instructions":"PreparationFor spice rub: Combine all ingredients in small bowl. Do ahead: Can be made 2 days ahead. Store airtight at room temperature. For chimichurri sauce: Combine first 8 ingredients in blender; blend until almost smooth. Add 1/4 of parsley, 1/4 of cilantro, and 1/4 of mint; blend until incorporated. Add remaining herbs in 3 more additions, pureeing until almost smooth after each addition. Do ahead: Can be made 3 hours ahead. Cover; chill. For beef tenderloin: Let beef stand at room temperature 1 hour. Prepare barbecue (high heat). Pat beef dry with paper towels; brush with oil. Sprinkle all over with spice rub, using all of mixture (coating will be thick). Place beef on grill; sear 2 minutes on each side. Reduce heat to medium-high. Grill uncovered until instant-read thermometer inserted into thickest part of beef registers 130F for medium-rare, moving beef to cooler part of grill as needed to prevent burning, and turning occasionally, about 40 minutes. Transfer to platter; cover loosely with foil and let rest 15 minutes. Thinly slice beef crosswise. Serve with chimichurri sauce. *Available at specialty foods stores and from tienda.com."
              }

                //sort
                const json = JSON.parse(getJsonFile());
                
                const jsonAsArray = Object.keys(json).map(function (key) {
                  return json[key];
                })
                .sort(function (itemA, itemB) {
                  return itemA.score < itemB.score;
                });

                */