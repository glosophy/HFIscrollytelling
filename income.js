// set the dimensions and margins of the graph
var margin = {top: 60, right: 50, bottom: 20, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Add canvas to body
var svg = d3.select(".income-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data=[{quartile:"Less Free",  income: 12026},
      {quartile:"3º Quartile", income: 12147},
      {quartile:"2º Quartile", income: 13722},
      {quartile:"Most Free", income: 39249}]


var barGroup = svg.append("g")
        .attr("class", "bar")
        .attr("transform", "translate(" + margin.left +", 0)");

// set x and y axis
var y = d3.scaleLinear()
              .range([height, 10])
              .domain([0, d3.max(data, function(d) {return d.income })]);

var x = d3.scaleBand()
              .range([0, 500])
              .domain(data.map(function(d) {return d.quartile }))
              .padding(0.2);

// add the bar to the graph
barGroup.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", function(d) {return x(d.quartile) })
            .attr("y", function(d) {return y(d.income) })
            .attr("height", function(d) {return height - y(d.income) })
            .attr("width", x.bandwidth())
            .attr("fill", "#E4783C")


// Add the X Axis
svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .call(d3.axisBottom(x).ticks(6));

// Add the Y Axis
svg.append("g")
     .attr("transform", "translate(" + margin.left + ",0)")
     .call(d3.axisLeft(y).ticks(5))
         .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text("Economic Freedom");

// add a header
svg.append("text")
   .attr("class", "figure")
   .attr("x", 50)
   .attr("y", -15)
   .attr("dy", ".35em")
   .text("FIGURE 2: Income Per Capita by Freedom Quartile");
