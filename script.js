mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJkamFtMDUiLCJhIjoiY2swczV1NGc5MDEzbDNtbGhjdnkxMW0xcSJ9.c4FnTfVtw_J_yx6ZRBCfgw"; // access token
// creates map
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/abdjam05/ckdmviy070ju51imwvxwxgoav", // style URL
});

map.on("load", function () {
  // key and legend
  var years = ["2017", "2018", "2019"];
  var layers = [
    "300,000 - 400,000",
    "400,000 - 500,000",
    "500,000 - 600,000",
    "600,000 - 700,000",
    "700,000 - 800,000",
    "800,000+",
  ];
  var colors = [
    "#006767",
    "#329999",
    "#84c1c1",
    "#c68191",
    "#ad4e64",
    "#99223e",
  ];
  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement("div");
    var key = document.createElement("span");
    key.className = "legend-key";
    key.style.backgroundColor = color;

    var value = document.createElement("span");
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
  function filterBy(year) {
    var filters = ["==", "year", year];
    map.setFilter("city_data", filters);

    // Set the label to the month
    document.getElementById("year").textContent = years[year];
  }
  d3.json("https://studio.mapbox.com/tilesets/abdjam05.1632e7rg/", function (
    err,
    data
  ) {
    if (err) throw err;

    // Create a month property value based on time
    // used to filter against.
    data.features = data.features.map(function (d) {
      d.properties.year = new Date(d.properties.time).getYear();
      return d;
    });

    // Set filter to first month of the year
    // 0 = January
    filterBy(0);

    document.getElementById("slider").addEventListener("input", function (e) {
      var year = parseInt(e.target.value, 10);
      filterBy(year);
    });
  });
});

//code for mouse moving
map.on("mousemove", function (e) {
  var suburbs = map.queryRenderedFeatures(e.point, {
    layers: ["city_data"],
  });

  if (suburbs.length > 0) {
    document.getElementById("pd").innerHTML =
      "<h3><strong>" +
      suburbs[0].properties.suburb +
      "</strong></h3><p><strong> $ <em>" +
      suburbs[0].properties.Year +
      "</strong> Average house price </em></p>" +
      "<h3><p><strong>" +
      suburbs[0].properties.Median_Homes_Estimaten +
      "</strong></h3></p>";
  } else {
    document.getElementById("pd").innerHTML = "<p>Hover over a suburb!</p>";
  }
});

// toggle switch
