let is3D = false;

let mousePosition = { x: 0, y: 0 };

document.addEventListener('mousemove', (event) => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

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
  'D' : 'Daytime Fire',
  'N' : 'Nighttime Fire'
}

const dayNightStyle = {
  'D' : 'light',
  'N' : 'dark'
}

const statesLonLat = {
  'Alabama' : {lat: 32.7182 , lon: -86.9023 },
  'Alaska': {lat: 62.4673, lon: -151.2874},
  'Arizona': {lat: 34.0784, lon: -112.0740},
  'Arkansas': {lat: 34.7465, lon: -92.2896},
  'California': {lat: 36.7783, lon: -119.4179},
  'Colorado': {lat: 39.1501, lon: -105.7821},
  'Connecticut': {lat: 41.6032, lon: -73.0877},
  'Delaware': {lat: 39.2108, lon: -75.5277},
  'Florida': {lat: 27.9944, lon: -81.7603},
  'Georgia': {lat: 33.0406, lon: -83.6431},
  'Hawaii' : {lat: 20.6987 , lon: -157.6659 },
  'Idaho': {lat: 45.3682, lon: -114.7420},
  'Illinois': {lat: 39.7331, lon: -89.3985},
  'Indiana': {lat: 39.8512, lon: -85.6024},
  'Iowa': {lat: 41.8780, lon: -93.0977},
  'Kansas': {lat: 39.0119, lon: -98.4842},
  'Kentucky': {lat: 37.8393, lon: -84.2700},
  'Louisiana': {lat: 31.1695, lon: -91.8678},
  'Maine': {lat: 45.2538, lon: -69.4455},
  'Maryland': {lat: 39.0458, lon: -76.6413},
  'Massachusetts': {lat: 42.1072, lon: -71.3824},
  'Michigan': {lat: 44.3148, lon: -85.6024},
  'Minnesota': {lat: 46.5296, lon: -94.6859},
  'Mississippi': {lat: 32.3547, lon: -89.3985},
  'Missouri': {lat: 37.9643, lon: -91.8318},
  'Montana': {lat: 46.8797, lon: -110.3626},
  'Nebraska': {lat: 41.4925, lon: -99.9018},
  'Nevada': {lat: 38.8026, lon: -116.4194},
  'New Hampshire': {lat: 43.7939, lon: -71.5724},
  'New Jersey': {lat: 40.0583, lon: -74.4057},
  'New Mexico': {lat: 34.7869, lon: -105.9378},
  'New York': {lat: 42.1657, lon: -74.9481},
  'North Carolina': {lat: 35.7596, lon: -79.0193},
  'North Dakota': {lat: 47.5515, lon: -101.0020},
  'Ohio': {lat: 40.4173, lon: -82.9071},
  'Oklahoma': {lat: 35.0078, lon: -97.0929},
  'Oregon': {lat: 44.0282, lon: -120.3215},
  'Pennsylvania': {lat: 41.2033, lon: -77.1945},
  'Rhode Island': {lat: 41.7201, lon: -71.4774},
  'South Carolina': {lat: 33.8361, lon: -81.1637},
  'South Dakota': {lat: 43.9695, lon: -99.9018},
  'Tennessee': {lat: 35.5175, lon: -86.5804},
  'Texas': {lat: 31.9686, lon: -99.9018},
  'Utah': {lat: 39.3210, lon: -111.0937},
  'Vermont': {lat: 44.0588, lon: -72.5778},
  'Virginia': {lat: 37.7693, lon: -78.1700},
  'Washington': {lat: 47.4242, lon: -120.2272},
  'West Virginia': {lat: 38.5976, lon: -80.4549},
  'Wisconsin': {lat: 44.8929, lon: -89.5094},
  'Wyoming': {lat: 43.0759, lon: -107.2903},
}

