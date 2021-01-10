import React, { Component  } from 'react';
import { Dropdown } from 'react-bootstrap';
import {Card, CardHeader, CardBody,
} from "shards-react";
import '../../assets/timeseries4.css';
import { Multiselect } from 'multiselect-react-dropdown';
import drawTimeSeriesChart from "../../components/blog/TimeSeriesVis";

//data defaults
import mapping from '../../data/animeStatsDataList';
import rangeColordata from '../../data/rangecolors.js';
import seasondata from '../../data/season.json';

const lablesList = mapping.map(item => item.lable);
const dataList = mapping.map(item => item.data);
const excludeList = mapping.map(item => item.exclude);
const includeList = mapping.map(item => item.include);
const titleList = mapping.map(item => item.title);

class TimeSeriesChart extends Component {
    constructor(props){ 
        super(props) 
          
        // Set initial state 
        this.state = {  
            mapping: props.mapping,
            data: props.data,
            seasondata: props.seasondata,
            rangeColors: props.rangeColors, 
            exclude: props.exclude,
            include: props.include,
            categories: props.include,
            options: props.options,
            selectedValues: props.selectedValues,
            w: props.w,
            h: props.h,
            m1T: props.m1T,
            m1R: props.m1R,
            m1B: props.m1B,
            m1L: props.m1L,
            m2T: props.m2T,
            m2R: props.m2R,
            m2B: props.m2B,
            m2L: props.m2L,
            dateParse: props.dateParse,
            dateFormat: props.dateFormat,
            title: props.title,
            id: props.id,
        };

        // Binding this keyword 
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.categoriestoOptions = this.categoriestoOptions.bind(this) 
        this.categoriestoSelected = this.categoriestoSelected.bind(this)
    }
 
    componentDidMount() {
        const { data,exclude,include} = this.state;
        this.categoriestoOptions(data,exclude);
        this.categoriestoSelected(data,include);
        drawTimeSeriesChart(this.state);
    };

    componentDidUpdate(prevProps, prevState) {
      if(prevState.id !== this.state.id){
        const { data,exclude,include} = this.state;
        this.categoriestoOptions(data,exclude);
        this.categoriestoSelected(data,include);
      }
        drawTimeSeriesChart(this.state)
    }

    onSelect(selectedList, selectedItem) {
        var getList = selectedList.map(item => (item.name));
        this.setState({categories: getList});
    }
    
    onRemove(selectedList, removedItem) {
        var getList = selectedList.map(item => (item.name));
        this.setState({categories: getList});
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


    render() {
        const { rangeColors,options, selectedValues,id} = this.state;

        return(
          <Card lg="12" md="12" sm="12" className="mb-4">
            <CardHeader className="border-bottom">
              <h3 className="m-0">{titleList[id]}
                <Dropdown style={{ float: 'right' }}>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {"Analysis Type"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  {lablesList.map((item,i) => 
                  <Dropdown.Item key={item}
                  onClick={(e) => this.setState({
                    data: dataList[i],
                    exclude: excludeList[i], 
                    include: includeList[i], 
                    title: titleList[i],
                    id: i,
                  })}
                  >
                    {item}
                    </Dropdown.Item>)}
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
                <div className='vis-timeseries'/>
            </CardBody>
          </Card>
        );
    };
};


export default TimeSeriesChart;


TimeSeriesChart.defaultProps = {
    data: dataList[0],
    include: includeList[0],
    exclude: excludeList[0],
    seasondata: seasondata,
    rangeColors: rangeColordata,
    w: 800,
    h: 400,
    m1T: 13,
    m1R: 13,
    m1B: 105,
    m1L: 35,
    m2T: 330,
    m2R: 13,
    m2B: 17,
    m2L: 35,
    dateParse: "%Y-%m-%d %H:%M:%S",
    dateFormat: "%Y-%m-%d %H:%M:%S",
    id: 0,
};