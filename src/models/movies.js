import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const moviesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: true
        },
        diem: {
            type: Number,
            require: true
        },
        nam: {
            type: Number,
            require: true
        },
        video:{
            type:String,
            require:true
        },
        desc: {
            type: String,
            require: true
        },
        
        
    },{timestamp:true,versionKay:false}
);
moviesSchema.plugin(mongoosePaginate)
export default mongoose.model("Movies", moviesSchema)