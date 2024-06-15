import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playlistschema=new Schema({
    videos:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
  
},{timestamps:true});

export const playlist=mongoose.model("playlist",playlistschema);