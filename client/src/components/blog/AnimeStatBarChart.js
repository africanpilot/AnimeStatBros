import React, {Component, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Multiselect } from 'multiselect-react-dropdown';
import '../../assets/seasonstats.css';
import data from '../../data/statesdata.json';


function StatsBarChart(){
    const ref1 = useRef();

    useEffect(() => {
        drawChart();
    }, [data]);

    const drawChart = () => {
        
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
      
        var svg = d3.select(ref1.current)
            .attr("width",width+margin.left+margin.right)
            .attr("height",height+margin.top+margin.bottom)
            .call(responsivefy);

        var g = svg.append("g")
            .attr("class", "groupbar")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // The scale spacing the groups:
        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        // The scale for spacing each group's bar:
        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var color = d3.scaleOrdinal()
            .range(["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fffae","#fle2cc","#cccccc"]);

        var ageNames = Object.keys(data[0]).filter(function(key) { 
            return key !== "State"; 
        });

        color.domain(ageNames);

        data.forEach(function(d) {
            d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
        });
        
        x0.domain(data.map(function(d) { return d.State; }));
        x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
        y.domain([d3.min(data, function(d) { return d3.min(d.ages, function(d) { return d.value; }); })
            , d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })
        
        ]).nice();
        
        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class","bar")
            .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return d.ages; })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return color(d.name); });

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));
      
        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Population");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(ageNames.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      
        legend.append("rect")
            .attr("x", width - 17)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", color)
            .attr("stroke", color)
            .attr("stroke-width",2);
      
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        function responsivefy(svg) { 
            const container = d3.select(svg.node().parentNode), 
                width = parseInt(svg.style('width'), 10), 
                height = parseInt(svg.style('height'), 10), 
                aspect = width / height; 
                    
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
    };

    return (
        <div>
            <svg id='barchart' ref={ref1}/>
        </div>
    );
};

export default StatsBarChart;