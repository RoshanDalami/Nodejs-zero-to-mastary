const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  //while schema can be defined in by passing many thing such as default value , min, max . but bear minimum field that should or must be passed is type and require key and values.

  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  // not recommended
//   target : {
//     type : mongoose.ObjectId ,
//     ref : 'Planet',
//   }
customers : [String],
target:{
    type:String,
    required : true ,
},
upcoming : {
    type:Boolean ,
    required: true,
},
success : {
    type:Boolean ,
    required: true,
    default : true,
},

});


// Now we have to model the collection using Schema we just defined.
//P.S : name must be singular of the schema . Mongoose will take that singular name and lowercase it and pularize it .and take to the schema.

//connect launchesSchema with the "launches" collection
module.exports = mongoose.model('Launch',launchesSchema);



