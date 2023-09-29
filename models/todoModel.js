
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true,
});

export default mongoose.model('Todo', todoSchema);