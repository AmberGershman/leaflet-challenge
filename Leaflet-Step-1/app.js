var myMap = L.map("map", {
  center: [41.0000, -99.1099],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function markerSize(mag) {
  return (mag) * 20000
};

function markerColor(depth) {
  if (depth >= 30) {
    return "#FF9F1C";
  }
  if (depth >= 20) {
    return "#E71D36";
  }
  if (depth >= 10) {
    return "#2EC4B6";
  }
  if (depth >= 5) {
    return "#FDFFFC";
  }
  if (depth <= 0) {
    return "#011627";
  }
  else {
    return "#5899E2";
  }
};

var usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//accessing earthquake data
d3.json(usgs, function(earthquakes){
  for (var i =0; i <earthquakes.features.length; i++){
      var locs = earthquakes.features[i];

      if (locs && locs.properties && locs.properties.mag){
          L.circle([locs.geometry.coordinates[1],locs.geometry.coordinates[0]],{
              radius:markerSize(locs.properties.mag),
              weight: 1,
              fillColor: markerColor(locs.geometry.coordinates[2]),
              fillOpacity: 0.8,
          }).bindPopup("<h3>Location: " + locs.properties.place +"</h3> <hr> <h4>Mag: "+ locs.properties.mag+"<br>Depth: "+ locs.geometry.coordinates[2] + "<hr> Time: "+ new Date(locs.properties.time)+ "</h4>").addTo(myMap);
      }
  }
});
  // console.log(earthquakes.features[1].properties)
  //   mags.push(earthquakes.features[i].properties.mag)
  //   coords.push([earthquakes.features[i].geometry.coordinates[1], earthquakes.features[i].geometry.coordinates[0]])
  //   var detail = earthquakes.features[i].properties.detail
  //   L.circle([earthquakes.features[i].geometry.coordinates[1], earthquakes.features[i].geometry.coordinates[0]], {
  //     fillOpacity: 0.75,
  //     fillColor: markerColor(depth),
  //     radius: markerSize(earthquakes.features[i].properties.mag),
  //   }).bindPopup("<h2> " + earthquakes.features[i].properties.place + "</h2> <hr> <h3> Time " + new Date(earthquakes.features[i].properties.time) + "<hr> Magnitude: " + earthquakes.features[i].properties.mag + "<br> Depth: " + earthquakes.features[i].geometry[2] + "</h3>").addTo(myMap)
  // }
  // });