const statesLonLat3D = {
  'Alabama': {lat: 32.7182, lng: -86.9023, altitude: 0.28},
  'Alaska': {lat: 60.4673, lng: -151.2874, altitude: 0.65},
  'Arizona': {lat: 33.0784, lng: -112.5740, altitude: 0.45},
  'Arkansas': {lat: 34.7465, lng: -92.6896, altitude: 0.32},
  'California': {lat: 36.7783, lng: -119.4179, altitude: 0.4},
  'Colorado': {lat: 39.1501, lng: -105.7821, altitude: 0.35},
  'Connecticut': {lat: 41.6032, lng: -73.0877, altitude: 0.22},
  'Delaware': {lat: 39.2108, lng: -75.5277, altitude: 0.3},
  'Florida': {lat: 27.9944, lng: -83.0603, altitude: 0.34},
  'Georgia': {lat: 32.5406, lng: -83.6431, altitude: 0.36},
  'Hawaii': {lat: 20.6987, lng: -157.6659, altitude: 0.24},
  'Idaho': {lat: 45.3682, lng: -114.7420, altitude: 0.34},
  'Illinois': {lat: 39.7331, lng: -89.3985, altitude: 0.34},
  'Indiana': {lat: 39.8512, lng: -85.6024, altitude: 0.34},
  'Iowa': {lat: 41.8780, lng: -93.0977, altitude: 0.34},
  'Kansas': {lat: 39.0119, lng: -98.4842, altitude: 0.34},
  'Kentucky': {lat: 37.8393, lng: -84.2700, altitude: 0.34},
  'Louisiana': {lat: 31.1695, lng: -91.8678, altitude: 0.34},
  'Maine': {lat: 45.2538, lng: -69.4455, altitude: 0.34},
  'Maryland': {lat: 39.0458, lng: -76.6413, altitude: 0.34},
  'Massachusetts': {lat: 42.1072, lng: -71.3824, altitude: 0.34},
  'Michigan': {lat: 44.3148, lng: -85.6024, altitude: 0.34},
  'Minnesota': {lat: 46.5296, lng: -94.6859, altitude: 0.34},
  'Mississippi': {lat: 32.3547, lng: -89.3985, altitude: 0.34},
  'Missouri': {lat: 37.9643, lng: -91.8318, altitude: 0.34},
  'Montana': {lat: 46.8797, lng: -110.3626, altitude: 0.34},
  'Nebraska': {lat: 41.4925, lng: -99.9018, altitude: 0.34},
  'Nevada': {lat: 38.8026, lng: -116.4194, altitude: 0.34},
  'New Hampshire': {lat: 43.7939, lng: -71.5724, altitude: 0.34},
  'New Jersey': {lat: 40.0583, lng: -74.4057, altitude: 0.34},
  'New Mexico': {lat: 34.7869, lng: -105.9378, altitude: 0.34},
  'New York': {lat: 42.1657, lng: -74.9481, altitude: 0.34},
  'North Carolina': {lat: 35.7596, lng: -79.0193, altitude: 0.34},
  'North Dakota': {lat: 47.5515, lng: -101.0020, altitude: 0.34},
  'Ohio': {lat: 40.4173, lng: -82.9071, altitude: 0.34},
  'Oklahoma': {lat: 35.0078, lng: -97.0929, altitude: 0.34},
  'Oregon': {lat: 44.0282, lng: -120.3215, altitude: 0.34},
  'Pennsylvania': {lat: 41.2033, lng: -77.1945, altitude: 0.34},
  'Rhode Island': {lat: 41.7201, lng: -71.4774, altitude: 0.34},
  'South Carolina': {lat: 33.8361, lng: -81.1637, altitude: 0.34},
  'South Dakota': {lat: 43.9695, lng: -99.9018, altitude: 0.34},
  'Tennessee': {lat: 35.5175, lng: -86.5804, altitude: 0.34},
  'Texas': {lat: 31.9686, lng: -99.9018, altitude: 0.34},
  'Utah': {lat: 39.3210, lng: -111.0937, altitude: 0.34},
  'Vermont': {lat: 44.0588, lng: -72.5778, altitude: 0.34},
  'Virginia': {lat: 37.7693, lng: -78.1700, altitude: 0.34},
  'Washington': {lat: 47.4242, lng: -120.2272, altitude: 0.34},
  'West Virginia': {lat: 38.5976, lng: -80.4549, altitude: 0.34},
  'Wisconsin': {lat: 44.8929, lng: -89.5094, altitude: 0.34},
  'Wyoming': {lat: 43.0759, lng: -107.2903, altitude: 0.34}
};

