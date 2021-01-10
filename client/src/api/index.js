import axios from 'axios';

const url = 'http://localhost:27017/posts';

export const fetchPosts = () => axios.get(url);
