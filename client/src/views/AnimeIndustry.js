import React from "react";
import {
  Container,
  Row,
  Col,
  Card, 
  CardBody,
  CardHeader,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import IndustryNewsFullArtical from "../components/blog/IndustryNewsFullArtical";
import IndustryNewsSmall from "../components/blog/IndustryNewsSmall";
import CommentSection from "./../components/blog/CommentSection";
import CommentsData from "./../data/comments.json";

const AnimeIndustry = () => (
  <div>
    <Container fluid className="px-0">
    </Container>
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Anime Industry"
          subtitle="Anime Industry Overview"
          className="text-sm-left"
        />
      </Row>

    <Row>
      <Col lg="8" md="12" sm="12" className="col-lg mb-4">
        <IndustryNewsFullArtical/>
      </Col>

      <Col lg="4" md="12" sm="12" className="col-lg mb-4">
      <Card>
          <CardHeader className="border-bottom">
            <h6 className="m-0"> Top Industry News</h6>
          </CardHeader>
          <CardBody>
            <IndustryNewsSmall/>
            <IndustryNewsSmall/>
            <IndustryNewsSmall/>
            <IndustryNewsSmall/>
            <IndustryNewsSmall/>
            <IndustryNewsSmall/>
          </CardBody>
        </Card>
      </Col>
    </Row>

    <Row >
      <Col lg="12" md="12" sm="12" className="mb-4">
        <CommentSection
          title={"Comments"} 
          comments={CommentsData}
        />
      </Col>
    </Row>

    </Container>
  </div>
);

export default AnimeIndustry;
