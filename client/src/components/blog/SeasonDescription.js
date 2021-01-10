/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import PropTypes from "prop-types";
import {Row, Col, Card, CardBody,} from "shards-react";

const SeasonDescription = ({ data }) => (
  <Row>
    {data.map((post, idx) => (
      <Col lg="12" md="12" sm="12" className="mb-4" key={idx}>
        <Card small={true} className="card-post card-post--1">
          <div
            className="card-post__image"
            style={{ height:"207px" ,backgroundImage: `url(${post.backgroundImage})` }}
          >
          </div>
            <CardBody>
                <h5 className="card-title">
                  <a href="#" className="text-fiord-blue">
                    {post.title}
                  </a>
                </h5>
                <div/>
                <a className="card-text">Rating: {post.rating}</a><div/>
                <a className="card-text">Comments: {post.comments}</a><div/>
                <span className="text-muted ">Start: {post.start}</span><div/>
                <span className="text-muted ">End: {post.end}</span><div/>
                <br/>
                <a className="card-text">Anime: {post.anime} </a><div/>
                <a className="card-text">Episodes: {post.episodes} </a><div/>
                <a className="card-text">Studios: {post.studios}</a><div/>
                <br/>
                <p className="card-text">Description: {post.body}</p>
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
);

SeasonDescription.propTypes = {
  data: PropTypes.array
};


// Second list of posts.
SeasonDescription.defaultProps = {
  data: [],
}

export default SeasonDescription;