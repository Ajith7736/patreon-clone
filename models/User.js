import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    profilepic : {
        type : String,
    },
    coverpic : {
        type : String,      
    },
    razorid : {
        type : String,
    },
    razorsecret : {
        type : String,
    }
},{timestamps : true}) 



 export default mongoose.models.User || model('User',userSchema);