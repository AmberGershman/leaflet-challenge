<h1>Mapping Earthquakes</h1>
<h3>Using GeoJSON, d3, and Leaflet</h3>

Welcome, Friends. 

The United States Geological Survey compiles data on every earthquake, globally. The information collected is deposited in a geojson file, accessible with an api call. This project seeks to access that geojson data to map the depth and magnitude of each quake in real time. 

We begin by building the HTML, linking to Leaflet, d3 and our app.js file. In the app.js file, we call the map and embed it into the html file. 

From there, we add the functions to determine the size and color of our markers, by passing the respective values through each function.

And now, we start accessing our data. We declare the URL, and using d3, we make the api call. We pass the data through the geojson filter and define the functions we want to use. Specifically, we want to mark each entry in the api dictionary. OnEachFeature allows enables us to define the functions we want assigned to each earthquake plotted, for example:  when we mouse over each value, we can change the style/shape or information provided, and bind earthquake details when clicked upon. We tell javascript that for each entry, we want to create a new plot, with the size and color filtered through the respective functions, and all points to the map. 

We then start to assemble the map - the tile layer will allow the map to render with our API key. 

The mouseover function, included in the original geojson loop, allow us to highlight each earthquake when hovered over whereas mouseout will reset the style value to the original version when the mouse is removed. 

Finally, we add the legend. The color of each earthquake is defined by its depth. The legend, in the bottom righthand corner, will allow us to explain the color codes. As the legend is not included in the HTML file, we need to create new HTML structures to support our key. We then define the limits we used to determine the bins in the depth color system and add an empty label list. Once we set up a for loop that will cycle through the limits and the color function, it will push the pair to the labels list and generate new HTML code to support the description. 

Finally, we append the legend to the map and we have a fully functional map. 
