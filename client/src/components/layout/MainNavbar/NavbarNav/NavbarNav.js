import React from "react";
import { Nav} from "shards-react";
import UserActions from "./UserActions";
import TwitterIcon from '@material-ui/icons/Twitter';

export default () => (
  <Nav navbar className="border-left flex-row">
    <UserActions />
    <TwitterIcon style={{color: "#0074d9", paddingTop: 15, fontSize:35 }}/>
  </Nav>
);
