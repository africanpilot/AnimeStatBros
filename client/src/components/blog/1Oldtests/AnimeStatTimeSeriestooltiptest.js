import React, { useRef, useEffect,Component  } from 'react';
import * as d3 from 'd3';
import '../../assets/timeseries4.css';
import data from '../../data/climate4.json';
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
        var bisectDate = d3.bisector(function(d) {
            return d.date;
        }).left;
        
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
           
           
              x.domain(d3.extent(subset, function(d) { return parseDate(d.date); }));
              y.domain([d3.min(sources, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
                        d3.max(sources, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); }) ]);
              x2.domain(x.domain());
              y2.domain(y.domain());

              drawFocus();

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

        function drawFocus() {

            // Create focus object
            // let focus = svg.append('g')
            //     .attr('class', 'focus')

            // Add an x-line to show where hovering
            // focus.append('line')
            //     .classed('x', true);

            // Add a y-line to show where hovering
            focus.append('line')
                .classed('y', true);


            // append circle on the line path
            focus.append('circle')
                .attr('r', 7.5)

            // add background rectangle behind the text tooltip
            focus.append('rect')
                .attr('x', -30)
                .attr('y', '-2em')
                .attr('width', 70)
                .attr('height', 20)
                .style("fill", "white");

            // add text annotation for tooltip
            focus.append('text')
                .attr('x', -30)
                .attr('dy', '-1em')
                .style("fill", "black")
                .style("font-family", "SuisseIntl");

            focus.append('div')
                .attr('x', 10)
                .attr('dy', '.35em')
                .attr("class", "tooltip")
                .style("opacity", 1)

            // create an overlay rectangle to draw the above objects on top of
            svg.append('rect')
                .attr('class', 'overlay')
                .attr('width', width)
                .attr('height', height)
                .on('mouseover', () => focus.style('display', null))
                .on('mouseout', () => focus.style('display', 'none'))
                .on('mousemove', tipMove);



            // make the overlay rectangle transparent,
            // so it only serves the purpose of detecting mouse events
            d3.select('.overlay')
                .style('fill', 'none')
                .style('pointer-events', 'all');

            // select focus objects and set opacity
            d3.selectAll('.focus')
                .style('opacity', 0.9);

            // select the circle and style it
            d3.selectAll('.focus circle')
                .style("fill", '#068ca0')
                .style("opacity", 0)

            // select the hover lines and style them
            d3.selectAll('.focus line')
                .style("fill", "none")
                .style("stroke", "black")
                .style("opacity", 0.4)
                .style("stroke-width", '1px');




            // 'stroke-dasharray': '3 3'

            // function that adds tooltip on hover
            function tipMove() {
                // below code finds the date by bisecting and
                // stores the x and y coordinate as variables
                console.log("source: ",sources);
                let x0 = x.invert(d3.pointer(this)[0]);
                let i = bisectDate(sources, x0, 1);
                let d0 = sources[i - 1];
                let d1 = sources[i];
                let d = x0 - parseDate(d0.date) > parseDate(d1.date) - x0 ? d1 : d0;

                // place the focus objects on the same path as the line
                focus.attr('transform', `translate(${x(parseDate(d.date))}, ${y(d.values)})`);

                // position the x line
                focus.select('line.x')
                    .attr('x1', 0)
                    .attr('x2', x(parseDate(d.date)))
                    .attr('y1', 0)
                    .attr('y2', 0);

                console.log("Date: ",-x(parseDate(d.date)))
                console.log("value: ",d.values);

                // position the y line
                focus.select('line.y')
                    .attr('x1', 0)
                    .attr('x2', 0)
                    .attr('y1', 0)
                    .attr('y2', y(d.values));

                // position the text
                focus.select('text').text(d.values).transition() // slowly fade in the tooltip
                    .duration(100)
                    .style("opacity", 1);

                // focus.select('div')
                //     .transition()
                //     .duration(500)
                //     .style("opacity", 0.9)
                // div.html("Value: " + d.value)

                // show the circle on the path
                focus.selectAll('.focus circle')
                    .style("opacity", 1)

            };

        }

    };

    componentDidMount() {
        console.log("mount");
        this.drawChart();
    };

    componentDidUpdate() {
        d3.selectAll("g").remove().exit()
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