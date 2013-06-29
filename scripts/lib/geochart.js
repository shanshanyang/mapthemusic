// load country json

google.load('visualization', '1', {'packages': ['geochart']});

google.setOnLoadCallback(function () {
  // $(function() {
    // load full countries list here
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

    var charDiv = document.getElementById('chart_div'),
        chart = new google.visualization.GeoChart(charDiv);

    // add Throbber before char loaded
    require(['$views/throbber#Throbber'],function(Throbber){
      var throbber = Throbber.forElement(charDiv);
      throbber.hideContent();
      throbber.hide();
      throbber.show();
    });

    // add event listeners for RegionClick/ready/select before draw()
    google.visualization.events.addListener(chart, "regionClick", function (eventData) {
        require(['$api/models'],function(models){
          var player = models.player;
          if(eventData.region === "RU"){
            alert("you get the answer right");
           // player.playing = !(player.playing);
           console.log(player);
          }else{
            alert("try again");
            // player.playing = true;
          }
        });
        // displaySearchResults(countryISO2, inputCountryToValUpCase); 
        console.log("regionClick eventData", eventData);
    });

    google.visualization.events.addListener(chart, "ready", function (eventData) {
        console.log("ready eventData", eventData);
        $('#chart_div').find('path[fill!="#f5f5f5"]').css('cursor', 'pointer');
    });

    google.visualization.events.addListener(chart, "select", function (eventData) {
        // var countryISO2 = eventData["region"];
        // inputCountryToValUpCase = "world";
        // displaySearchResults(countryISO2, inputCountryToValUpCase); 
        console.log("select eventData", eventData);
    });

    chart.draw(data, options);
  // });
    // remove Throbber when the chart is drawn
   // document.getElementById('chart_div').removeChild(document.getElementsByClassName("sp-throbber"));
   require(['$views/throbber#Throbber'],function(Throbber){
      var throbber = Throbber.forElement(charDiv);
      throbber.hide();
      throbber.showContent();
    });
});