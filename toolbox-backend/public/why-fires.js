const typeMapping = {
  '0': 'Presumed Vegetation Fire',
  '1': 'Active Volcano',
  '2': 'Other Static Land Source',
  '3': 'Offshore'
};

const dayNightMapping = {
  'D' : 'Daytime fire',
  'N' : 'Nighttime fire'
}

d3.select('#d3Div').append('svg').attr('width', 300).attr('height', 200)
    .append('circle').attr('cx', 150).attr('cy', 100).attr('r', 40).attr('fill', 'blue');

document.getElementById('yearSlider').addEventListener('input', function(e) {
  const year = e.target.value;
  document.getElementById('yearDisplay').textContent = year;
  loadYearData(year);
});

loadYearData(document.getElementById('yearSlider').value);

function loadYearData(year) {
  const dataPath = `./data/modis_${year}_United_States.csv`;

  // Get the current layout before loading new data
  let currentLayout = getPlotlyLayout('mapContainer');
  let currentCenter = currentLayout.center;
  let currentZoom = currentLayout.zoom;

  d3.csv(dataPath).then((data) => {
    createGeoGraph(data, currentZoom, currentCenter);
  });
}

function createGeoGraph(data, currentZoom, currentCenter) {
  let trace = [
    {
      type: 'scattermapbox',
      mode: 'markers',
      lat: data.map(d => d.latitude),
      lon: data.map(d => d.longitude),
      text: data.map(d => getDetail(d)),
      marker: {
        color: 'red',
        size: 10,
        opacity: 0.8
      }
    }
  ];

  let layout = {
    mapbox: {
      style: 'carto-positron',
      center: currentCenter || { lat: 37.0902, lon: -95.7129 },
      zoom: currentZoom || 3
    },
    height: 1000,
  };

  Plotly.newPlot('mapContainer', trace, layout);

  mapContainer.on('plotly_click', function(data){
    var infotext = data.points[0].data.text[data.points[0].pointIndex];

    var detailsBox = document.getElementById('detailBox');
    detailsBox.style.display = 'block';
    detailsBox.innerHTML = infotext;
  });
}

function formatTime(timeStr) {
  return timeStr.padStart(4, '0').replace(/^(..)(..)$/, '$1:$2');
}

function getDetail(d) {
  const typeDescription = typeMapping[d.type] || 'Unknown';
  const dayNightDescription = dayNightMapping[d.daynight] || 'Unknown';

  return `
  <b>State:</b> ${d.state_name}<br>
  <b>Latitude:</b> ${d.latitude}<br>
  <b>Longitude:</b> ${d.longitude}<br>
  <b>Date:</b> ${d.acq_date}<br>
  <b>Time:</b> ${formatTime(d.acq_time)}<br>
  <b>DayNight:</b> ${dayNightDescription}<br>
  <b>Type:</b> ${typeDescription}<br>
  <b>Brightness(Temperature):</b> ${d.bright_t31} Kelvin<br>
  <b>Satellite:</b> ${d.satellite}<br>
            `;
}

function getPlotlyLayout(divId) {
  let currentLayout = {};
  const gd = document.getElementById(divId);
  if (gd && gd._fullLayout && gd._fullLayout.mapbox) {
    currentLayout = {
      center: gd._fullLayout.mapbox.center,
      zoom: gd._fullLayout.mapbox.zoom
    };
  }
  return currentLayout;
}

