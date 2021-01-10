/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from 'react';
import {
  CardHeader,Col,Row
} from "shards-react";

import "../../assets/trendlist.css";
import TopAnimeTrendsSmallStats from "../../components/blog/TopAnimeTrendsSmallStats";
import TopAnimeTrendsTable from "../../components/blog/TopAnimeTrendsTable";
import TocIcon from '@material-ui/icons/Toc';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {ArrowRight, ArrowLeft} from '@material-ui/icons';

class TopAnimeTrends extends Component {
  constructor(props){ 
    super(props) 
      
    // Set initial state 
    this.state = {msg : <TopAnimeTrendsSmallStats/>} 
      
    // Binding this keyword 
    this.changetoTable = this.changetoTable.bind(this)
    this.changetoSmallStats = this.changetoSmallStats.bind(this) 
  } 
  
  changetoTable(){ 
    this.setState({msg : <TopAnimeTrendsTable/>}) 
  } 
  changetoSmallStats(){ 
    this.setState({msg : <TopAnimeTrendsSmallStats/>}) 
  } 
  
  render() {
    return (
    <div small="true" className="blog-comments">
      <CardHeader className="border-bottom">
      <h3>
        <Row>
          <Col>
            {"Top Anime Trends"}
          </Col>
          <Col style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <a className="card-text" href="#">{"Trend"}</a> {" | "} 
            <a className="card-text" href="#">{"A-Z"}</a> {" | "} 
            <a className="card-text" href="#">{"Rating"}</a>
          </Col>
          <Col>
            <ArrowRight style={{float: 'right'}} />
            <ArrowLeft style={{float: 'right'}} />
            <TocIcon style={{float: 'right'}} onClick={this.changetoTable}/>
            <DashboardIcon style={{float: 'right'}} onClick={this.changetoSmallStats}/>  
          </Col>
        </Row>
      </h3> 
      </CardHeader>
      <br/>
      { this.state.msg }

    </div>
    );
  };
};

export default TopAnimeTrends;
