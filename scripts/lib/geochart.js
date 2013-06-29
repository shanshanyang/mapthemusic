require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';
// $(document).ready(function(){
// console.log("sp", List, models);
  google.load('visualization', '1', {'packages': ['geochart']});
  google.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 700]
    ]);

    var options = {
        region: 'world',
        magnifyingGlass: {enable: true, zoomFactor: 5.0},
        resolution: 'countries'};

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

    // add event listeners for RegionClick/ready/select before draw()
    google.visualization.events.addListener(chart, "regionClick", function (eventData) {
        // var countryISO2 = eventData["region"];
        // inputCountryToValUpCase = "world";
        var player = models.player;
        console.log(player.playing);
        if(eventData.region === "RU"){
         player.playing = !(player.playing);
        }else{
          player.playing = true;
        }
        // displaySearchResults(countryISO2, inputCountryToValUpCase); 
        console.log("regionClick eventData", eventData);
    });

    google.visualization.events.addListener(chart, "ready", function (eventData) {
        // var countryISO2 = eventData["region"];
        // inputCountryToValUpCase = "world";
        // displaySearchResults(countryISO2, inputCountryToValUpCase); 
        console.log("ready eventData", eventData);
    });

    google.visualization.events.addListener(chart, "select", function (eventData) {
        // var countryISO2 = eventData["region"];
        // inputCountryToValUpCase = "world";
        // displaySearchResults(countryISO2, inputCountryToValUpCase); 
        console.log("select eventData", eventData);
    });

    chart.draw(data, options);
  };

  exports.drawRegionsMap = drawRegionsMap;

});
