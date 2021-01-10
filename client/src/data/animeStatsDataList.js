import Ratings from './../data/climate4.json';
import Comments from './../data/Comments1.json';

export default 
[
    {
        lable : "Ratings",
        data : Ratings,
        title : "Time Series Analysis - Ratings", 
        include : ["Rating","%Change"],
        exclude : ["date","metric"]
    },
    {
        lable : "Comments",
        data : Comments,
        title : "Time Series Analysis - Comments",  
        include : ["Boku no Hero Academia - Rating","Season Average - Rating"],
        exclude : ["date","metric"]
    }
]
