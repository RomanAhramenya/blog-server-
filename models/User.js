import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique:true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl:String
},
    {
        timestamps:true
    }
)

export default mongoose.model('User',UserSchema)