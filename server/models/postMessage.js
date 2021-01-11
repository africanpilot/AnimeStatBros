import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    label: String,
    value: String,
    percentage: String,
    increase: Boolean,
    decrease: Boolean,
    chartLables: Array,
    attrs: Object,
    backgroundImage: String,
    datasets: Array,
    body: String,
    date: String,
    genre: String,
    episodes: String,
    rating: String,
    comments: String
})

var PostMessage = mongoose.model('animestats', postSchema);

export default PostMessage;