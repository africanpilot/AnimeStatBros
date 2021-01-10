import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "./test-hook.jsx"
import _ from "lodash";
import {Row,Col,InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect} from "shards-react";
import { Dropdown } from 'react-bootstrap';
import MenuDataAnalysisBuild from '../../components/common/MenuDataAnalysisBuild';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import SaveIcon from '@material-ui/icons/Save';

//charts
import TopAnimeTrends from "../../components/blog/TopAnimeTrends"
import UsersByDevice from "../../components/blog/UsersByDevice";
import AnimeDescription from "../../components/blog/AnimeDescription";
import CommentSection from "../../components/blog/CommentSection";
import TimeSeriesChart from "../../components/blog/TimeSeriesChart";

//data
import AnimeDescriptionData from '../../data/animeDescriptions.json'; 
import CommentsData from "../../data/comments.json";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

export default class AddRemoveLayout extends React.PureComponent {
  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 100,
      autoSize: true,
    };
  }
  
  constructor(props) {
    super(props);

    this.state = {
      items: [].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1)
        };
      }),
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      newCounter: 0,
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        <span
          className="remove"
          style={removeStyle}
        >
          <MenuDataAnalysisBuild deleteButton = {this.onRemoveItem.bind(this, i)}/>
        </span>
        <br/>
        <br/>
        <span>
          <TimeSeriesChart/>
        </span>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "item " + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 100 % (this.state.cols || 12),
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

   // We're using the cols coming back from this to calculate where to add new items.
   onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <Row>
          <Col> 
            <InputGroup className="mb-3">
              <InputGroupAddon type="prepend">
                <InputGroupText>DashBoards</InputGroupText>
              </InputGroupAddon>
              <FormSelect>
                <option>Defualt Dashboard</option>
                <option>Dashboard 1</option>
                <option>Dashboard 2</option>
                <option>Dashboard 3</option>
                <option>Dashboard 4</option>
              </FormSelect>
            </InputGroup>
          </Col>
          <Col>
            <AddCircleIcon style={{ fontSize: 30 }} color="primary" onClick={this.onAddItem}/>
            <RestoreOutlinedIcon color="primary" style={{ fontSize: 30 }} onClick={() => this.resetLayout()}/>
            <SaveIcon style={{ fontSize: 30 }} color="primary"/>
          </Col>
        </Row>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}