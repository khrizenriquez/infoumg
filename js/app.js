/*
*   khrizenriquez <christoferen7@gmail.com>
*/

//'use strict';
var map;
var mapContainer    = document.getElementById('mapContainer');
var mapOptions      = {
    zoomControl: false,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    center: {
        lat: 14.6586779, lng: -90.5133461
    }, scrollwheel: false,
    zoom: 18
};

var showMarkerInfo = function (element) {
    $('#mapOptions').modal('show');
};

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };
//
// function success(pos) {
//   var crd = pos.coords;
//
//   console.log('Your current position is:');
//   console.log('Latitude : ' + crd.latitude);
//   console.log('Longitude: ' + crd.longitude);
//   console.log('More or less ' + crd.accuracy + ' meters.');
// };
//
// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// };
//
// navigator.geolocation.getCurrentPosition(success, error, options);

var initMap = function () {
    var poolLatLng      = new google.maps.LatLng(14.659124, -90.512665);
    var fieldLatLng     = new google.maps.LatLng(14.657474, -90.512412);
    //var cabinLatLng     = new google.maps.LatLng(14.657176, -90.513357);
    var infoWindow = new google.maps.InfoWindow({map: map});
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(mapContainer, mapOptions);

    var markerPool = new google.maps.Marker({
        position:   poolLatLng,
        title:      "Piscina"
    });
    var markerField = new google.maps.Marker({
        position:   fieldLatLng,
        title:      "Campo"
    });
    // var markerCabin = new Marker({
    //     map:        map,
    //     position:   new google.maps.LatLng(14.657176, -90.513357),
    //     title:      "Cabañas",
    //     icon: {
    //         path: MAP_PIN,
    // 		fillColor: '#00CCBB',
    // 		fillOpacity: 1,
    // 		strokeColor: '#000',
    // 		strokeWeight: 1
    //     }, map_icon_label: '<span class="map-icon map-icon-store"></span>'
    // });

    var infowindow = new google.maps.InfoWindow({
        content: '<h2>Piscina</h2><div><a onclick="return showMarkerInfo(1);">Ver más</a></div>'
    });
    markerPool.addListener('click', function() {
        infowindow.open(map, markerPool);
    });

    // To add the marker to the map, call setMap();
    //markerPool.setMap(map);
    //markerField.setMap(map);
    //markerCabin.setMap(map);

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       var pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };
    //
    //       infoWindow.setPosition(pos);
    //       infoWindow.setContent('Location found.');
    //       map.setCenter(pos);
    //     }, function() {
    //       handleLocationError(true, infoWindow, map.getCenter());
    //     });
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    //   }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

var loadGoogleMaps = function () {
    var container = '';
    initMap();
};

var drawMarker = function (map, obj) {};
var drawMarkers = function (map, arrObj) {
    var m = map || new google.maps.Map(mapContainer, mapOptions);
    var data = arrObj || [];

    data.some(function (element, index, arr) {
        if (element.isActive) {
            element.locations.some(function (el, ind, ar) {
                console.log(el);
                new Marker({
                    map:        map,
                    position:   new google.maps.LatLng(Number(el.latitude), Number(el.longitude)),
                    title:      element.name,
                    icon: {
                        path: MAP_PIN,
                		fillColor: '#00CCBB',
                		fillOpacity: 1,
                		strokeColor: '#000',
                		strokeWeight: 1
                    }, map_icon_label: '<span class="map-icon '+ element.icon +'"></span>'
                });
            });
        }
    });
};

var fillMapOptions = function () {
    var xhr         = new XMLHttpRequest();
    var container   = document.querySelector('.container-map .optionsContainer #container-map-list-elements');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var response    = JSON.parse(xhr.responseText);
            container.innerHTML = '';

            response.some(function (element, index, arr) {
                if (element.isActive) {
                    container.innerHTML += "<li class='pure-menu-item'><label for='element-"+
                    index
                    +"'><input id='element-"+
                    index
                    +"' type='checkbox' value='1' /> "+
                    "<span class='map-icon "+ element.icon +"'></span>" +
                    element.name
                    +"</label></li>";
                }
            });

            drawMarkers(map, response);
        }
    };
    xhr.open('GET', 'storage/info.json', true);
    xhr.send(null);
};

document.addEventListener('DOMContentLoaded', function () {  });

window.onload = function() {
    loadGoogleMaps();
    fillMapOptions();
};
