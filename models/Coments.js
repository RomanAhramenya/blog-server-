import mongoose from "mongoose";

const ComentsSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    imageUrl:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    postId: {
        type:String,
        required:true,
    }
},
{timestamps:true}
) 
export default mongoose.model('Coments',ComentsSchema)