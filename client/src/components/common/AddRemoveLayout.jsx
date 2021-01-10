import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "./test-hook.jsx"
import _ from "lodash";
import {Row,Col,Button} from "shards-react";
import MenuDataAnalysisBuild from '../../components/common/MenuDataAnalysisBuild';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import SaveIcon from '@material-ui/icons/Save';
import Select from 'react-select';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BuildIcon from '@material-ui/icons/Build';
import {Segment,Sidebar,
} from 'semantic-ui-react'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import TextField from '@material-ui/core/TextField';

//charts
import TopAnimeTrends from "../../components/blog/TopAnimeTrends"
import UsersByDevice from "../../components/blog/UsersByDevice";
import AnimeDescription from "../../components/blog/AnimeDescription";
import CommentSection from "../../components/blog/CommentSection";
import TimeSeriesChart from "../../components/blog/TimeSeriesChart";

//data
import AnimeDescriptionData from '../../data/animeDescriptions.json'; 
import CommentsData from "../../data/comments.json";
import piechartdata from '../../data/pieChart.json';
import rangeColordata from '../../data/rangecolors.js'; 

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || [];
const piechartLabels = ["Watching", "Dropped","Completed", "On Hold", "Plan to watch"]

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
      newCounter: originalLayouts.length,
      selectedDashboard: '',
      visible: false,
      selectedTemplete: '',
    };
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakPointChange = this.onBreakPointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onLayoutReset = this.onLayoutReset.bind(this);
  }

