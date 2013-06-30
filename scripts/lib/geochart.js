// load country json
var dataArr = [];
for(var key in countries){
  dataArr.push([key, countries[key]]);
}

google.load('visualization', '1', {'packages': ['geochart']});

google.setOnLoadCallback(function () {

    // load full countries list here
    var data = google.visualization.arrayToDataTable(dataArr);

    var options = {
        region: 'world',
        magnifyingGlass: {enable: true, zoomFactor: 5.0},
        resolution: 'countries'};

    var charDiv = document.getElementById('chart_div'),
        chart = new google.visualization.GeoChart(charDiv);

    // add Throbber before char loaded
    require(['$views/throbber#Throbber'],function(Throbber){
      var throbber = Throbber.forElement(charDiv);
      
      newThrobber = throbber;
      throbber.hideContent();
      throbber.hide();
      throbber.show();
    });
    // add event listeners for RegionClick/ready/select before draw()
    google.visualization.events.addListener(chart, "regionClick", function (eventData) {
        require(['$api/models'],function(models){
          var player = models.player,
              currentTrack = player.track;
          console.log(currentTrack);
          if(eventData.region === "IT" && currentTrack.name === "La Cumparsita"){
            alert("you get the answer right. " + currentTrack.artists[0].name + " is from " + countries[eventData.region]);
           // player.playing = true;
           // mapmusic.playNextTrack = true;
           // player.next();
          }else if(eventData.region === "MX" && currentTrack.name === "El Rey"){
             alert("you get the answer right. " + currentTrack.artists[0].name + " is from " + countries[eventData.region]);
           
          }else if(eventData.region === "GB" && currentTrack.name === "Strawberry Fields Forever - Originally Performed By the Beatles"){
             alert("you get the answer right. " + currentTrack.artists[0].name + " is from " + countries[eventData.region]);
           
          }else if(eventData.region === "MA" && currentTrack.name === "Moroccan Rhythms"){
             alert("you get the answer right. " + currentTrack.artists[0].name + " is from " + countries[eventData.region]);
           
          }else if(eventData.region === "FR" && currentTrack.name === "Django's Tiger - ."){
             alert("you get the answer right. " + currentTrack.artists[0].name + " is from " + countries[eventData.region]);
           
          }else{
            alert("try again");
            // mapmusic.playNextTrack = false;
          }
        });
    });

    google.visualization.events.addListener(chart, "ready", function (eventData) {
        // show content, hide the throbber
        require(['$views/throbber#Throbber'],function(Throbber){
            var throbber = Throbber.forElement(charDiv);
            
            throbber.hide();
            throbber.showContent();
            document.getElementsByClassName("sp-throbber")[0].style.visibility="hidden";
          });
    });

    google.visualization.events.addListener(chart, "select", function (eventData) {
        console.log("select eventData", eventData);
    });

    chart.draw(data, options);
});