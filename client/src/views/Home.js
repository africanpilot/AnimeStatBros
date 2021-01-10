import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col,CardHeader,CardBody} from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import CommentSection from "./../components/blog/CommentSection";
import IndustryNews from "./../components/blog/IndustryNews";
import TopAnimeTrends from "./../components/blog/TopAnimeTrends";
import {ArrowRight, ArrowLeft} from '@material-ui/icons';
import CommentsData from "./../data/comments.json";

const Home = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Home" subtitle="Home Dashboard" className="text-sm-left mb-3" />
    </Row>

    <Row>
      <Col lg="8" md="12" sm="12" className="col-lg mb-4">
        <TopAnimeTrends/>
      </Col>
      <Col lg="4" md="12" sm="12" className="col-lg mb-4">
        <div small="true" className="blog-comments">
          <CardHeader className="border-bottom">
            <h3 className="m-0"> {"Industry Overview"}
            <ArrowRight style={{float: 'right'}} />
            <ArrowLeft style={{float: 'right'}} />
            </h3>  
          </CardHeader>
            <br/>
            <Row>
              {smallStats.map((stats, idx) => (
                <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                  <SmallStats
                    id={`small-stats-${idx}`}
                    variation="1"
                    chartData={stats.datasets}
                    chartLabels={stats.chartLabels}
                    label={stats.label}
                    value={stats.value}
                    percentage={stats.percentage}
                    increase={stats.increase}
                    decrease={stats.decrease}
                  />
                </Col>
              ))}
            </Row>
        </div>
      </Col>
    </Row>
 
    <Row className="mb-4">
      <Col lg="8" md="12" sm="12" className="mb-4" >
        <CardHeader style={{height: "80px"}} className="border-bottom">
        <h3 className="m-0">
          {"Industry News"}
          <ArrowRight style={{float: 'right'}} />
          <ArrowLeft style={{float: 'right'}} />
        </h3>
        </CardHeader>
          <CardBody>
          <Row>
            <IndustryNews/>
          </Row>
          <Row>
            <IndustryNews/>
          </Row>
        </CardBody>
      </Col>

      {/* Discussions */}
        <Col className="mb-4">
        <CommentSection
          title={"Comments"} 
          comments={CommentsData}
        />
        </Col>
    </Row>

  </Container>
);

Home.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Home.defaultProps = {
  smallStats: [
    {
      label: "Anime Stocks",
      value: "$75.73",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "12" ,md: "12", sm: "12" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Fall 2020 Rating",
      value: "7.9",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "12" ,md: "12", sm: "12" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Year 2020 Rating",
      value: "8.7",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "12" ,md: "12", sm: "12" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    }
  ]
};

export default Home;
