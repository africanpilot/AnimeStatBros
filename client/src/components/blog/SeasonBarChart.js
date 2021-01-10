import React, { Component  } from 'react';
import * as d3 from 'd3';
import '../../assets/seasonstats.css';
import { Multiselect } from 'multiselect-react-dropdown';


class SeasonBarChart extends Component {
    constructor(props){ 
        super(props) 
          
        // Set initial state 
        this.state = { 
          data: props.data,
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
        this.drawChart();
    };

    componentDidUpdate() {
        d3.selectAll("g.g").remove().exit();
        this.drawChart()
    }
    
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

    drawChart = () => {
        d3.select('.vis-barchart > *').remove();
        const {data,categories,rangeColors
            ,w,h,m1T,m1R,m1B,m1L} = this.state;
        var margin = {top: m1T, right: m1R, bottom: m1B, left: m1L},
            width = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;
        
        var svg = d3.select('.vis-barchart').append('svg')
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
            .rangeRound([height, 0])
            .domain([d3.max(data,function(d){return d[1];}),0]);

        var color = d3.scaleOrdinal()
            .range(rangeColors);

        var ageNames = categories;

        color.domain(ageNames);

        data.forEach(function(d) {
            d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
        });
        
        x0.domain(data.map(function(d) { return d.State; }));
        x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
        y.domain([0
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
            .attr("text-anchor", "start");
            // .text("Population");

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

    render() {
        const { rangeColors,options, selectedValues } = this.state; 

        return(
            <div>
                <Multiselect 
                options={options} // Options to display in the dropdown
                selectedValues={selectedValues} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                showCheckbox={true}
                rangeColors={rangeColors}
                />
                <div className='vis-barchart'/>
            </div>
        );
    };
};

export default SeasonBarChart;

SeasonBarChart.defaultProps = {
    data: [],
    categories: [],
    rangeColors: [],
    exclude: [],
    include: [],
    w: 800,
    h: 300,
    m1T: 20,
    m1R: 20,
    m1B: 30,
    m1L: 40,
};