const statesZoom = {
  'Alabama' : 6.3,
  'Alaska': 3.5,
  'Arizona': 6,
  'Arkansas': 6.6,
  'California': 5,
  'Colorado': 6.4,
  'Connecticut': 7.7,
  'Delaware': 7.7,
  'Florida': 5.9,
  'Georgia': 6.1,
  'Hawaii' : 6.4,
  'Idaho': 5.4,
  'Illinois': 5.9,
  'Indiana': 6.3,
  'Iowa': 6.4,
  'Kansas': 6.2,
  'Kentucky': 6.2,
  'Louisiana': 6.3,
  'Maine': 5.9,
  'Maryland': 6.5,
  'Massachusetts': 7.4,
  'Michigan': 5.8,
  'Minnesota': 5.6,
  'Mississippi': 6.1,
  'Missouri': 5.9,
  'Montana': 5.4,
  'Nebraska': 5.8,
  'Nevada': 5.5,
  'New Hampshire': 6.8,
  'New Jersey': 6.8,
  'New Mexico': 5.8,
  'New York': 5.4,
  'North Carolina': 6.1,
  'North Dakota': 5.8,
  'Ohio': 6,
  'Oklahoma': 6.1,
  'Oregon': 5.9,
  'Pennsylvania': 6.2,
  'Rhode Island': 8.8,
  'South Carolina': 6.3,
  'South Dakota': 5.6,
  'Tennessee': 6.2,
  'Texas': 5,
  'Utah': 5.6,
  'Vermont': 6.4,
  'Virginia': 6.2,
  'Washington': 6.3,
  'West Virginia': 6.3,
  'Wisconsin': 6,
  'Wyoming': 6
};

