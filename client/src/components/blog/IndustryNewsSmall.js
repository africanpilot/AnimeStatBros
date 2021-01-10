/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody
} from "shards-react";

const IndustryNewsSmall = ({ title, discussions }) => (
  <Row>
    {discussions.map((post, idx) => (
      <Col lg="12" sm="12" className="mb-4" key={idx}>
        <Card small className="card-post card-post--aside card-post--1">
          <div
            className="card-post__image"
            style={{ backgroundImage: `url('${post.backgroundImage}')` }}
          >
          </div>
          <CardBody>
            <h5 className="card-title">
              <a className="text-fiord-blue" href="#">
                {post.title}
              </a>
            </h5>
            <span className="text-muted">{post.date}</span><div/>
            <a style={{float: 'right'}} href={post.readmorelink}>Read Full News </a>
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
);

IndustryNewsSmall.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  post: PropTypes.array
};


// Second list of posts.
IndustryNewsSmall.defaultProps = {
  title: "Discussions",
  discussions: [
    {
      backgroundImage: require("../../images/content-management/news.jpg"),
      category: "Industry News",
      categoryTheme: "dark",
      author: "John James",
      authorAvatar: require("../../images/avatars/1.jpg"),
      title:
        "Totally words widow one downs few age every seven if miss part by fact",
      body:
        "Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...",
      date: "29 February 2019",
      readmorelink:"#",
    }
  ]
}

export default IndustryNewsSmall;