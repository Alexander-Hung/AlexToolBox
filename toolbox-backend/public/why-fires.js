// D3.js visualization
d3.select('#d3Div').append('svg').attr('width', 300).attr('height', 200)
    .append('circle').attr('cx', 50).attr('cy', 50).attr('r', 40).attr('fill', 'blue');

window.onload = function() {
  // Delay data fetching by 2 seconds (2000 milliseconds)
  setTimeout(function() {
    d3.csv("./data/modis_2022_United_States.csv").then(function(data) {
      createTable(data);
      createGeoGraph(data);
    });
  }, 2000);
};


function createTable(data) {
  // Create a table using D3.js
  let table = d3.select("#tableDiv").append("table");
  let thead = table.append("thead");
  let tbody = table.append("tbody");

  // Append header
  thead.append("tr")
      .selectAll("th")
      .data(data.columns)
      .enter()
      .append("th")
      .text(d => d);

  // Append rows
  let rows = tbody.selectAll("tr")
      .data(data.slice(0, 20))
      .enter()
      .append("tr");

  // Append cells
  rows.selectAll("td")
      .data(d => Object.values(d))
      .enter()
      .append("td")
      .text(d => d);
}

// Plotly visualization
function createGeoGraph(data) {
  let trace = [
    {
      type: 'scattermapbox',
      mode: 'markers',
      lat: data.map(d => d.latitude),
      lon: data.map(d => d.longitude),
      marker: {
        color: 'red',
        size: 10,
        opacity: 0.8
      }
    }
  ];

  let layout = {
    title: 'Geographical Visualization',
    geo: {
      scope: 'usa',
    },
    mapbox: {
      style: 'carto-positron',
      center: {
        lat: 37.0902,  // center it to the USA
        lon: -95.7129
      },
      zoom: 3
    },
    height: 1000,
  };

  Plotly.newPlot('plotlyDiv', trace, layout);
}