const monthText = {
  0: 'All Month',
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

let currentCenter = null;

document.addEventListener('DOMContentLoaded', function() {
  updateDateRange();
});

function filterData(data) {
  let filteredData = data;
  const stateFilter = document.getElementById('stateFilter').value;

  // Day night filter
  const typeDay = document.getElementById('typeDay').checked;
  const typeNight = document.getElementById('typeNight').checked;

  // Type of fire filter
  const typePVF = document.getElementById('typePVF').checked;
  const typeOSLS = document.getElementById('typeOSLS').checked;
  const typeO = document.getElementById('typeO').checked;
  const typeAV = document.getElementById('typeAV').checked;
  
  const dateFilter = document.getElementById('dateFilter').value;
  const monthFilter = document.getElementById('monthSlider').value;

  if (stateFilter === "Select State") {
    return filteredData;
  }
  if (stateFilter) {
    filteredData = filteredData.filter(d => d.state_name === stateFilter);
    currentZoom = 5;
  }
  if (typeDay || typeNight) {
    filteredData = filteredData.filter(d => {
      if (typeDay && d.daynight === "D") {
        return true;
      }
      if (typeNight && d.daynight === "N") {
        return true;
      }
      return false;
    });
  }
  if (typePVF || typeOSLS || typeO || typeAV) {
    filteredData = filteredData.filter(d => {
      if (typePVF && d.type === "0") {
        return true;
      }
      if (typeOSLS && d.type === "2") {
        return true;
      }
      if (typeO && d.type === "3") {
        return true;
      }
      if (typeAV && d.type === "1") {
        return true;
      }
      return false;
    });
  }
  if (dateFilter) {
    filteredData = filteredData.filter(d => d.acq_date === dateFilter);
  }
  if (monthFilter == "0") {
    return filteredData;
  }
  if (monthFilter !== "0") {
    filteredData = filteredData.filter(d => {
      const month = new Date(d.acq_date).getMonth() + 1;
      return month.toString() === monthFilter;
    });
  }
  return filteredData;
}

function loadYearData(year) {
  const dataPath = `./data/modis_${year}_United_States.csv`;
  let currentLayout = getPlotlyLayout('map2D');
  currentCenter = currentLayout.center;
  currentZoom = currentLayout.zoom;

  d3.csv(dataPath).then((data) => {
    let filteredData = filterData(data);
    updateDataCount(filteredData.length);
    let states = document.getElementById('stateFilter').value;
    let latLon = statesLonLat[states];
    let dayNight = 'N';
    let style = dayNightStyle[dayNight];
    currentZoom = statesZoom[states];
    createGeoGraph(filteredData, currentZoom, latLon, style);
  });
}


document.getElementById('yearSlider').addEventListener('input', function() {
  const year = this.value;
  document.getElementById('yearDisplay').textContent = year;
  updateDateRange();
});

document.getElementById('monthSlider').addEventListener('input', function() {
  const month = this.value;
  document.getElementById('monthDisplay').textContent = monthText[month];
  updateDateRange();
});

function updateDateRange() {
  const year = document.getElementById('yearSlider').value;
  const month = document.getElementById('monthSlider').value;

  let minDate, maxDate;
  if (month === "0") { // Represents the whole year
    minDate = `${year}-01-01`;
    maxDate = `${year}-12-31`;
  } else {
    const daysInMonth = new Date(year, month, 0).getDate();
    minDate = `${year}-${String(month).padStart(2, '0')}-01`;
    maxDate = `${year}-${String(month).padStart(2, '0')}-${daysInMonth}`;
    document.getElementById('monthDisplay').textContent = monthText[month];
  }

  document.getElementById('dateFilter').setAttribute('min', minDate);
  document.getElementById('dateFilter').setAttribute('max', maxDate);
}


//default value
loadYearData('2001');


document.getElementById('stateFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typeDay').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typeNight').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typePVF').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typeOSLS').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typeO').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('typeAV').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('dateFilter').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('monthSlider').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));
document.getElementById('yearSlider').addEventListener('change', () => loadYearData(document.getElementById('yearSlider').value));

// document.addEventListener('DOMContentLoaded', () => {
//   // Reference to the checkbox inside the toggle3D div
//   const toggleCheckbox = document.querySelector('#toggle3D .checkbox');

//   // Event listener for the checkbox change
//   toggleCheckbox.addEventListener('change', function() {
//     if (this.checked) {
//       // Checkbox is checked - switch to 3D view
//       document.getElementById('map2D').style.display = 'none';
//       document.getElementById('map3D').style.display = 'block';
//     } else {
//       // Checkbox is not checked - switch to 2D view
//       document.getElementById('map2D').style.display = 'block';
//       document.getElementById('map3D').style.display = 'none';
//     }
//   });

// });

// Add a button click event listener


function createGeoGraph(data, currentZoom, currentCenter, style) {
  if (is3D) {
    let states = document.getElementById('stateFilter').value;
    currentCenter = statesLonLat3D[states];
    create3DMap(data, currentCenter);
  } else {
    create2DMap(data, currentZoom, currentCenter, style);
  }
}

