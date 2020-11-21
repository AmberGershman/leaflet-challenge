<h1>Mapping Earthquakes</h1>
<h3>Using GeoJSON, d3, and Leaflet</h3>

Welcome, Friends. 

The United States Geological Survey compiles data on every earthquake, globally. The information collected is deposited in a geojson file, accessible with an api call. This project seeks to use that geojson data to map the depth and magnitude of each quake in real time. 

We begin by building the HTML, linking to Leaflet, d3 and our app.js file. In the app.js file, we call the map and embed it into the html file. 

From there, we begin adding layers - the tile layer will allow the map to render with our API key. 

We then add the functions to determine the size and color of our markers, by passing the respective values through each function. 

And now, we start accessing our data. We declare the URL, and using d3, we make the api call. I had tried using   
