import React from 'react';
import {Card, CardHeader, CardBody } from "shards-react";

import StatsBarChart from "../../components/blog/AnimeStatBarChart.js"
import "../../assets/seasonstats.css" ;

function AnimeBarChart() {
    return ( 
      
      <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h3 className="m-0">Season Categorical Comparions</h3>
      </CardHeader>
      <CardBody>
      <div className="StatsBarChart">
        <StatsBarChart/>
        </div>
      </CardBody>
    </Card>
    );
};


export default AnimeBarChart;
