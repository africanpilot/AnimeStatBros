import React, { Component} from 'react';
import { Dropdown } from 'react-bootstrap';
import {Card, CardHeader, CardBody,} from "shards-react";
import { Multiselect } from 'multiselect-react-dropdown';

//Charts
import TimeSeriesChart from "./TimeSeriesChart";

//data
import mapping from '../../data/data.json';
import rangeColordata from '../../data/rangecolors.js';
import seasondata from '../../data/season.json';

export default class TimeSeriesChartView extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  data: props.data,
                  seasondata: props.seasondata,
                  rangeColors: props.rangeColors,
                  exclude: props.exclude, 
                  include: props.include, 
                  categories: props.include,
                  options: props.options,
                  selectedValues: props.selectedValues,
                  title: props.title,
                  id: props.id,         
    }  

    // Binding this keyword 
    this.onSelect = this.onSelect.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.categoriestoOptions = this.categoriestoOptions.bind(this) 
    this.categoriestoSelected = this.categoriestoSelected.bind(this) 
    this.changeToRating = this.changeToRating.bind(this)
    this.changeToComments = this.changeToComments.bind(this)
  }

  componentDidMount() {
    const { data,exclude,include} = this.state;
    this.categoriestoOptions(data,exclude);
    this.categoriestoSelected(data,include);
  };

  onSelect(selectedList, selectedItem) {
    var getList = selectedList.map(item => (item.name));
    this.setState({categories: getList});
    this.componentDidUpdate();
  }

  onRemove(selectedList, removedItem) {
    var getList = selectedList.map(item => (item.name));
    this.setState({categories: getList});
    this.componentDidUpdate();
  }

  categoriestoOptions(data,exclude){
    var datacols = Object.keys(data[0]).filter(function(key) {
        if(exclude.includes(key)){return "";}
        else{return key;} 
    })
    var convertOptions = datacols.map(function(category,i) {
        return {
            name: category,
            id: i
        };
    });
    this.setState({ options: convertOptions});
  };

  categoriestoSelected(data,include){
    var datacols = Object.keys(data[0]).filter(function(key) {
        if(include.includes(key)){return key;}
        else{return "";} 
    })
    var convertSelected = datacols.map(function(category,i) {
      return {
          name: category,
          id: i
      };
    });
    this.setState({categories : datacols, selectedValues: convertSelected});
  };

  changeToRating(){ 
    this.setState({
                    data: Ratings,
                    seasondata: seasondata,
                    rangeColors: rangeColordata,
                    exclude: excludeList, 
                    include: includeList, 
                    title: "Time Series Analysis - Ratings",
                    id: 0,
                  }) 
                console.log("log1", this.state.include);
  }
  changeToComments(){ 
    this.setState({
                    data: Comments,
                    seasondata: seasondata,
                    rangeColors: rangeColordata,
                    exclude: excludeList, 
                    include: includeList2, 
                    title: "Time Series Analysis - Comments",
                    id: 1,
                  })
                  console.log("log2", this.state.include);  
  }

  render() {
    const { rangeColors,options, selectedValues,title } = this.state; 
    return (
      <Card lg="12" md="12" sm="12" className="mb-4">
        <CardHeader className="border-bottom">
          <h3 className="m-0">{title}
            <Dropdown style={{ float: 'right' }}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {"Analysis Type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.changeToRating}>{"Ratings"}</Dropdown.Item>
                <Dropdown.Item onClick={this.changeToComments}>{"Comments"}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </h3>
        </CardHeader>
        <CardBody>
          <Multiselect 
          options={options} // Options to display in the dropdown
          selectedValues={selectedValues} // Preselected value to persist in dropdown
          onSelect={this.onSelect} // Function will trigger on select event
          onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          showCheckbox={true}
          rangeColors={rangeColors}
          />
          <TimeSeriesChart
          data={dataList[id].data}
          seasondata={seasondata}
          rangeColors={rangeColordata}
          exclude={mapping[id].exclude} 
          include={mapping[id].include}
          />
        </CardBody>
      </Card>
    );
  }
};
