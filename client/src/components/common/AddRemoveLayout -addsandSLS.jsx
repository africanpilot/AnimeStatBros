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
import Select from 'react-select';
// import '../../../node_modules/react-select/dist/react-select.css';

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
const originalLayouts = getFromLS("layouts") || [];
console.log(originalLayouts);
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
      items: originalLayouts.map(function(i, key, list) {
          return {
              i: originalLayouts[key].i,
              x: originalLayouts[key].x,
              y: originalLayouts[key].y,
              w: originalLayouts[key].w,
              h: originalLayouts[key].h,
              widget: originalLayouts[key].widget,
              minW: originalLayouts[key].minW,
              minH: originalLayouts[key].minH,
              maxH: originalLayouts[key].maxH
          };
      }),
      selectedOption: '',
      newCounter: originalLayouts.length
    };
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakPointChange = this.onBreakPointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onLayoutReset = this.onLayoutReset.bind(this);
  }

createElement(el) {
  const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
  };
  const i = el.i;
  const widget = el.widget;

  return (
      <div key={i} data-grid={el}>
          {(() => {
              switch(widget) {
                  case 'Clock':
                      return <TopAnimeTrends/>;
                  case 'Photo':
                      return <TimeSeriesChart/>;
                  case 'Weather':
                      return <UsersByDevice/>;
                  default:
                      return <span>{widget}</span>;
              }
          })()}
          <span
              className='remove'
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)} >
              x
          </span>
      </div>
  );
}

onAddItem() {
  var selection = this.state.selectedOption ? this.state.selectedOption : 0;
  var widgetProps = returnProps(selection.value);

  if(selection) {
      console.log('adding', 'n' + this.state.newCounter + '; ' + selection.value);
  } else {
      console.log('adding', 'n' + this.state.newCounter + '; empty');
  }

  this.setState({
      items: this.state.items.concat({
          i: 'n' + this.state.newCounter,
          x: (this.state.items.length * 2) % (this.state.cols || 12),
          y: Infinity,
          w: widgetProps.w,
          h: widgetProps.h,
          widget: selection ? selection.value : '',
          minW: widgetProps.minW,
          minH: widgetProps.minH,
          maxH: widgetProps.maxH,
      }),
      newCounter: this.state.newCounter + 1,
  });
}

onLayoutReset() {
  localStorage.clear();
  window.location.reload();
}

/* Calls back with breakpoint and new # cols */
onBreakPointChange(breakpoint, cols) {
  this.setState({
      breakpoint: breakpoint,
      cols: cols
  });
}

onLayoutChange(layout) {
  this.setState({ layout: layout });
  for (var i = 0; i < this.state.items.length; i++) {
      layout[i].widget = this.state.items[i].widget;
  }
  saveToLS('layouts', layout);
}

onRemoveItem(i) {
  this.setState({ items: _.reject(this.state.items, {i: i }) });
}

/* handleChange passes the selected dropdown item to the state. */
handleChange = (selectedOption) => {
  this.setState({ selectedOption });
  if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
  }
};

  render() {
    const { selectedOption } = this.state;

    return (
      <div>
          <div className='widgetselecter'>
              <Select className='dropdown'
                      name="form-field-name"
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={[
                          { value: 'one', label: 'One' },
                          { value: 'Clock', label: 'Clock' },
                          { value: 'Photo', label: 'Photo' },
                          { value: 'Weather', label: 'Weather' },
                      ]}
              />
              <button className='addButton' onClick={this.onAddItem}>Add Item</button>
              <button className='reset' onClick={this.onLayoutReset}>Reset Layout</button>
              <span className='title'>/Dash</span>
          </div>
          <ResponsiveReactGridLayout
              {...this.props}
              onLayoutChange={this.onLayoutChange}
              onBreakPointChange={this.onBreakPointChange}>
              {_.map(this.state.items, el => this.createElement(el))}
          </ResponsiveReactGridLayout>
      </div>
    );
  }
}

/* Retrieve layout from local storage. */
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

/* Save layout to local storage. */
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

/* returnProps function returns widget-specific properties like width, min width,
* heigth, etc.
*/
function returnProps(selection) {
  switch(selection) {
      case 'Clock':
          return {
              w: 1.5,
              h: 1,
              minW: 1.5,
              minH: 1,
              maxH: 1000
          };
      case 'Weather':
          return {
              w: 3,
              h: 3,
              minW: 3,
              minH: 3,
              maxH: 3
          };
      default:
          return {
              w: 2,
              h: 2,
              minW: 1,
              minH: 1,
              maxH: 1000,
          };
  }
}