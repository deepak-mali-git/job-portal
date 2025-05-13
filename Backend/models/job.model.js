import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,

    },
    description: {
        type: String,
        required : true,
    },
    requirements : {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    position:{
        type: String,
        required: true,

    },
    created_by:{
        type: mongoose.schema.Types.objectId,
        ref:"user",
        required: true,
    },
    application:{
        type : mongoose.schema.Types.objectId,
        ref: "Application",
        default: null,
    }
}) 

export const Job = mongoose.model("Job", jobSchema);