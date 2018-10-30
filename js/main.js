var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().distance(2).id(function(d) {
    return d.id;
  }))
  .force("charge", d3.forceManyBody().strength(-40))
  .force('collision', d3.forceCollide().radius(8))
  .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("data/graph.json", function(error, graph) {
  if (error) throw error;


  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("stroke-width", function(d) {
      return Math.sqrt(d.value);
    })
    .style("stroke", "gray")
    .style("stroke-opacity", "0.2");

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

  var circles = node.append("circle")
    .attr("r", 5)
    .style("stroke", "#777")
    .style("fill", "#6bffe1")
    .style("fill-opacity", "0.6")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // var lables = node.append("text")
  //   .attr("dy", "-0.5em")
  //   .text(function(d) {
  //     const words = d.id.split(/\s+/g); // To hyphenate: /\s+|(?<=-)/
  //     if (!words[words.length - 1]) words.pop();
  //     if (!words[0]) words.shift();
  //     return words[0];
  //   })
  //   .attr("dx", function(d) {
  //     return -15
  //   })
  //   .style("font-family", "Times New Roman")
  //   .style("font-size", "10px");
  //
  // var lables2 = node.append("text")
  //   .attr("dy", "0.5em")
  //   .text(function(d) {
  //     const words = d.id.split(/\s+/g);
  //     if (!words[words.length - 1]) words.pop();
  //     if (!words[0]) words.shift();
  //     return words[1];
  //   })
  //   .attr("dx", function(d) {
  //     return -15
  //   })
  //   .style("font-family", "Times New Roman")
  //   .style("font-size", "10px");
  //
  // var lables3 = node.append("text")
  //   .attr("dy", "1.5em")
  //   .text(function(d) {
  //     const words = d.id.split(/\s+/g);
  //     if (!words[words.length - 1]) words.pop();
  //     if (!words[0]) words.shift();
  //     return words[2];
  //   })
  //   .attr("dx", function(d) {
  //     return -15
  //   })
  //   .style("font-family", "Times New Roman")
  //   .style("font-size", "10px");


  function mouseover() {
d3.select(this).select("circle").transition()
.duration(750)
.attr("r", 20)
.style("fill-opacity", "1");
}

function mouseout() {
d3.select(this).select("circle").transition()
.duration(750)
.attr("r", 5)
.style("fill-opacity", "0.8");
}


  node.append("title")
    .text(function(d) {
      return d.id;
    });

  simulation
    .nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);

  function ticked() {
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
