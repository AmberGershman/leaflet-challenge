function markerSize(mag) {
  return (mag) * 10
};

function markerColor(depth) {
  return depth > 30 ? '#FF9F1C' :
  depth >= 20 ? '#E71D36' :
  depth >= 10 ? '#2EC4B6' :
  depth >= 5 ? '#FDFFFC' :
  depth >= 0 ? '#011627' :
             '#5899E2';
};

var usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//accessing earthquake data
d3.json(usgs, function (earthquakes) {
  geojson = L.geoJSON(earthquakes.features, {
    onEachFeature: function (feature, layer) {
      layer.on({
        mouseover: highlightQuake,
        mouseout: resetHighlight
      }),
        layer.bindPopup("<h2>Place: " + feature.properties.place + "</h2><hr><h3>Magnitude: " + feature.properties.mag + "<br> Depth: " + feature.geometry.coordinates[2] + "</h3>");
    },
    pointToLayer: function (feature, latlng) {
      return new L.circleMarker(latlng,
        { radius: markerSize(feature.properties.mag) }
      );
    },
    style: function (feature) {
      return {
        color: markerColor(feature.geometry.coordinates[2])
      }
    }
  }).addTo(myMap)
});


var myMap = L.map("map", {
  center: [41.0000, -99.1099],
  zoom: 4,
  // layers: layer
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var info = L.control();

function highlightQuake(quake) {
  var layer = quake.target;

  layer.setStyle({
    weight: 2,
    color: '#4B296B',
    dashArray: '',
    fillOpacity: 0.7
  });
};

	function resetHighlight(quake) {
		geojson.resetStyle(quake.target);
	};



var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    depth = [">0", 0, 5, 10, 20, 30],
    labels = [];

		for (var i = 0; i < depth.length; i++) {
			from = depth[i];
			to = depth[i + 1];

			labels.push(
				'<i style="background:' + markerColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(myMap);
