import React, { useRef, useEffect } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import '../../assets/timeseries3.css';
import data from '../../data/sp500.js';


function TimeseriesChart({}){
    const ref = useRef();

    useEffect(() => {
        var margin = {top: 20, right: 20, bottom: 90, left: 50},
            margin2 = {top: 230, right: 20, bottom: 30, left: 50},
            width = 450 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom,
            height2 = 300 - margin2.top - margin2.bottom;

        const svg = d3.select(ref.current)
            .attr("width",width+margin.left+margin.right)
            .attr("height",height+margin.top+margin.bottom)
            // .style("border", "1px solid black")
            ;
    }, []);

    useEffect(() => {
        drawChart();
    }, [data]);

    const drawChart = () => {
        // console.log(data);
        var margin = {top: 20, right: 20, bottom: 90, left: 50},
            margin2 = {top: 230, right: 20, bottom: 30, left: 50},
            width = 450 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom,
            height2 = 300 - margin2.top - margin2.bottom;
        
        const svg = d3.select(ref.current);
            
        var parseDate = d3.timeParse("%b %Y");

        var x = d3.scaleTime().range([0,width]).domain([0,d3.max(data, function(d){return d[0];})]),
            x2 = d3.scaleTime().range([0,width]).domain([0,d3.max(data, function(d){return d[0];})]),
            y = d3.scaleLinear().range([0,height]).domain([d3.max(data,function(d){return d[1];}),0]),
            y2 = d3.scaleLinear().range([0,height2]).domain([d3.max(data,function(d){return d[1];}),0]);;

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
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(parseDate(d.date)); })
            .y0(height)
            .y1(function(d) { return y(+d.price); });

        var area2 = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x2(parseDate(d.date)); })
            .y0(height2)
            .y1(function(d) { return y2(+d.price); });

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

        x.domain(d3.extent(data, function(d) { return parseDate(d.date); }));
        y.domain([0, d3.max(data, function(d) { return +d.price; })]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        focus.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        context.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area2);

        context.append("g")
            .attr("class", "axis axis--x")
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
            focus.select(".area").attr("d",area);
            focus.select(".axis--x").call(xAxis);
        }

        function zoomed(event) {

            if(event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            x.domain(event.transform.rescaleX(x2).domain());
            focus.select(".area").attr("d",area);
            focus.select(".axis--x").call(xAxis);
            
            //brush area
            context.select(".brush").call(brush.move, [x2(event.transform.rescaleX(x2).domain()[0]),x2(event.transform.rescaleX(x2).domain()[1])]);
        }
        
    }

    return (
        <div className="zoom">
            <svg ref={ref}>
            </svg>
        </div>
    )
}

export default TimeseriesChart;