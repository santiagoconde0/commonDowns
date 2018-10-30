function updateByCountry() {
  d3.select("svg").remove();


  d3.select('#NetByName')
    .append('svg')
    .attr("height", "1000")
    .attr("width", "1300");

  var value2 = document.getElementById("selector2").value;

  console.log("VALUE 2", value2);

  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().distance(15).id(function(d) {
      return d.id;
    }))
    .force("charge", d3.forceManyBody().strength(-20))
    .force('collision', d3.forceCollide().radius(25))
    .force("center", d3.forceCenter(width / 2, height / 2));

  var arraylinks = [];
  var arraynodes = [];
  var filterNodes;

  d3.json("data/graph.json", function(error, graph) {
    if (error) throw error;

    filterByCountry();

    function filterByCountry() {

      filterNodes = graph.nodes.filter(d => d.country === value2 );
      // filterNodes = graph.nodes;
    };

    console.log("COUNTRY RIDERS: ", filterNodes);

var filterLinks;

    filterNodes.forEach(function(d) {

      var name = d.id;

      filterLinks = graph.links.filter(d => d.source === name || d.target === name);

      filterLinks.forEach(function(d) {
        arraylinks.push(d);
      });

    });

    console.log("FILERTLINKS", arraylinks);



    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(arraylinks)
      .enter().append("line")
      .attr("stroke-width", function(d) {
        return Math.sqrt(d.value);
      })
      .style("stroke", "#B2D9D8")
      .style("fill", "#B2D9D8")
      .style("fill-opacity", "0.8")
      .on("mouseover", function () {
        d3.select(this).select("g").transition()
            .duration(750)
            .style("fill", "black");
      });
      // .style("stroke-width", "4px");

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

    var circles = node.append("circle")
    .attr("r", 10)
    .style("stroke", "#777")
    .style("fill", "#6bffe1")
    .style("fill-opacity", "0.6")
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

      function mouseover() {
d3.select(this).select("circle").transition()
    .duration(750)
    .attr("r", 20)
    .style("fill-opacity", "1");
}

function mouseout() {
d3.select(this).select("circle").transition()
    .duration(750)
    .attr("r", 8)
    .style("fill-opacity", "0.8");
}




    var lables = node.append("text")
      .attr("dy", "-0.5em")
      .text(function(d) {
        const words = d.id.split(/\s+/g); // To hyphenate: /\s+|(?<=-)/
        if (!words[words.length - 1]) words.pop();
        if (!words[0]) words.shift();
        return words[0];
      })
      .attr("dx", function(d) {
        return -15
      })
      .style("font-family", "Times New Roman")
      .style("font-size", "8px");

    var lables2 = node.append("text")
      .attr("dy", "0.5em")
      .text(function(d) {
        const words = d.id.split(/\s+/g);
        if (!words[words.length - 1]) words.pop();
        if (!words[0]) words.shift();
        return words[1];
      })
      .attr("dx", function(d) {
        return -15
      })
      .style("font-family", "Times New Roman")
      .style("font-size", "8px");

    var lables3 = node.append("text")
      .attr("dy", "1.5em")
      .text(function(d) {
        const words = d.id.split(/\s+/g);
        if (!words[words.length - 1]) words.pop();
        if (!words[0]) words.shift();
        return words[2];
      })
      .attr("dx", function(d) {
        return -15
      })
      .style("font-family", "Times New Roman")
      .style("font-size", "8px");



    node.append("title")
      .text(function(d) {
        return d.id;
      });

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(arraylinks);

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


}
