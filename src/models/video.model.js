import mongoose, {Schema, trusted} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type:String, //cloudinary url
            required: true,
        },

        thumbnail:{
            type: String,
            required: true
        },

        description:{
            type: String,
            require: true
        },

        duration:{
            type: Number,
            required: true
        },

        views:{
            type: Number,
            default: 0
        },

        isPublished:{
            type: Bollean,
            default: true
        },

        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        }
      
    },{timestamps: true})

videoSchema.plugin

export const Video = mongoose.model("User", videoSchema)