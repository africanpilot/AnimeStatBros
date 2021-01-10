/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody
} from "shards-react";

const IndustryNews = ({ title, discussions }) => (
  <Row>
    {discussions.map((post, idx) => (
      <Col className="mb-4" key={idx}>
        <Card small className="card-post card-post--aside card-post--1">
          <div
            className="card-post__image"
            style={{backgroundImage: `url('${post.backgroundImage}')` }}
          >
          </div>
          <CardBody>
            <h3 className="card-title">
              <a className="text-fiord-blue" href={post.readmorelink}>
                {post.title}
              </a>
            </h3>
            <p className="card-text d-inline-block mb-3">{post.body}</p>
            <span className="text-muted">By {post.author} - {post.date}</span><div/>
            <a style={{float: 'right'}} href={post.readmorelink}>Read Full News </a>
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
);

IndustryNews.propTypes = {
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
IndustryNews.defaultProps = {
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
        `Discovered had get considered projection who favourable. 
        Necessary up knowledge it tolerably. Unwilling departure education to 
        admitted speaking Discovered had get considered projection who favourable. 
        Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking.
        Discovered had get considered projection who favourable. 
        Necessary up knowledge it tolerably. Unwilling departure education to 
        `,
      date: "29 February 2019",
      readmorelink:"/anime-industry",
    }
  ]
}

export default IndustryNews;