import React, { Component  } from 'react';
import { Dropdown } from 'react-bootstrap';
import {Card, CardHeader, CardBody,
} from "shards-react";
import * as d3 from 'd3';
import '../../assets/timeseries4.css';
import { Multiselect } from 'multiselect-react-dropdown';

//data
import mapping from '../../data/data.json';
import Ratings from '../../data/climate4.json';
import Comments from '../../data/Comments1.json';
import rangeColordata from '../../data/rangecolors.js';
import seasondata from '../../data/season.json';

const dataList =
[
  {data : Ratings},
  {data : Comments}
]

class TimeSeriesChart extends Component {
    constructor(props){ 
        super(props) 
          
        // Set initial state 
        this.state = { 
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
        this.changeToRating = this.changeToRating.bind(this)
        this.changeToComments = this.changeToComments.bind(this)
    } 

    componentDidMount() {
        const { data,exclude,include} = this.state;
        this.categoriestoOptions(data,exclude);
        this.categoriestoSelected(data,include);
        this.drawChart();
    };

    componentDidUpdate(prevProps, prevState) {
        d3.selectAll("g.focus").remove().exit();
        d3.selectAll("g.context").remove().exit();
        d3.selectAll("circle").remove().exit();
        d3.selectAll("text.markerlinetext").remove().exit();
        d3.selectAll("text.markerlinetext2").remove().exit();

        if(prevState.id !== this.state.id){
          const { data,exclude,include} = this.state;
          this.categoriestoOptions(data,exclude);
          this.categoriestoSelected(data,include);
        }
        this.drawChart()
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

    changeToRating(){ 
      this.setState({
                      data: dataList[0].data,
                      seasondata: seasondata,
                      rangeColors: rangeColordata,
                      exclude: mapping[0].exclude, 
                      include: mapping[0].include, 
                      title: "Time Series Analysis - Ratings",
                      id: 0,
                    }) 
    }
    changeToComments(){ 
      this.setState({
                      data: dataList[1].data,
                      seasondata: seasondata,
                      rangeColors: rangeColordata,
                      exclude: mapping[1].exclude, 
                      include: mapping[1].include,  
                      title: "Time Series Analysis - Comments",
                      id: 1,
                    })
    }
    
    drawChart = () => {
        d3.select('.vis-timeseries > *').remove();
        const { data,seasondata,categories,rangeColors,dateParse,dateFormat
                ,w,h,m1T,m1R,m1B,m1L,m2T,m2R,m2B,m2L} = this.state;        
        var margin = {top: m1T, right: m1R, bottom: m1B, left: m1L},
            margin2 = {top: m2T, right: m2R, bottom: m2B, left: m2L},
            width = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom,
            height2 = h - margin2.top - margin2.bottom;

        const svg = d3.select('.vis-timeseries').append('svg')
            .attr("width",width+margin.left+margin.right)
            .attr("height",height+margin.top+margin.bottom)
            .call(responsivefy);

        var parseDate = d3.timeParse(dateParse);
        var color = d3.scaleOrdinal().range(rangeColors);
        var bisectDate = d3.bisector(function(d) {return parseDate(d.date);}).left;
        var formatDate = d3.timeFormat(dateFormat)
        
        var x = d3.scaleTime().range([0, width]),
            x2 = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            y2 = d3.scaleLinear().range([height2, 0]);

        var xAxis = d3.axisBottom(x),
            xAxis2 = d3.axisBottom(x2),
            yAxis = d3.axisLeft(y);
        
        var brush = d3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("brush end", brushed);

        var zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);
        
        var area = d3.area()
            .defined(function(d) { return !isNaN(d.temperature); })
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.temperature); });

        var area2 = d3.area()
            .defined(function(d) { return !isNaN(d.temperature); })
            .curve(d3.curveMonotoneX)
            .x(function(d) {return x2(d.date); })
            .y0(height)
            .y1(function(d) {return y2(d.temperature); });

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);
        
        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
         
        const tooltip = d3.select("body").append("div")
            .attr("class", "d3-tip")
            .style("position", "absolute")
            .style("visibility", "hidden");
        
        focus.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('opacity', 0)
            .on("mouseover", mouseOver)
            .on("mousemove",mouseMove)
            .on("mouseout",mouseOut);
            
        var productCategories = categories;

        color.domain(productCategories);

        // Filter the data to only include a single metric
        var subset = data.filter(function(el) {
            return el.metric === "Quantity";
        });

        var sources = productCategories.map(function(category) {
            return {
                name: category,
                values: subset.map(function(d) {
                return { date: parseDate(d.date), temperature: +d[category] };
                })
            };
        });

        x.domain(d3.extent(subset, function(d) { return parseDate(d.date); }));
        y.domain([d3.min(sources, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
                d3.max(sources, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); }) ]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        focus.selectAll("g")
            .data(sources)
            .enter().append("g")
            .append("path")
            .attr("class","area")
            .attr("d", function(d) { return area(d.values); })
            .style("fill", function(d) {return color(d.name);})
            .style("stroke", function(d) {return color(d.name);})
            .attr("clip-path", "url(#clip)")
            .on("mouseover", mouseOver)
            .on("mousemove",mouseMove)
            .on("mouseout",mouseOut);
           
        focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    
        focus.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        focus.append("line")
            .attr("class", "lineHover")
            .style("stroke", "#999")
            .attr("stroke-width", 1)
            .style("shape-rendering", "crispEdges");

        focus.selectAll(".hoverCircle")
			.data(categories)
            .enter()
            .append("circle")
			.attr("class", "hoverCircle")
            .style("fill", d =>color(d));
        
        var markerline = focus.selectAll(".seasonline")
                            .data(seasondata)
                            .enter();
                            
        markerline.append("line")
            .attr("class", "seasonline")
            .transition().duration(2000)
            .attr("y1", height)
            .attr("y2", 240)
            .attr("x1",function(d) {return x(parseDate(d.date))})
            .attr("x2",function(d) {return x(parseDate(d.date))});

        markerline.append('circle')
            .attr('class', 'seasonline')
            .transition().duration(2000)
            .attr('cx', function(d) {return x(parseDate(d.date))})
            .attr('cy', 220)
            .attr('r', 20);

        markerline.append('text')
            .attr('class', 'markerlinetext')
            .transition().duration(2000)
            .attr('x', function(d) {return x(parseDate(d.date))})
            .attr('y', 220)
            .text(d=> d.season);

        markerline.append('text')
            .attr('class', 'markerlinetext')
            .transition().duration(2000)
            .attr('x', function(d) {return x(parseDate(d.date))})
            .attr('y', 233)
            .text(d=> d.year );

        focus.call(zoom);

        context.selectAll("g")
            .data(sources)
            .enter().append("g")
            .append("path")
            .attr("class", "area")
            .attr("d", function(d) { return area2(d.values); })
            .style("fill", function(d) {return color(d.name);})
            .style("stroke", function(d) {return color(d.name);})
            .attr("clip-path", "url(#clip)");
    
        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);
    
        context.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.move, x.range()); 

        var markerline2 = context.selectAll(".seasonline2")
            .data(seasondata)
            .enter();
            
        markerline2.append("line")
            .attr("class", "seasonline2")
            .transition().duration(2000)
            .attr("y1", height2)
            .attr("y2", height2-30)
            .attr("x1",function(d) {return x(parseDate(d.date))})
            .attr("x2",function(d) {return x(parseDate(d.date))});

        markerline2.append('circle')
            .attr('class', 'seasonline2')
            .transition().duration(2000)
            .attr('cx', function(d) {return x(parseDate(d.date))})
            .attr('cy', height2-32)
            .attr('r', 5);

        markerline2.append('text')
            .attr('class', 'markerlinetext2')
            .transition().duration(2000)
            .attr('x', function(d) {return x(parseDate(d.date))})
            .attr('y', height2-56)
            .text(d=> d.season + " " + d.year );
                                    
        function brushed(event) {
            if(event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            x.domain([x2.invert(event.selection[0]),x2.invert(event.selection[1])]);
            focus.selectAll("path.area").attr("d",  function(d) {return area(d.values)});
            focus.selectAll(".seasonline")
                .attr("x1",function(d) {return x(parseDate(d.date))})
                .attr("x2",function(d) {return x(parseDate(d.date))});
            focus.selectAll("circle.seasonline").attr('cx', function(d) {return x(parseDate(d.date))})
            focus.selectAll("text.markerlinetext").attr('x', function(d) {return x(parseDate(d.date))})
            focus.select(".x.axis").call(xAxis);
            focus.select(".y.axis").call(yAxis);
        }

        function zoomed(event) {
            if(event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            x.domain(event.transform.rescaleX(x2).domain());
            focus.select("path.area").attr("d", function(d) {return area(d.values)});
            focus.selectAll(".seasonline")
                .attr("x1",function(d) {return x(parseDate(d.date))})
                .attr("x2",function(d) {return x(parseDate(d.date))});
            focus.selectAll("circle.seasonline").attr('cx', function(d) {return x(parseDate(d.date))})
            focus.selectAll("text.markerlinetext").attr('x', function(d) {return x(parseDate(d.date))})
            focus.select(".x.axis").call(xAxis);
            context.select(".brush").call(brush.move, [x2(event.transform.rescaleX(x2).domain()[0]),x2(event.transform.rescaleX(x2).domain()[1])]);
        }

        function responsivefy(svg) { 
              
            // Container is the DOM element, svg is appended. 
            // Then we measure the container and find its 
            // aspect ratio. 
            const container = d3.select(svg.node().parentNode), 
                width = parseInt(svg.style('width'), 10), 
                height = parseInt(svg.style('height'), 10), 
                aspect = width / height; 
                  
            // Add viewBox attribute to set the value to initial size 
            // add preserveAspectRatio attribute to specify how to scale  
            // and call resize so that svg resizes on page load 
            svg.attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMinYMid')
            .call(resize); 
              
            d3.select(window).on('resize.' + container.attr('id'), resize); 
   
            function resize() { 
                const targetWidth = parseInt(container.style('width')); 
                svg.attr('width', targetWidth); 
                svg.attr('height', Math.round(targetWidth / aspect)); 
            } 
        }

        function mouseOver(){
            focus.selectAll(".hoverCircle.hoverCircle").attr('stroke', 'steelblue');
            focus.selectAll(".lineHover.lineHover").attr('stroke', '#999');
            tooltip.style("visibility", "visible");
        };

        function mouseMove(event) {

            var x0 = x.invert(d3.pointer(event)[0]),
                i = bisectDate(subset, x0, 1),
                d0 = subset[i - 1],
                d1 = subset[i],
                d = x0 - parseDate(d0.date) > parseDate(d1.date) - x0 ? d1 : d0;

            focus.selectAll(".hoverCircle.hoverCircle")
                .attr("r", 7)
				.attr("cy", e => y(+d[e]))
                .attr("cx", x(parseDate(d.date)));
                
            focus.selectAll(".lineHover.lineHover")
                .style("opacity", 0.5)
                .attr("y1", -height)
                .attr("y2",0)
                .attr('transform', 
                    `translate(${x(parseDate(d.date))}, ${height})`);
                
            tooltip.html(
                `<strong>Date : </strong> <span>${formatDate(parseDate(data[i].date))}</span><br/>`
            )
                .style('display', 'block')
                .style("top", (event.pageY-10)+"px")
                .style("left",(event.pageX+10)+"px")
                .selectAll()
                .data(sources).enter()
                .append('g')
                .html(function(d) {
                    return `<strong>${d.name} : </strong> <span style='color:${color(d.name)}'>${d.values[i].temperature}</span><br/>`;
                })
        }

        function mouseOut(){
            focus.selectAll(".hoverCircle").attr('stroke', 'none').attr("r", 0);
            focus.selectAll(".lineHover").attr('stroke', 'none').attr("y1", 0);
            tooltip.style("visibility", "hidden");
        };
    };

    render() {
        const { rangeColors,options, selectedValues,title } = this.state; 

        return(
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
                <div className='vis-timeseries'/>
            </CardBody>
          </Card>
        );
    };
};


export default TimeSeriesChart;


TimeSeriesChart.defaultProps = {
    data: Ratings,
    seasondata: seasondata,
    categories: [],
    rangeColors: rangeColordata,
    exclude: mapping[0].exclude,
    include: mapping[0].include,
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
    title: "",
    id: 0,
};