import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "shards-react";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BuildIcon from '@material-ui/icons/Build';

const UserDetails = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span>{"Last Update: 02 January, 2021"} </span>
    </CardHeader>
    <ListGroup flush style={{alignItems: "center"}}>
      <ListGroupItem className="p-2">
        <DashboardIcon style={{ fontSize: 50, color: "#0074d9", paddingRight: 20 }}/>
        <span>{userDetails.comments}</span>
      </ListGroupItem>
      <ListGroupItem className="p-2">
        <BuildIcon style={{ fontSize: 50, color: "#0074d9", paddingRight: 20 }}/>
        <span>{userDetails.comments}</span>
      </ListGroupItem>
      <ListGroupItem className="p-2">
        <ChatBubbleOutlineIcon style={{ fontSize: 50, color: "#0074d9", paddingRight: 20 }}/>
        <span>{userDetails.comments}</span>
      </ListGroupItem>
      <ListGroupItem className="p-2">
        <ReplyOutlinedIcon style={{ fontSize: 50, color: "#0074d9", paddingRight: 20 }}/>
        <span>{userDetails.comments}</span>
      </ListGroupItem>
      <ListGroupItem className="p-2">
        <ShareOutlinedIcon style={{ fontSize: 50, color: "#0074d9", paddingRight: 20 }}/>
        <span>{userDetails.comments}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Richard",
    avatar: require("./../../images/avatars/me.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    comments: 74,
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