createElement(el) {
  const removeStyle = {
      position: 'absolute',
      right: 0,
      top: 0,
      cursor: 'pointer',
  };
  const i = el.i;
  const widget = el.widget;

  return (
    
      <div key={i} data-grid={el} 
      style={{backgroundColor:"Transparent",
      borderRadius: "15px 15px 5px 5px",
      border: "1px solid #0074d9",
      
      }}>
        <div style={{backgroundColor:"#0074d9",
                    borderRadius: "15px 15px 0px 0px",
                    border: "1px solid #0074d9"
        }}>
        <div className='remove'style={removeStyle}>
          <MenuDataAnalysisBuild 
          deleteButton = {this.onRemoveItem.bind(this, i)}
          />
        </div>
          <br/>
          <br/>
        </div>
          {(() => {
              switch(widget) {
                  case 'TopAnimeTrends':
                      return <TopAnimeTrends/>;
                  case 'TimeSeriesChart':
                      return <TimeSeriesChart h={375} />;
                  case 'PieChart':
                      return <UsersByDevice 
                              title={"Categories Analysis - " +piechartdata[0].title}
                              data={piechartdata[0].data}
                              labels={piechartLabels}
                              backgroundColor={rangeColordata}
                              canvasHeight={240}
                    />;
                  case 'AnimeDescription':
                      return <AnimeDescription 
                              data={AnimeDescriptionData} 
                              id={0}
                              />;
                  case 'CommentSection':
                      return <CommentSection
                              title={"Comments"} 
                              comments={CommentsData}/>;
                  default:
                      return <span>{widget}</span>;
              }
          })()}
          
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
handleChange = (selectedOption,selectedDashboard) => {
  this.setState({ selectedOption,selectedDashboard });
  if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
  }
};

  render() {
    const { selectedOption,selectedDashboard } = this.state;
    
    return (
      <div>
        <Row>
          <div style={{ paddingLeft: 25}} >
            <DashboardIcon style={{ fontSize: 35, color: "#0074d9"}} />
          </div>
          <Col className='widgetselecter0'> 
              <Select className='dropdown'
                      name="form-field-name"
                      value={selectedDashboard}
                      options={[
                          { value: 'DefualtDashboard', label: 'Defualt Dashboard' },
                          { value: 'MyDashboard', label: 'My Dashboard' },
                      ]}
              />
          </Col>
         
          <BuildIcon style={{ fontSize: 30, color: "#0074d9" }} />
          <Col className='widgetselecter1'> 
            <Select className='dropdown'
                    name="form-field-name"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={[
                        { value: 'ValueCard', label: 'ValueCard' },
                        { value: 'TopAnimeTrends', label: 'TopAnimeTrends' },
                        { value: 'TimeSeriesChart', label: 'TimeSeriesChart' },
                        { value: 'PieChart', label: 'PieChart' },
                        { value: 'AnimeDescription', label: 'AnimeDescription' },
                        { value: 'CommentSection', label: 'CommentSection' },
                    ]}
            />
          </Col>
          <Col>
            <AddCircleIcon style={{ fontSize: 30, color: "#0074d9" }} onClick={this.onAddItem}/>
            <RestoreOutlinedIcon style={{ fontSize: 30, color: "#0074d9" }} onClick={this.onLayoutReset}/>
            <SaveIcon style={{ fontSize: 30, color: "#0074d9" }} />
            <MenuOpenIcon style={{ fontSize: 40, float: 'right',paddingRight: 10, color: "#0074d9" }}  onClick={() => this.setState({visible: !this.state.visible})} />
          </Col>
        </Row>

        <Col className="mb-4">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation='push'
            icon='labeled'
            inverted ='true'
            onHide={() => this.setState({visible:false})}
            vertical ='true'
            visible={this.state.visible}
            width='wide'
            direction='right'
          >
            <br/>
            <h3 style={{textAlign: "center"}} >{"Configure Dashboard"}</h3>
            <br/>
            <br/> 
            <Row>
              <div style={{ paddingLeft: 15}} >
                <DashboardIcon style={{ fontSize: 40,paddingLeft: 10, color: "#0074d9" }}/>
              </div>
            <Col className='widgetselecter0 mb-4'> 
              <Select className='dropdown'
                      name="form-field-name"
                      value={selectedDashboard}
                      options={[
                          { value: 'DefualtDashboard', label: 'Defualt Dashboard' },
                          { value: 'MyDashboard', label: 'My Dashboard' },
                      ]}
              />
          </Col>
          </Row>
          <br/>
          
          <Row >
            <div style={{ paddingLeft: 15}} >
              <BuildIcon style={{ fontSize: 40, paddingLeft: 10, color: "#0074d9" }}/> 
            </div>
          <Col className='widgetselecter1 mb-4'>
            <Select className='dropdown'
                    name="form-field-name"
                    value={selectedOption}
                    options={[
                        { value: 'ValueCard', label: 'ValueCard' },
                        { value: 'TopAnimeTrends', label: 'TopAnimeTrends' },
                        { value: 'TimeSeriesChart', label: 'TimeSeriesChart' },
                        { value: 'PieChart', label: 'PieChart' },
                        { value: 'AnimeDescription', label: 'AnimeDescription' },
                        { value: 'CommentSection', label: 'CommentSection' },
                    ]}
            />
          </Col>
          </Row>
          <br/>
            <br/> 
          <Row>
            <Col className="mb-4">
              <div>
                <h4 style={{textAlign:"center"}}>{"Options"}</h4>
                <br/>
                <h6 style={{textAlign:"left",paddingLeft:10}}>{"Templete Position"}</h6>
                <form style={{display: "flex",alignItems: "center"}}  noValidate autoComplete="off">
                <TextField style={{paddingLeft:10 }} id="svc-xPosition" label="XPosition" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="0" />
                <TextField style={{paddingLeft:10 }} id="svc-yPosition" label="YPosition" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="6" />
                <TextField style={{paddingLeft:10 }} id="svc-height" label="height" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="3" />
                <TextField style={{paddingLeft:10 }} id="svc-width" label="width" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="4" />   
              </form>
              <br/>
              <br/>
                <h6 style={{textAlign:"left",paddingLeft:10}}>{"Template Config"}</h6>
                <form style={{display: "flex", alignItems: "center" }}  noValidate autoComplete="off">
                <TextField style={{paddingLeft:10 }} id="svc-xPosition" label="XPosition" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="0" />
                <TextField style={{paddingLeft:10 }} id="svc-yPosition" label="YPosition" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="6" />
                <TextField style={{paddingLeft:10 }} id="svc-height" label="height" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="3" />
                <TextField style={{paddingLeft:10 }} id="svc-width" label="width" type="number" variant="outlined" InputLabelProps={{shrink: true}} defaultValue="4" />   
              </form>
              </div>
            </Col>
          </Row>
            <br/>
            <br/>           
          <Row>
            <Col>
            <div style={{paddingLeft:10}} >
            <Button>{"Save"}</Button>
            </div>
            </Col>
          </Row>               

          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible}>
              <ResponsiveReactGridLayout style={{backgroundColor:"Transparent"}}
              {...this.props}
              onLayoutChange={this.onLayoutChange}
              onBreakPointChange={this.onBreakPointChange}>
              {_.map(this.state.items, el => this.createElement(el))}
              </ResponsiveReactGridLayout>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Col>
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
    case 'ValueCard':
            return {
                w: 1,
                h: 1,
                minW: 1,
                minH: 1,
                maxH: 1000
            };
      case 'TopAnimeTrends':
          return {
              w: 6,
              h: 5,
              minW: 1.5,
              minH: 1,
              maxH: 1000
          };
      case 'TimeSeriesChart':
          return {
              w: 6,
              h: 5,
              minW: 1.5,
              minH: 1,
              maxH: 1000
          };
      case 'PieChart':
          return {
              w: 3,
              h: 4,
              minW: 1.3,
              minH: 1,
              maxH: 1000
          };
      case 'AnimeDescription':
            return {
                w: 3,
                h: 4,
                minW: 1.3,
                minH: 1,
                maxH: 1000
            };
      case 'CommentSection':
              return {
                  w: 3,
                  h: 4,
                  minW: 1.3,
                  minH: 1,
                  maxH: 1000
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