function create2DMap(data, currentZoom, currentCenter, style) {
  document.getElementById('toggle3D').innerHTML = "<span class=\"material-icons\">public</span> Toggle 3D View";
  document.getElementById('map3D').style.display = 'none';
  const container = document.getElementById('map2D');
  container.style.display = 'block';

  let minBrightness = data.reduce((min, p) => p.bright_t31 < min ? p.bright_t31 : min, data[0].bright_t31);
  let maxBrightness = data.reduce((max, p) => p.bright_t31 > max ? p.bright_t31 : max, data[0].bright_t31);
  let colors = data.map(d => brightnessToColor(d.bright_t31));

  function brightnessToColor(brightness) {
    const max = maxBrightness;
    const hue = (1 - brightness / max) * 240;
    return `hsl(${hue}, 100%, 50%)`;
  }

  function updateColorRangeBar(minValue, maxValue) {
    const gradientStart = brightnessToColor(minValue);
    const gradientEnd = brightnessToColor(maxValue);
    const colorRangeBar = document.getElementById('colorRangeBar');
    colorRangeBar.style.background = `linear-gradient(to top, ${gradientStart}, ${gradientEnd})`;

    const colorRangeRange = document.getElementById('colorRangeRange');
    const colorDetails = `
    <div>
      ${maxValue}
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      ${minValue}
    </div>
      `;
    colorRangeRange.innerHTML = colorDetails;
  }

  function updateColorRangePoint(brightness) {
    const colorRangePoint = document.getElementById('colorRangePoint');
    const normalized = (brightness - minBrightness) / (maxBrightness - minBrightness);
    const value = normalized * 90;
    colorRangePoint.style.bottom = `${value}%`;
    colorRangePoint.style.display = 'initial';
  }

  function getDetail(d) {
    const typeDescription = typeMapping[d.type] || 'Unknown';
    const dayNightDescription = dayNightMapping[d.daynight] || 'Unknown';
    const date = new Date(d.acq_date).toDateString();

    return `
      <div>
        <b style="font-size: 24px;">${d.state_name}</b> 
      </div>
      <br />
      <div style="font-size: 18px;">
        <b title="Approximate latitude of the fire">Lat:</b> ${d.latitude}
        <b title="Approximate longitude of the fire">Long:</b> ${d.longitude}
      </div>
      <br />
      <div style="font-size: 18px;">
        <b>Date:</b> ${date} <br />
        <b>Time:</b> ${formatTime(d.acq_time)} UTC (${dayNightDescription})
      </div>
      <br />
      <div style="font-size: 18px;">
        <b title="Brightness temperature of the fire measured in Kelvin">Temperature:</b> ${d.bright_t31} Kelvin <br /><br />
        <b>Type:</b> ${typeDescription}
      </div>
      <br />
      <i style="color: darkgray;">Taken by Satellite ${d.satellite}</i> 
  `;
  }

// Call this function with the min and max values of your data
  updateColorRangeBar(minBrightness, maxBrightness);

  let trace = [
    {
      type: 'scattermapbox',
      mode: 'markers',
      lat: data.map(d => d.latitude),
      lon: data.map(d => d.longitude),
      text: data.map(d => `<b>State:</b> ${d.state_name}<br><b>Date:</b> ${d.acq_date}<br><b>Temperature:</b> ${d.bright_t31} Kelvin`),
      hoverinfo: 'text',
      customdata: data.map(d => getDetail(d)),
      brightness: data.map(d => d.bright_t31),
      marker: {
        color: colors,
        size: 12, 
        opacity: 0.8
      },
      showlegend: false
    }
  ];

  let layout = {
    autosize: true,
    mapbox: {
      style: style || 'carto-positron',
      center: currentCenter || { lat: 37.0902, lon: -95.7129 },
      zoom: currentZoom || 3
    },
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0
    },
    paper_bgcolor: '#191A1A',
    plot_bgcolor: '#191A1A',
    legend: {
      orientation: 'h', // Horizontal layout of legend items
      x: 0.5, // Center the legend horizontally
      xanchor: 'center', // Anchor the legend at its center
      y: -0.1, // Position the legend below the bottom of the plot
      yanchor: 'top' // Anchor the legend at its top
    },
  };

  let config = {responsive: true, displayModeBar: false, mapboxAccessToken: 'pk.eyJ1IjoiYWxleGFuZGVyaHVuZyIsImEiOiJjbG8xY2VnMXcwc2x0MmxvZHBmNTVpYjM3In0.nghzNs8d4lg_MLvHETaB_w'}

  Plotly.newPlot('map2D', trace, layout, config);

  let selectedPointIndex = null; // To track the selected point
  let allSpecialTraces = []; // To keep track of all special traces with their names

  // Function to update the colors of the original data points
  function updateOriginalDataPointColors() {
    let newColors;
    if (allSpecialTraces.length > 0) {
      // Set all original data points to gray if there's at least one special trace
      newColors = data.map(() => 'gray');
    } else {
      // Revert back to original colors if there are no special traces
      newColors = data.map(d => brightnessToColor(d.bright_t31));
    }

    var update = {
      'marker.color': newColors
    };
    Plotly.restyle('map2D', update);
  }

  // Function to add a special trace for a clicked data point
  function addSpecialTrace(pointData, traceName) {
    let specialTrace = {
      name: traceName,
      type: 'scattermapbox',
      mode: 'markers',
      lat: [pointData.lat],
      lon: [pointData.lon],
      text: pointData.text, // Set the hover text
      hoverinfo: 'text', // Display text on hover
      marker: {
        color: 'purple',
        size: 15,
        opacity: 1
      },
      showlegend: false
    };

    Plotly.addTraces('map2D', specialTrace);
  }

