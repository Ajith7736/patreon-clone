import mongoose from "mongoose";
import { Schema , model } from "mongoose";

const paymetSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    to_user : {
        type : String,
        required: true
    },
    oid : {
        type: String,
        required: true
    },
    message : {
        type: String,
        default: ""
    },
    amount : {
        type: Number,
        required: true
    },
    createAt :{
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    },
    done :{
        type: Boolean,
        default: false
    }
})


export default mongoose.models.Payment || model('Payment', paymetSchema);