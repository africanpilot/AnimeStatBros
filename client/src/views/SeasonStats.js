/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Container, Row, Col
  ,CardHeader,CardFooter,Card,CardBody 
} from "shards-react";
import "./../assets/trendlist.css";
import ReactWordcloud from "react-wordcloud";
import { MDBContainer } from "mdbreact";

import PageTitle from "./../components/common/PageTitle";
import AnimeStatsTrendList from "./../components/common/AnimeStatsTrendList";
import SeasonTimeSeriesChart from "./../components/blog/SeasonTimeSeriesChart.js"
import SeasonDescription from "./../components/blog/SeasonDescription";
import SeasonBarChart from "./../components/blog/SeasonBarChart.js"
import UsersByDevice from "./../components/blog/UsersByDevice";
import CommentSection from "./../components/blog/CommentSection";

import words from "./../data/words";
import CommentsData from "./../data/comments.json";
import StatesData from "./../data/statesdata.json";
import SeasonDescriptionData from './../data/seasonDescriptions.json';
import SeasonSmallStatsdata from './../data/seasonsmallstats.json';  
import rangeColordata from './../data/rangecolors.js';
import piechartdata from './../data/pieChart.json';

const excludeList = ["date","id","metric","State","ages"];
const barchartInclude = ["2020 Fall Season","2020 Summer Season","2020 Spring Season"];
const scrollContainerStyle = {maxHeight: "1443px", overflowX: "hidden"};
const piechartLabels = ["Watching", "Dropped","Completed", "On Hold", "Plan to watch"]

const SeasonStats = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Season Stats" subtitle="Season Stats Overview" className="text-sm-left mb-3" />
    </Row>
    <Row>  
      <Col lg="2" md="12" sm="12" className="mb-4">
        <CardHeader style={{height: "60px"}} className="border-bottom mb-4">
          <div className="center">
            <a className="card-text" href="#">{"Trend"}</a> {" | "} 
            <a className="card-text" href="#">{"A-Z"}</a> {" | "} 
            <a className="card-text" href="#">{"Rating"}</a>
          </div>
        </CardHeader>
        <MDBContainer>
          <div className="scrollbar scrollbar-primary mx-auto" style={scrollContainerStyle}>
            <Row>
              {SeasonSmallStatsdata.map((stats, idx) => (
                <Col className="col-lg" key={idx} {...stats.attrs}>
                  <AnimeStatsTrendList
                    id={`small-stats-${idx}`}
                    variation="1"
                    chartData={stats.datasets}
                    chartLabels={stats.chartLabels}
                    label={stats.label}
                    value={stats.value}
                    percentage={stats.percentage}
                    increase={stats.increase}
                    decrease={stats.decrease}
                    backgroundImage={stats.backgroundImage}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </MDBContainer>
        <CardFooter style={{height: "65px"}} className="border-bottom mb-4"/>
      </Col>


    <Col>
      <Row>
        <Col lg="8" md="12" sm="12" className="mb-4">
          <SeasonTimeSeriesChart/>
        </Col>
        <Col lg="4" md="12" sm="12" className="mb-4">
          <SeasonDescription data={SeasonDescriptionData}/>
        </Col>
      </Row>
          
      <Row >
        <Col lg="8" md="12" sm="12" className="mb-4">
        <Card>
            <CardHeader className="border-bottom">
                <h3 className="m-0">{"Season Categorical Comparisons"}</h3>
              </CardHeader>
                <CardBody> 
                  <SeasonBarChart 
                  data={StatesData}
                  rangeColors={rangeColordata}
                  exclude={excludeList} 
                  include={barchartInclude}
                  m1B={20}
                  m1T={10}
                  />
                </CardBody>
              <CardFooter className="border-top">
            </CardFooter>
          </Card>
        </Col>
        <Col lg="4" md="12" sm="12" className="mb-4">
          <UsersByDevice 
              title={"Categories Analysis - " +piechartdata[0].title}
              data={piechartdata[0].data}
              labels={piechartLabels}
              backgroundColor={rangeColordata}
              canvasHeight={316}
            />
        </Col>
      </Row>
      

      <Row >
        <Col lg="8" md="12" sm="12" className="mb-4">
          <CommentSection
            title={"Comments"} 
            comments={CommentsData}
          />
        </Col>
        <Col lg="4" md="12" sm="12" className="mb-4">
          <Card>
            <CardHeader style={{height: "80px"}} className="border-bottom mb-4">
              <h3 className="m-0">{"Word Cloud Analysis"}</h3>
            </CardHeader>
              <CardBody>
                <ReactWordcloud style={{height: "303px"}} words={words} />
              </CardBody>
            <CardFooter className="border-top">
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Col>
    </Row>
  </Container>
);

export default SeasonStats;