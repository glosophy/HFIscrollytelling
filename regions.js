
// set the dimensions and margins of the graph
var margin = {top: 50, right: 170, bottom: 20, left: 180},
width = 700 - margin.left - margin.right,
height = 380 - margin.top - margin.bottom;

var svg = d3.select(".regions-graph").append("svg")
              .attr("width",  width  + margin.left + margin.right)
              .attr("height", height + margin.top  + margin.bottom)

var tooltip = d3.select(".regions-graph").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data=[{region:"North America",value:8.48,value2:-0.07},
          {region:"Western Europe",value:8.37,value2:-0.01},
          {region:"Oceania",value:7.88,value2:-0.13},
          {region:"East Asia",value:7.85,value2:0.11},
          {region:"Eastern Europe",value:7.55,value2:-0.16},
          {region:"Latin America",value:6.95,value2:-0.16},
          {region:"Caucasus & Central Asia",value:6.77,value2:-0.25},
          {region:"South Asia",value:6.47,value2:0.02},
          {region:"Sub-Saharan Africa",value:6.27,value2:0.11},
          {region:"Middle East & North Africa",value:5.76,value2:-0.58}]

    data.sort(function(a, b) { return a.value - b.value; });

      	x.domain([0, 10]);
        y.domain(data.map(function(d) { return d.region; })).padding(0.1);

        g.append("g")
            .attr("class", "x axis")
           	.attr("transform", "translate(0," + height + ")")
          	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }));

        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

      svg.append("text")
          .attr("class", "figure")
          .attr("x", 0)
          .attr("y", 25)
          .attr("dy", ".35em")
          .text("FIGURE 3: Human Freedom Scores by Region");

        g.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function(d) { return y(d.region); })
            .attr("width", function(d) { return x(d.value); })
            .on("mousemove", function(d){

          // Replace hard coded vals (50, 90) with 50% of the tooltip wioth and height + a top buffer
                tooltip
                  .style("left", d3.event.pageX - 50 + "px")
                  .style("top", d3.event.pageY - 90 + "px")
                  .style("display", "inline-block")
                  .html((d.region) + "<br><span>" + "Change (2008-2016): " + (d.value2) + "</span>");
            })
        		.on("mouseout", function(d){ tooltip.style("display", "none");});
