import * as d3 from 'd3';
import "../../assets/Piechart.css";

const drawPieChart = (props) => {
    d3.select('.vis-pieChart > *').remove();
    
    var margin = {top: props.m1T, right: props.m1R, bottom: props.m1B, left: props.m1L},
        width = props.w - margin.left - margin.right,
        height = props.h - margin.top - margin.bottom,
    
    var radius = Math.min(width, height) / 2 - margin

    const svg = d3.select('.vis-pieChart').append('svg')
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .call(responsivefy);

    var data = {a: 9, b: 20, c:30, d:8, e:12}

    var color = d3.scaleOrdinal()
                .domain(data)
                .range(props.rangeColors);
    
    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    
    svg.selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    
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
};

export default drawPieChart;