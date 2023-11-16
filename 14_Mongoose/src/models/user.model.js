import mongoose from "mongoose";

const userCollection = 'usuarios';

const userShema = new mongoose.Schema({
    fristName : String,
    lastName: String,
    email:{
        type:String,
        unique: true
    }
});

const userModel = mongoose.model(userCollection, userShema);

export { userModel };