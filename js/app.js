/*
*   khrizenriquez <christoferen7@gmail.com>
*/

//'use strict';

var showMarkerInfo = function (element) {
    $('#mapOptions').modal('show');
};

var initMap = function () {
    var poolLatLng      = new google.maps.LatLng(14.659124, -90.512665);
    var fieldLatLng     = new google.maps.LatLng(14.657474, -90.512412);
    var cabinLatLng     = new google.maps.LatLng(14.657176, -90.513357);
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
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(mapContainer, mapOptions);

    var markerPool = new google.maps.Marker({
        position:   poolLatLng,
        title:      "Piscina"
    });
    var markerField = new google.maps.Marker({
        position:   fieldLatLng,
        title:      "Campo"
    });
    var markerCabin = new google.maps.Marker({
        position:   cabinLatLng,
        title:      "Cabañas"
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<h2>Piscina</h2><div><a onclick="return showMarkerInfo("pool");">Ver más</a></div>'
    });
    markerPool.addListener('click', function() {
        infowindow.open(map, markerPool);
    });

    // To add the marker to the map, call setMap();
    markerPool.setMap(map);
    markerField.setMap(map);
    markerCabin.setMap(map);
};

var loadGoogleMaps = function () {
    var container = '';
    initMap();
};

document.addEventListener('DOMContentLoaded', function () {  });

window.onload = function() {
    loadGoogleMaps();
};