// Function to remove a special trace based on the clicked point index
  function removeSpecialTrace(clickedPointIndex) {

    //console.log("in remove function: " + clickedPointIndex);
    let traceToRemove = allSpecialTraces.find(trace => trace.name === `Data_${clickedPointIndex}`);
    //console.log("trace To remove" + traceToRemove)
    if (traceToRemove) {
      let plotElement = document.getElementById('map2D');
      let plotData = plotElement.data;
      let traceIndex = plotData.findIndex(trace => trace.name === traceToRemove.name);

      if (traceIndex !== -1) {
        Plotly.deleteTraces('map2D', traceIndex);
        allSpecialTraces = allSpecialTraces.filter(trace => trace.name !== `Data_${clickedPointIndex}`);
        //console.log("allSpecialTraces" + allSpecialTraces)
      }
    }

    //console.log("After removing a trace:", allSpecialTraces);
  }

// Event handler for clicks on the map
  map2D.on('plotly_click', function(data){

    var clickedTraceName = data.points[0].data.name;

    // Ignore clicks on special traces
    if (clickedTraceName && clickedTraceName.startsWith('Data_')) {
      // Extracting index from the trace name
      let ignoredIndex = clickedTraceName.split('_')[1];
      //console.log("Clicked on a special trace, ignoring index:", ignoredIndex);

      return removeSpecialTrace(ignoredIndex);
    }

    // Handling clicks on original traces
    var clickedPointIndex = data.points[0].pointIndex;
    //console.log("Clicked on original trace, index:", clickedPointIndex);

    if (selectedPointIndex === clickedPointIndex) {
      //console.log("Second click on the same original trace");
      removeSpecialTrace(clickedPointIndex);
      selectedPointIndex = null;
    } else {
      //console.log("First click on an original trace");
      if (!allSpecialTraces.some(trace => trace.index === clickedPointIndex)) {
        let traceName = `Data_${clickedPointIndex}`;
        addSpecialTrace(data.points[0], traceName);
        allSpecialTraces.push({ index: clickedPointIndex, name: traceName });
      }
      selectedPointIndex = clickedPointIndex;
    }

    // Display details of the clicked point
    openDetailContainer(data.points[0].data.customdata[clickedPointIndex]);

    updateColorRangePoint(Number(data.points[0].data.brightness[clickedPointIndex]));
  });

  // Default 2D detail container
  openDetailContainer("Select a point to learn more about the wildfire.");

  document.getElementById('showNumData').style.display = 'none';
}

