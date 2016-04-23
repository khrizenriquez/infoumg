/*
*   khrizenriquez <christoferen7@gmail.com>
*/

'use strict';

var initMap = function () {
    let poolLatLng      = new google.maps.LatLng(14.659124, -90.512665);
    let fieldLatLng     = new google.maps.LatLng(14.657474, -90.512412);
    let cabinLatLng     = new google.maps.LatLng(14.657176, -90.513357);
    let mapContainer    = document.getElementById('mapContainer');
    let mapOptions      = {
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
    let map = new google.maps.Map(mapContainer, mapOptions);

    let markerPool = new google.maps.Marker({
        position:   poolLatLng,
        title:      "Piscina"
    });
    let markerField = new google.maps.Marker({
        position:   fieldLatLng,
        title:      "Campo"
    });
    let markerCabin = new google.maps.Marker({
        position:   cabinLatLng,
        title:      "Cabañas"
    });

    // To add the marker to the map, call setMap();
    markerPool.setMap(map);
    markerField.setMap(map);
    markerCabin.setMap(map);
};

var loadGoogleMaps = function () {
    let container = '';
    //initMap();
};

document.addEventListener('DOMContentLoaded', function () {  });

window.onload = function() {
    loadGoogleMaps();
};
