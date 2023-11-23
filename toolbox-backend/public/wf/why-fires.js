let is3D = false;
document.getElementById('toggle3D').addEventListener('click', function() {
  is3D = !is3D; // Toggle the is3D flag
  loadYearData(document.getElementById('yearSlider').value);
});

d3.select('#d3Div').append('svg').attr('width', 300).attr('height', 200)
    .append('circle').attr('cx', 150).attr('cy', 100).attr('r', 40).attr('fill', 'blue');

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

const statesLonLat = {
  'Alabama' : {lat: 32.3182 , lon: -86.9023 },
  'Alaska': {lat: 65.8673, lon: -151.2874},
  'Arizona': {lat: 33.4484, lon: -112.0740},
  'Arkansas': {lat: 34.7465, lon: -92.2896},
  'California': {lat: 36.7783, lon: -119.4179},
  'Colorado': {lat: 39.5501, lon: -105.7821},
  'Connecticut': {lat: 41.6032, lon: -73.0877},
  'Delaware': {lat: 38.9108, lon: -75.5277},
  'Florida': {lat: 27.9944, lon: -81.7603},
  'Georgia': {lat: 33.0406, lon: -83.6431},
  'Hawaii' : {lat: 19.8987 , lon: -155.6659 },
  'Idaho': {lat: 44.0682, lon: -114.7420},
  'Illinois': {lat: 40.6331, lon: -89.3985},
  'Indiana': {lat: 40.5512, lon: -85.6024},
  'Iowa': {lat: 41.8780, lon: -93.0977},
  'Kansas': {lat: 39.0119, lon: -98.4842},
  'Kentucky': {lat: 37.8393, lon: -84.2700},
  'Louisiana': {lat: 31.1695, lon: -91.8678},
  'Maine': {lat: 45.2538, lon: -69.4455},
  'Maryland': {lat: 39.0458, lon: -76.6413},
  'Massachusetts': {lat: 42.4072, lon: -71.3824},
  'Michigan': {lat: 44.3148, lon: -85.6024},
  'Minnesota': {lat: 46.7296, lon: -94.6859},
  'Mississippi': {lat: 32.3547, lon: -89.3985},
  'Missouri': {lat: 37.9643, lon: -91.8318},
  'Montana': {lat: 46.8797, lon: -110.3626},
  'Nebraska': {lat: 41.4925, lon: -99.9018},
  'Nevada': {lat: 38.8026, lon: -116.4194},
  'New Hampshire': {lat: 43.1939, lon: -71.5724},
  'New Jersey': {lat: 40.0583, lon: -74.4057},
  'New Mexico': {lat: 35.6869, lon: -105.9378},
  'New York': {lat: 42.1657, lon: -74.9481},
  'North Carolina': {lat: 35.7596, lon: -79.0193},
  'North Dakota': {lat: 47.5515, lon: -101.0020},
  'Ohio': {lat: 40.4173, lon: -82.9071},
  'Oklahoma': {lat: 35.0078, lon: -97.0929},
  'Oregon': {lat: 44.9426, lon: -122.9338},
  'Pennsylvania': {lat: 41.2033, lon: -77.1945},
  'Rhode Island': {lat: 41.5801, lon: -71.4774},
  'South Carolina': {lat: 33.8361, lon: -81.1637},
  'South Dakota': {lat: 43.9695, lon: -99.9018},
  'Tennessee': {lat: 35.5175, lon: -86.5804},
  'Texas': {lat: 31.9686, lon: -99.9018},
  'Utah': {lat: 39.3210, lon: -111.0937},
  'Vermont': {lat: 44.5588, lon: -72.5778},
  'Virginia': {lat: 37.7693, lon: -78.1700},
  'Washington': {lat: 47.6062, lon: -122.3321},
  'West Virginia': {lat: 38.5976, lon: -80.4549},
  'Wisconsin': {lat: 43.0731, lon: -89.4012},
  'Wyoming': {lat: 43.0759, lon: -107.2903},
}

let currentCenter = null;

function filterData(data) {
  let filteredData = data;
  const stateFilter = document.getElementById('stateFilter').value;
  const dayNightFilter = document.getElementById('dayNightFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const dateFilter = document.getElementById('dateFilter').value;
  const monthFilter = document.getElementById('monthFilter').value;

  if (stateFilter === "Select State") {
    return filteredData;
  }
  if (stateFilter) {
    filteredData = filteredData.filter(d => d.state_name === stateFilter);
    currentZoom = 5;
  }
  if (dayNightFilter) {
    filteredData = filteredData.filter(d => d.daynight === dayNightFilter);
  }
  if (typeFilter) {
    filteredData = filteredData.filter(d => d.type === typeFilter);
  }
  if (dateFilter) {
    filteredData = filteredData.filter(d => d.acq_date === dateFilter);
  }
  if (monthFilter) {
    filteredData = filteredData.filter(d => {
      const month = new Date(d.acq_date).getMonth() + 1;
      return month.toString() === monthFilter;
    });
  }
  return filteredData;
}

function loadYearData(year) {
  const dataPath = `./data/modis_${year}_United_States.csv`;
  let currentLayout = getPlotlyLayout('mapContainer');
  currentCenter = currentLayout.center;
  currentZoom = currentLayout.zoom;

  // Set the min and max dates for the date input
  const minDate = `${year}-01-01`; // first day of the year
  const maxDate = `${year}-12-31`; // last day of the year
  document.getElementById('dateFilter').setAttribute('min', minDate);
  document.getElementById('dateFilter').setAttribute('max', maxDate);

  d3.csv(dataPath).then((data) => {
    let filteredData = filterData(data);
    updateDataCount(filteredData.length);
    let states = document.getElementById('stateFilter').value;
    let latLon = statesLonLat[states];
    console.log(latLon);
    createGeoGraph(filteredData, currentZoom, latLon);
  });
}

document.getElementById('yearSlider').addEventListener('input', function(e) {
  const year = e.target.value;
  document.getElementById('yearDisplay').textContent = year;
  loadYearData(year);
});

loadYearData(document.getElementById('yearSlider').value);

document.getElementById('stateFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('dayNightFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typeFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('dateFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('monthFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));

function createGeoGraph(data, currentZoom, currentCenter) {
  if (is3D) {
    create3DMap(data);
  } else {
    create2DMap(data, currentZoom, currentCenter);
  }
}

function create2DMap(data, currentZoom, currentCenter) {
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
    autosize: false,
    mapbox: {
      style: 'carto-positron',
      center: currentCenter || { lat: 37.0902, lon: -95.7129 },
      zoom: currentZoom || 3
    },
    margin: {
      l: 10,
      r: 10,
      b: 10,
      t: 10,
      pad: 0
    },
    height: window.innerHeight - 100,
    width: window.innerWidth - 100,
    paper_bgcolor: '#191A1A',
    plot_bgcolor: '#191A1A',
  };

  let config = {responsive: true, displayModeBar: false}

  Plotly.newPlot('mapContainer', trace, layout, config);

  mapContainer.on('plotly_click', function(data){
    var infotext = data.points[0].data.text[data.points[0].pointIndex];

    var detailsBox = document.getElementById('detailBox');
    detailsBox.style.display = 'block';
    detailsBox.innerHTML = infotext;
  });
}

function create3DMap(data) {
  //const container = document.getElementById('mapContainer');
  //container.innerHTML = '';

}

function formatTime(timeStr) {
  return timeStr.padStart(4, '0').replace(/^(..)(..)$/, '$1:$2');
}

function updateDataCount(count) {
  document.getElementById('totalDataPoints').textContent = count;
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