function create3DMap(data, currentCenter) {
  document.getElementById('toggle3D').innerHTML = "<span class=\"material-icons\">map</span> Toggle 2D View";

  document.getElementById('map2D').style.display = 'none';
  const container = document.getElementById('map3D');
  container.style.display = 'block';

  // Add an event listener to the button
  document.getElementById('showNumDataButton').addEventListener('click', function () {
    updateNumDataPoints();
  });

  let showNumData = 1000;

  // Display instruction for number of data points
  openDetailContainer("To reduce lag, number of data points is limited to 1000 points. Edit this value in the left sidebar.");

  function updateNumDataPoints() {
    const showNumDataInput = document.getElementById('showNumDataInput');
    showNumData = parseInt(showNumDataInput.value);

    // Check if the input value is a valid number
    if (!isNaN(showNumData)) {
      // Update the number of data points on the map
      world.pointsData(modifiedData.sort((a, b) => b.brightness - a.brightness).slice(0, showNumData));
    } else {
      // Handle invalid input (e.g., display an error message)
      alert('Please enter a valid number of data points.');
    }
  }

  let minBrightness = data.reduce((min, p) => p.bright_t31 < min ? p.bright_t31 : min, data[0].bright_t31);
  let maxBrightness = data.reduce((max, p) => p.bright_t31 > max ? p.bright_t31 : max, data[0].bright_t31);


  // Normalize brightness
  let brightnessArr = data.map(obj => obj.bright_t31);
  brightnessArr = normalize(brightnessArr);
  data = data.map((obj, index) => ({ ...obj, brightness: brightnessArr[index] }));

  // Rename keys
  const modifiedData = data.map(obj => ({
    lat: obj.latitude,
    lng: obj.longitude,
    temp: obj.bright_t31,
    brightness: obj.brightness,
    state: obj.state_name,
    date: obj.acq_date,
    time: formatTime(obj.acq_time),
    dayNight: dayNightMapping[obj.daynight] || 'Unknown',
    type: typeMapping[obj.type] || 'Unknown',
    satellite: obj.satellite
  }));

  function brightnessToColor(brightness) {
    const max = maxBrightness * 0.0001; // Assuming max brightness is scaled to 5
    const hue = (1 - brightness / max) * 240; // Scale to a hue value
    return `hsl(${hue}, 100%, 50%)`;
  }

  function updateColorRangeBar(minValue, maxValue) {
    const gradientStart = brightnessToColor(minValue * 0.0001);
    const gradientEnd = brightnessToColor(maxValue);

    const colorRangeBar = document.getElementById('colorRangeBar');
    colorRangeBar.style.background = `linear-gradient(to top, ${gradientStart}, ${gradientEnd})`;

    const colorRangeRange = document.getElementById('colorRangeRange');
    const colorDetails = `
    <div>
      ${maxValue}
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      ${minValue}
    </div>
      `;
    colorRangeRange.innerHTML = colorDetails;
  }

  function updateColorRangePoint(brightness) {
    const colorRangePoint = document.getElementById('colorRangePoint');
    const normalized = (brightness - minBrightness) / (maxBrightness - minBrightness);
    const value = normalized * 90;
    colorRangePoint.style.bottom = `${value}%`;
    colorRangePoint.style.display = 'initial';
  }

  updateColorRangeBar(minBrightness, maxBrightness);

  function handlePointClick(pointData) {
    const date = new Date(pointData.date).toDateString();
    updateColorRangePoint(pointData.temp);

    // Format the data to be displayed, e.g., as a string or HTML
    const dataDetails = `
      <div>
        <b style="font-size: 24px;">${pointData.state}</b> 
      </div>
      <br />
      <div style="font-size: 18px;">
        <b title="Approximate latitude of the fire">Lat:</b> ${pointData.lat}
        <b title="Approximate longitude of the fire">Long:</b> ${pointData.lng}
      </div>
      <br />
      <div style="font-size: 18px;">
        <b>Date:</b> ${date} <br />
        <b>Time:</b> ${pointData.time} UTC (${pointData.dayNight})
      </div>
      <br />
      <div style="font-size: 18px;">
        <b title="Brightness temperature of the fire measured in Kelvin">Temperature:</b> ${pointData.temp} Kelvin <br /><br />
        <b>Type:</b> ${pointData.type}
      </div>
      <br />
      <i style="color: darkgray;">Taken by Satellite ${pointData.satellite}</i>
    `;

    // Display the data in the detailBox
    openDetailContainer(dataDetails);
    // detailBox.innerHTML = dataDetails;
  }

  function handlePointHover(point, prevPoint) {
    const hoverInfo = document.getElementById('hoverInfo');

    if (point) {
      // Format and display the data in hoverInfo
      hoverInfo.innerHTML = `State: ${point.state}<br>Date: ${point.date}<br>Temperature: ${point.temp} Kelvin`;
      // Use the brightnessToColor function to get the color based on point data
      const pointColor = brightnessToColor(point.brightness);

      // Set the background and border color of the tooltip
      hoverInfo.style.background = pointColor;
      hoverInfo.style.borderColor = pointColor;

      // Position the tooltip
      hoverInfo.style.left = (mousePosition.x + 20) + 'px';
      hoverInfo.style.top = (mousePosition.y + 10) + 'px';
      hoverInfo.style.display = 'block';
    } else if (prevPoint) {
      hoverInfo.style.display = 'none';
    }
  }


  // Initialize the globe
  const world = Globe();
  world(container)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointsData(modifiedData.sort((a, b) => b.brightness - a.brightness).slice(0, showNumData))
      .pointAltitude('brightness')
      .pointColor(d => brightnessToColor(d.brightness))
      .onPointClick(handlePointClick)
      .pointsMerge(false)
      .onPointHover(handlePointHover)

  world.pointOfView(currentCenter || { lat: 39.8, lng: -120.6, altitude: 1.5 });

  // Define the maximum and minimum longitudes to restrict rotation
  const minLng = -169;
  const maxLng = -50;
  // Add an event listener for zoom/rotation changes
  world.onZoom((pointOfView) => {
    if (pointOfView.lng < minLng) { // beyond Hawaii
      world.pointOfView({ lng: minLng });
    }
    else if (pointOfView.lng > maxLng) { // beyond east coast
      world.pointOfView({ lng: maxLng });
    }
  });

  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    world.width(width).height(height);
  }

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  // Initial call to set up the initial size
  handleResize();

  document.getElementById('showNumData').style.display = 'block';
}

