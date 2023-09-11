const mongoose = require('mongoose');

const { Schema } = mongoose;


//schema (This indicate the configuration of Product Collection )
const productSchema = new Schema({
  kitchenId:{type:String,required:true},
  kitchenName:{type:String,required:true},
  foodHeading:{type:String, required:true},
  foodDescription:String ,
  price:{type:Number,  min:[0 ,'wrong Price'],required:true},
  thumbnail:{type:String, required:true} ,
  category:{type:String},
  rating:{type:Number,  min:[0 ,'wrong min rating'] , max:[5 ,'wrong max rating'],default:0},
   });
  
  //Product is a collection name   : product collection ka schema product schema hoga 
  exports.Product= mongoose.model('Product',productSchema);