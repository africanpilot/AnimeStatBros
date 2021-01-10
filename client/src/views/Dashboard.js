import React from "react";
import { Container, Col, Row} from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import AddRemoveLayout from './../components/common/AddRemoveLayout.jsx'

const Dashboard = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Dashboard" subtitle="Dashboard Overview" className="text-sm-left mb-3" />
    </Row>
    <Row>
      <Col xl={25} lg={12} md={12}>
        <AddRemoveLayout/>
      </Col>
    </Row>
  </Container>
);

export default Dashboard;



