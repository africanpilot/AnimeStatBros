/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
// import PropTypes from "prop-types";
import {Row, Col, Card, CardBody,} from "shards-react";

const AnimeDescription = ({ data }) => (
  <Row>
      <Col lg="12" md="12" sm="12" className="mb-4">
        <Card small={true} className="card-post card-post--1">
          <div
            className="card-post__image"
            style={{ height:"225px" 
            ,backgroundImage: `url(${data.backgroundImage})` 
          }}
          >
          </div>
            <CardBody>
            <h5 className="card-title">
              <a href="#" className="text-fiord-blue">
                {data.label}
              </a>
            </h5>
            <a className="card-text">Rating: {data.rating}</a><div/>
            <a className="card-text">Comments: {data.comments}</a><div/>
            <span className="text-muted">Update: {data.date}</span><div/>
            <br/>
            <a className="card-text">Genre: {data.genre} </a><div/>
            <a className="card-text">Episodes: {data.episodes} </a><div/>
            <a className="card-text">Studios: {data.studios}</a><div/>
            <br/>
            <p className="card-text">{data.body}</p>
            </CardBody>
        </Card>
      </Col>
  </Row>
);

// AnimeDescription.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object),
// };

AnimeDescription.defaultProps = {
  data: [],
}

export default AnimeDescription;