/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { Comment} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "shards-react";
import SearchBar from "material-ui-search-bar";

const CommentSection = ({title, comments}) => ( 

  <Card className="blog-comments">
  <CardHeader className="border-bottom">
    <h3 className="m-0">
      {title}
      <SearchBar style={{ float: 'right' }}/>
    </h3>
  </CardHeader>
  <CardBody className="p-2">
    {comments.map((comment, idx) => (
    <div key={idx} className="p-3">
    <Comment.Group minimal>
      <Comment>

        <Comment.Avatar as='a' src={comment.image} />
        <Comment.Content>
          <Comment.Author as='a'>{comment.name} </Comment.Author>
          <Comment.Metadata>
            <span>{comment.date}</span>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <a style={{color: "blue"}}>Like</a>
            <a style={{color: "blue"}}>Reply</a>
            <a style={{color: "blue"}}>Share</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
    </div>
    ))}
  </CardBody>
  <CardFooter className="border-top">
  </CardFooter>
  </Card>
);

CommentSection.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  CommentSection: PropTypes.array
};

CommentSection.defaultProps = {
  title: "Comments",
  comments: []
};

export default CommentSection;