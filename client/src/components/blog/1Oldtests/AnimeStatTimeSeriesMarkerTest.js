import React, { useRef, useEffect,Component  } from 'react';
import * as d3 from 'd3';
import '../../assets/timeseries4.css';
import data from '../../data/climate4.json';
import markerData from '../../data/markers.json';
import { Multiselect } from 'multiselect-react-dropdown';

class TimeseriesChart extends Component {
    constructor(props){ 
        super(props) 
          
        // Set initial state 
        this.state = { 
          options: [{name: 'Rating', id: 1}
                    ,{name: '%Change', id: 2}],
          selectedValue: [{name: 'Rating', id: 1}
                          ,{name: '%Change', id: 2}],
          categories: ["Rating","%Change"],
        };
          
        // Binding this keyword 
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this) 
      } 
    
      onSelect(selectedList, selectedItem) {
        var getList = selectedList.map(item => (item.name));
        this.state.categories = getList;
        console.log("onSelect: ", this.state.categories);
        this.componentDidUpdate();
      }
     
      onRemove(selectedList, removedItem) {
        var getList = selectedList.map(item => (item.name));
        this.state.categories = getList;
        console.log("OnRemove: ", this.state.categories);
        this.componentDidUpdate();
      }

    drawChart = () => {
                
        var margin = {top: 13, right: 13, bottom: 105, left: 43},
            margin2 = {top: 330, right: 15, bottom: 17, left: 43},
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom,
            height2 = 400 - margin2.top - margin2.bottom;

        const svg = d3.select(this.refs.canvas)
            .attr("width",width+margin.left+margin.right)
            .attr("height",height+margin.top+margin.bottom)
            .call(responsivefy);

        var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
        
        var x = d3.scaleTime().range([0, width]),
            x2 = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            y2 = d3.scaleLinear().range([height2, 0]);

        var color = d3.scaleOrdinal().range(d3.schemePastel2);
        
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
        
        var line = d3.area()
            .defined(function(d) { return !isNaN(d.temperature); })
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.temperature); });

        
        var line2 = d3.area()
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
        

            // Set the color domain equal to the three product categories
            // var productCategories = Object.keys(data[0]).filter(function(key) {
            //     return key !== "date" && key !== "metric";
            // });
            var productCategories = this.state.categories;
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

            var markers = markerData.map(function (marker) {
                return {
                  date: parseDate(marker.date),
                  type: marker.type,
                  version: marker.version
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
                .attr("class","line")
                .attr("d", function(d) { return line(d.values); })
                .style("fill", function(d) {return color(d.name);})
                .style("stroke", function(d) {return color(d.name);})
                .attr("clip-path", "url(#clip)");

              focus.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);
           
              focus.append("g")
                  .attr("class", "y axis")
                  .call(yAxis);

            


            // var datedata = ["2012-08-01 00:00:00"]
            

            // focus.selectAll("g")
            //     .data(datedata)
            //     .enter()
            //     .append("line")
            //     .attr("x1", x(parseDate(datedata[0])))  //<<== change your code here
            //     .attr("y1", 0)
            //     .attr("x2", x(parseDate(datedata[0])))  //<<== and here
            //     .attr("y2", height - margin.top - margin.bottom)
            //     .style("stroke-width", 2)
            //     .style("stroke", "red")
            //     .style("fill", "none");

            // Add one dot in the legend for each name.
            svg.selectAll("mydots")
            .data(this.state.categories)
            .enter()
            .append("circle")
            .attr("cx", function(d,i){ return 60 + i*80})
            .attr("cy", 15) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", function(d){ return color(d)})

            // Add one dot in the legend for each name.
            svg.selectAll("mylabels")
            .data(this.state.categories)
            .enter()
            .append("text")
            .attr("x", function(d,i){ return 75 + i*80})
            .attr("y", 15) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
                  
              context.selectAll("g")
                .data(sources)
                .enter().append("g")
                .append("path")
                .attr("class", "line")
                .attr("d", function(d) { return line2(d.values); })
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
                
            svg.append("rect")
                .attr("class", "zoom")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);
        
            startTransitions(svg, height, markers, x);

          function brushed(event) {
            if(event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            x.domain([x2.invert(event.selection[0]),x2.invert(event.selection[1])]);
            focus.selectAll("path.line").attr("d",  function(d) {return line(d.values)});
            focus.select(".x.axis").call(xAxis);
            focus.select(".y.axis").call(yAxis);
          }

          function zoomed(event) {

            if(event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            x.domain(event.transform.rescaleX(x2).domain());
            focus.select("path.line").attr("d", function(d) {return line(d.values)});
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
        
        function addMarker (marker, svg, height, x) {
            var radius = 20,
                xPos = x(marker.date),
                yPosStart = height - radius - 3,
                yPosEnd = (marker.type === 'Client' ? 80 : 160) + radius - 3;
          
                console.log(marker.date);
                console.log(xPos);
                console.log(yPosStart);
                console.log(yPosEnd);

            var markerG = svg.append('g')
              .attr('class', 'marker '+marker.type.toLowerCase())
              .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
              .attr('opacity', 0);
          
            markerG.transition()
              .duration(1000)
              .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
              .attr('opacity', 1);
          
            markerG.append('path')
              .attr('d', 'M' + radius + ',' + (height-yPosStart) + 'L' + radius + ',' + (height-yPosStart))
              .transition()
                .duration(1000)
                .attr('d', 'M' + radius + ',' + (height-yPosEnd) + 'L' + radius + ',' + (radius*2));
          
            markerG.append('circle')
              .attr('class', 'marker-bg')
              .attr('cx', radius)
              .attr('cy', radius)
              .attr('r', radius);
          
            markerG.append('text')
              .attr('x', radius)
              .attr('y', radius*0.9)
              .text(marker.type);
          
            markerG.append('text')
              .attr('x', radius)
              .attr('y', radius*1.5)
              .text(marker.version);
          }

          function startTransitions (svg, height, markers, x) {
            markers.forEach(function (marker, i) {
              setTimeout(function () {
                addMarker(marker, svg, height, x);
              }, 1000 + 500*i);
            });
          }

    };

    componentDidMount() {
        console.log("mount");
        this.drawChart();
    };

    componentDidUpdate() {
        d3.selectAll("g").remove().exit();
        d3.selectAll("circle").remove().exit();
        d3.selectAll("text").remove().exit();
        console.log("update");
        this.drawChart()
      }

    render() {
        return(
            <div>
                <Multiselect id="selectButton"
                options={this.state.options} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                showCheckbox={true}
                />
                <svg ref="canvas"/>
            </div>
        );
    };
};

export default TimeseriesChart;