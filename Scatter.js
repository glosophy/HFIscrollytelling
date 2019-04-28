// Parse data
d3.csv("https://gist.githubusercontent.com/glosophy/f5ca9da48ea49b22155b9502313b6746/raw/73ad1159d850046212cc04a16309a0a81d5837cb/hfi2016.csv", function(error, data) {
  data.forEach(function(d) {
    d.HumanQuartile = +d.HumanQuartile;
    d.PersonalFreedomScore = +d.PersonalFreedomScore;
    d.EconomicFreedomScore = +d.EconomicFreedomScore
  });

      makeVis(data);
  });

    var makeVis = function(data) {


    // Canvas size and margins
    var margin = { top: 50, right: 340, bottom: 50, left: 100 },
        width  = 850 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Add the visualization svg to the econ-personal <div>
    var svg = d3.select(".econ-personal").append("svg")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define scales
    var cValue = function(d) { return d.HumanQuartile;},
        colors = ['#8D452A', '#E4783C', '#F1BC98', '#FAE4D6'];
        colorScale = d3.scale.ordinal().range(colors);


    var xScale = d3.scale.linear()
        .domain([0, 10])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, 10])
        .range([height, 0]); // flip order because y-axis origin is upper LEFT

    // Define axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');

    // Add x-axis to the svg
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the svg
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width) // x-offset from the xAxis, move label all the way to the right
        .attr("y", -6)    // y-offset from the xAxis, moves text UPWARD!
        .style("text-anchor", "end") // right-justify text
        .text("Personal Freedom");

    // Add y-axis to the svg
    svg.append("g")
        .attr("class", "y axis") // .orient('left') took care of axis positioning for us
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)") // although axis is rotated, text is not
        .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
        .style("text-anchor", "end")
        .text("Economic Freedom");


    // Legend for origin
    var legend = svg.selectAll(".legend")
        .data(colorScale.domain()).enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // Draw colored squares for the legend
    legend.append("rect")
        .attr("x", width - 390)
        .attr("y", 300)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScale);

    // Insert text for the legend
    legend.append("text")
        .attr("x", width - 400)
        .attr("y", 308)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d + "º Quartile" ;})


    svg.append("text")
        .attr("class", "figure")
        .attr("x", 0)
        .attr("y", -30)
        .attr("dy", ".35em")
        .text("FIGURE 1: Economic Freedom and Personal Freedom");



    // Add the tooltip container to the vis container
    // it's invisible and its position/contents are defined during mouseover
    var tooltip = d3.select(".econ-personal").append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(d) {
        var color = colorScale(d.HumanQuartile);
        var html  = d.Countries + "<br/>" +
                    "<span style='color:" + color + ";'>" + "Human Freedom: " + d.HumanFreedomScore + "</span><br/>" +
                    "Personal Freedom: " + d.PersonalFreedomScore + "<br/>" +
                    "Economic Freedom: " + d.EconomicFreedomScore  ;

        tooltip.html(html)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
          .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!

    };
    // tooltip mouseout event handler
    var tipMouseout = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };

    // Add data points!
    svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 7) // radius size, could map to another data dimension
      .attr("cx", function(d) { return xScale( d.PersonalFreedomScore ); })     // x position
      .attr("cy", function(d) { return yScale( d.EconomicFreedomScore ); })  // y position
      .style("fill", function(d) { return colorScale(d.HumanQuartile); })
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);

};
