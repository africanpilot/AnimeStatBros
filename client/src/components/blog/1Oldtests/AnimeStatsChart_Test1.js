import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import "../../assets/timeseries.css"

class AnimeStatsChart extends React.Component {

  
  
  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src = "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js";
  //   script.async = true;
  //   script.onload = () => this.scriptLoaded();

  //   document.body.appendChild(script);
  // }

  // componentDidMount2() {
  //   const script = document.createElement("script");
  //   script.src = "//d3js.org/d3.v3.min.js";
  //   script.async = true;
  //   script.onload = () => this.scriptLoaded();

  //   document.body.appendChild(script);
  // }

  // scriptLoaded() {
  //   window.A.sort();
  // }

  render() {

    var loadScript = function(src) {
      var tag = document.createElement('script');
      tag.async = false;
      tag.src = src;
      document.body.appendChild(tag);
    }

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js");
    loadScript("//d3js.org/d3.v3.min.js");
    loadScript("../../components/blog/AnimeStatTimeSeries.js");

    return ( 
      
      <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Anime Stat Time Series</h6>
      </CardHeader>
      <CardBody className="pt-0">
        
      <div id="metric-modal"></div>
      {/* <div src={loadScript('../../components/blog/AnimeStatTimeSeries.js')}></div> */}
      
      <script  type="text/javascript" src="../../components/blog/AnimeStatTimeSeries.js" />

      </CardBody>
    </Card>
    );
};
};

export default AnimeStatsChart;
