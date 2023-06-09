import mongoose from "mongoose";


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
        desc: {
            type: String,
            require: true
        },
    }
);

export default mongoose.model("Movies", moviesSchema)