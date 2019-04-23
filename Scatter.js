// Set up margin, width, and height
var margin = {top: 50, right: 340, bottom: 50, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// Add canvas to body
var svg = d3.select(".econ-personal").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Set up x values for EconomicFreedomScore
var xValue = function(d) { return d.PersonalFreedomScore;},
    xScale = d3.scale.linear().range([0, width]),
    xMap = function(d) { return xScale(xValue(d));}, // Position on x axis of each element in data
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");


// Set up y values for PersonalFreedomScore
var yValue = function(d) { return d.EconomicFreedomScore;},
    yScale = d3.scale.linear().range([height, 0]),
    yMap = function(d) { return yScale(yValue(d));}, // Position on y axis of each element in data
    yAxis = d3.svg.axis().scale(yScale).orient("left");


// Set fill color to be HumanQuartile and make colors customizable
var cValue = function(d) { return d.HumanQuartile;},
    colors = ['#8D452A', '#E4783C', '#F1BC98', '#FAE4D6'];
    color = d3.scale.ordinal().range(colors);


// Load the car data
d3.csv("https://gist.githubusercontent.com/glosophy/f5ca9da48ea49b22155b9502313b6746/raw/73ad1159d850046212cc04a16309a0a81d5837cb/hfi2016.csv", function(error, data) {
  data.forEach(function(d) {
    d.HumanQuartile = +d.HumanQuartile;
    d.PersonalFreedomScore = +d.PersonalFreedomScore;
    d.EconomicFreedomScore = +d.EconomicFreedomScore
  });


  // The domain of x and y
  xScale.domain([0, 10]);
  yScale.domain([0, 10]);


  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
          .attr("class", "x-label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Personal Freedom");


  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
          .attr("class", "y-label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Economic Freedom");


  // Draw the scatterplot
  svg.selectAll(".dot") // Selects the svg element (dot)
      .data(data) // If it finds any rects, it returns them as a selection (an array of elements)
      .enter().append("circle") // Adds a circle for each item in our selection
      .attr("class", "dot")
      .attr("r", 7)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})


  // Legend for origin
  var legend = svg.selectAll(".legend")
      .data(color.domain()).enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


  // Draw colored squares for the legend
  legend.append("rect")
      .attr("x", width - 390)
      .attr("y", 300)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);


  // Insert text for the legend
  legend.append("text")
      .attr("x", width - 400)
      .attr("y", 308)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d + "º Quartile" ;})


    svg.append("text")
        .attr("class", "figure1")
        .attr("x", 0)
        .attr("y", -30)
        .attr("dy", ".35em")
        .text("FIGURE 1: Economic Freedom and Personal Freedom");

});
