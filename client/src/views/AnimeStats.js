/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {useState,useEffect} from "react";
import ReactWordcloud from "react-wordcloud";
import { Container, Row, Col, CardHeader,CardFooter,Card,CardBody} from "shards-react";
import { MDBContainer } from "mdbreact";
import "./../assets/trendlist.css";
import PageTitle from "./../components/common/PageTitle";
import { useSelector,useDispatch } from 'react-redux';
import { getPosts } from './../actions/posts';

//Charts
import AnimeStatsTrendList from "./../components/common/AnimeStatsTrendList";
import TimeSeriesChart from "./../components/blog/TimeSeriesChart";
import AnimeDescription from "./../components/blog/AnimeDescription";
import CommentSection from "../components/blog/CommentSection";
import UsersByDevice from "./../components/blog/UsersByDevice";
import TopAnimeTrendsTable from "./../components/blog/TopAnimeTrendsTable";

//data
import CommentsData from "./../data/comments.json";
import words from "./../data/words";
import rangeColordata from './../data/rangecolors.js'; 
// import mapping from './../data/animeStatsDataList';

const scrollContainerStyle = {maxHeight: "1443px", overflowX: "hidden"};
const piechartLabels = ["Watching", "Dropped","Completed", "On Hold", "Plan to watch"]

const AnimeStats = () => {

  const [labelID, setlabelID] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  function AnimeDescriptionDataID(){
    var index = posts.findIndex(function(item, i){
      return item.label === labelID
    });

    if(index === -1){return 0}
    else{return index}
  }

  function piechartdataID(){
    var index = posts.findIndex(function(item, i){
      return item.label === labelID
    });

    if(index === -1){return 0}
    else{return index}
  }

  var descriptionindexID= AnimeDescriptionDataID();
  var piechartindexID= piechartdataID();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  var pieData = posts[piechartindexID];

  return(
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Anime Stats" subtitle="Anime Stats Overview" className="text-sm-left mb-3" />
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
              {posts.map((stats) => (
                <Col className="col-lg" key={stats._id} {...stats.attrs}>
                  <AnimeStatsTrendList
                    id={`small-stats-${stats._id}`}
                    variation="1"
                    chartData={stats.datasets}
                    chartLabels={stats.chartLabels}
                    label={stats.label}
                    value={stats.value}
                    percentage={stats.percentage}
                    increase={stats.increase}
                    decrease={stats.decrease}
                    backgroundImage={stats.backgroundImage}
                    changeData={() => 
                      setlabelID(stats.label)
                    }
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
            <TimeSeriesChart/>
          </Col>
          <Col lg="4" md="12" sm="12" className="mb-4">
            <AnimeDescription data={posts[descriptionindexID]}/>
          </Col>
        </Row>
        
        <Row >
          <Col lg="8" md="12" sm="12" className="mb-4">
          <Card>
              <CardHeader className="border-bottom mb-4">
                <h3 className="m-0">{"Ratings Table"}</h3>
              </CardHeader>
              <CardBody style={{padding: "0px 10px 10px 10px"}} >
                <TopAnimeTrendsTable tabdata={posts}/>
              </CardBody>
              <CardFooter className="border-top">
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="12" sm="12" className="mb-4">
            {(typeof pieData !=='undefined')? 
                  <UsersByDevice 
                    title={"Categories Analysis - " +pieData.label}
                    data={pieData.pieChartdata}
                    labels={piechartLabels}
                    backgroundColor={rangeColordata}
                  />:
                  <div>{"No Data"}</div>  }
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
};

export default AnimeStats;