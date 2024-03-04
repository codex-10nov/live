import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
}, {
    timestamps: true
});

const Review = mongoose.model('review', reviewSchema);
export default Review;