function updateByName() {
  d3.select("svg").remove();


  d3.select('#NetByName')
    .append('svg')
    .attr("height", "800")
    .attr("width", "800");

  var value = document.getElementById("selector").value;

  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().distance(250).id(function(d) {
      return d.id;
    }))
    .force("charge", d3.forceManyBody().strength(-150))
    .force('collision', d3.forceCollide().radius(35))
    .force("center", d3.forceCenter(width / 2, height / 2));

  var arraylinks = [];
  var arraynodes = [];
  var filterNodes;

  d3.json("data/graph.json", function(error, graph) {
    if (error) throw error;

    filterByCountry();

    function filterByCountry() {

      // filterNodes = graph.nodes.filter(d => d.country === "CO" || d.country === "US");
      filterNodes = graph.nodes;
    };

    var filterLinks

    var node = {};

    filterNodes.forEach(function(d) {

      var name = d.id;

      filterLinks = graph.links.filter(d => d.source === value || d.target === value);

      filterLinks.forEach(function(d) {
        arraylinks.push(d);
      });

    });

    arraylinks.forEach(function(d) {

      arraynodes.push(d.source);
      arraynodes.push(d.target);
    });

    arraynodes.forEach(function(d) {

    });


    var nodesUnique = arraynodes.filter(function(d, index) {
      return arraynodes.indexOf(d) >= index;
    });

    var arraynodesFilter = [];

    nodesUnique.forEach(function(d) {
      node = {
        "id": d
      }

      arraynodesFilter.push(node)

    });

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d) {
        return Math.sqrt(d.value);
      })
      .style("stroke", "#B2D9D8")
      .style("stroke-width", "4px");

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(arraynodesFilter)
      .enter().append("g")

    var circles = node.append("circle")
      .attr("r", 25)
      .style("stroke", "#777")
      .style("fill", "#6bffe1")
      .style("fill-opacity", "0.6")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

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
      .style("font-size", "10px");

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
      .style("font-size", "10px");

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
      .style("font-size", "10px");

    node.append("title")
      .text(function(d) {
        return d.id;
      });

    simulation
      .nodes(arraynodesFilter)
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
