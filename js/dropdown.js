d3.json("data/graph.json", function(error, graph) {
  if (error) throw error;

  console.log("NODES", graph.nodes);

  var select = d3.select("#target") // create dropdown
    .append("select")
    .attr("class", "select")
    .attr("id", "selector")
    .on("change", onchange);

  var options = select //options for the dropdown
    .selectAll("option")
    .data(graph.nodes.sort(function(a, b) {
      var textA = a.id.toUpperCase();
      var textB = b.id.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })).enter()
    .append("option")
    .text(d => d.id);

  d3.select("#selector")
    .property("value", "");

  function onchange() {
    updateByName();
  };


  var countrys = [];

  graph.nodes.forEach(function(d) {

    countrys.push(d.country);
  });

  var countrysUnique = countrys.filter(function(d, index) {
    return countrys.indexOf(d) >= index;
  });

  console.log("Countrys", countrysUnique.filter(d => d != "#N/A"));



  var select = d3.select("#target2") // create dropdown
    .append("select")
    .attr("class", "select")
    .attr("id", "selector2")
    .on("change", onchange2);

  var options = select //options for the dropdown
    .selectAll("option")
    .data(countrysUnique.filter(d => d != "#N/A").sort(function(a, b) {
      var textA = a.toUpperCase();
      var textB = b.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })).enter()
    .append("option")
    .text(d => d);

  d3.select("#selector2")
    .property("value", "");

  function onchange2() {
    updateByCountry();
  };

});
