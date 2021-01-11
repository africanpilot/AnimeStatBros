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
})

var PostMessage = mongoose.model('animesmallstats', postSchema);

export default PostMessage;