function normalize(x) {
  let xnormalized = x.map((item) => (item * 0.0001));
  return xnormalized;
}

function formatTime(timeStr) {
  if (typeof timeStr === 'string' && timeStr) {
    return timeStr.padStart(4, '0').replace(/^(..)(..)$/, '$1:$2');
  } else {
    return 'Time not available';
  }
}

function updateDataCount(count) {
  document.getElementById('totalDataPoints').textContent = count;
}

function openDetailContainer(infotext) {
  document.getElementById('detailContainer').style.display = "initial";
  document.getElementById('closeButton').style.display = "initial";
  var detailsBox = document.getElementById('detailBox');
  detailsBox.style.display = 'block';
  var detailsBoxText = document.getElementById('detailBoxText');
  detailsBoxText.innerHTML = infotext;
}

function closeDetailContainer() {
  document.getElementById('detailContainer').style.display = "none";
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

const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarFooter = document.querySelector('.sidebar-footer');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('is-closed');
  sidebar.classList.toggle('is-closed');
  sidebarFooter.classList.toggle('is-closed');
})

// Expands and contracts expandContainer within typeContainer in sidebar
function expandContract() {
  const container = document.getElementById("expandContainer");
  container.classList.toggle('expanded');
  container.classList.toggle('collapsed');
  
  const content = document.getElementById("expandContract");
  content.classList.toggle('expanded');
  content.classList.toggle('collapsed');
}

function expandContract2() {
  const container = document.getElementById("expandContainer2");
  container.classList.toggle('expanded');
  container.classList.toggle('collapsed');

  const content = document.getElementById("expandContract2");
  content.classList.toggle('expanded');
  content.classList.toggle('collapsed');
}

var input = document.getElementById("showNumDataInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("showNumDataButton").click();
  }
});