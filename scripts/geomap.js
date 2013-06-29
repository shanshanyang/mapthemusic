
if(typeof GeoMap === 'undefined' || GeoMap === null){
  GeoMap = {};
};

$(document).ready(function(){
  GeoMap.setup_map();
});
console.log(Backbone);
// (function(){
  GeoMap.setup_map = function(){
    mapOptions = {zoom: 3, center: new google.maps.LatLng(0,0), mapTypeId: google.maps.MapTypeId.TERRAIN};
    GeoMap.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  };
  var GeoData = Backbone.Model.extend({});
  var GeoDataCollection = Backbone.Collection.extend({
    model: GeoData,
    url: "data/countries.geo.json"   
  });
  var GeoCoordinates= Backbone.Model.extend({});
  var GeoCoordinatesCollection = Backbone.Collection.extend({
    model: GeoCoordinates,
    url: "data/country_boundaries.json"
  });

  GeoMap.geo_data = new GeoDataCollection();
  GeoMap.geo_data.fetch();
  GeoMap.geo_data.on('reset', function(){
    GeoMap.geo_boundaries.fetch();
  });

  GeoMap.add_click_event_to_buttons = function(statistic_name, button_id){
    $("#"+button_id).on('click', function(){
      console.log($('.btn-group').find('.btn'));
      $('.btn-group').find('.btn').removeClass('selected');
      $(this).addClass('selected');
      GeoMap.setup_map();
      GeoMap.set_map_statistics(GeoMap.geo_boundaries, GeoMap.geo_data, statistic_name);
    });
  };

  var button_events = {"poverty_button":"Poverty Alleviation", "economic_button":"Economic Equality", "infrastructure_button":"Infrastructure Index", "human_rights_button":"Human Rights Index", "government_button":"Government Legitmacy", "literacy_button":"Literacy Rate"}
  _.each(button_events, function(statistic_name,button_id){ 
    GeoMap.add_click_event_to_buttons(statistic_name, button_id);
  });

  GeoMap.geo_boundaries = new GeoCoordinatesCollection();
  GeoMap.geo_boundaries.on('reset', function(){
    GeoMap.set_map_statistics(GeoMap.geo_boundaries, GeoMap.geo_data, 'Poverty Alleviation');
  });
  GeoMap.set_map_statistics = function(geo_boundaries, geo_data, data_type){
    var stat = geo_data.map(function(data){
      return parseInt(data.get("data")[data_type]);
    });
    var max_stat = _.max(stat);
    var min_stat = _.min(stat);

    var boundaries = [];
    geo_boundaries.each(function(country){
      
      var country_data = geo_data.where({'country': country.get('country')})
      if(country_data.length > 0){
        var data_number = _.first(country_data).get("data")[data_type]
        var opacity =  data_number/100.0;
      }
      else{
        var opacity = 0;
      }

      boundaries.push({country: country.get('country'), coordinates: country.get('coordinates'), type: country.get('type'), opacity: opacity, data_type: data_type, data_number: data_number});
    });

    console.log(boundaries, boundaries);

    _.each(boundaries, function(boundary){ 
      var multipolygon = false;
      if(boundary['type'] === 'MultiPolygon'){
        multipolygon = true;
      }
      var opacity = boundary['opacity'];
      var bounds = boundary['coordinates'];
      if(multipolygon == true){
        _.each(bounds, function(bound){
          var coordinates = [];
          _.each(bound[0], function(b){
            if(boundary['country']!='Antarctica')
            coordinates.push(new google.maps.LatLng(b[1],b[0]));
          });
          GeoMap.plot_points(coordinates, opacity, boundary);
        });
      }
      else{
        var coordinates = []
        _.each(bounds[0], function(bound){
          coordinates.push(new google.maps.LatLng(bound[1],bound[0]));
        });
        GeoMap.plot_points(coordinates, opacity, boundary);
      }
    });
  };
  GeoMap.plot_points = function(points, opacity, plot_info){
    var polygon = new google.maps.Polygon({
      paths: points,
      strokeColor : "#003333",
      strokeOpacity: 0.8,
      strokeWeight: 0.5,
      fillColor: "#003333",
      fillOpacity: opacity
    });
    GeoMap.add_polygon_listeners(polygon, plot_info);
    polygon.setMap(GeoMap.map);
  };
  GeoMap.add_polygon_listeners = function(polygon, plot_info){
    var infowindow = new google.maps.InfoWindow({
      content: plot_info['country']+":<br/>"+plot_info['data_type']+": "+plot_info['data_number'] + '<br/><div style="width:300px;height:75px" id="graph_div"></div>',
      disableAutoPan: true
    });    
    google.maps.event.addListener(polygon, "mouseover", function(event){
      console.log("mouseover", event.latLng);
      infowindow.setPosition(event.latLng);
      infowindow.open(GeoMap.map);
      polygon.setOptions({strokeWeight:2});

      var nat_index_array = GeoMap.geo_data.where({'country':plot_info['country']})
      if(nat_index_array.length == 1){
        var data_hash = _.first(nat_index_array).get("data");
        setTimeout(function(){
          StatBar.drawVisualization('graph_div', data_hash);
        },500);
      }
    });
    google.maps.event.addListener(polygon, "mouseout", function(event){
      infowindow.close();
      polygon.setOptions({strokeWeight:0.5});
    });
    google.maps.event.addListener(polygon, "click", function(event){

      var polygon_bounds = polygon.getBounds();
      var polygon_center = polygon_bounds.getCenter();
      GeoMap.map.setCenter(polygon_center);
      GeoMap.map.fitBounds(polygon_bounds);
      console.log("click", polygon_bounds);
    });
  };
  google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      var path;        
      for (var i = 0; i < paths.getLength(); i++) {
          path = paths.getAt(i);
          for (var ii = 0; ii < path.getLength(); ii++) {
              bounds.extend(path.getAt(ii));
          }
      }
      return bounds;
  }
// })();
