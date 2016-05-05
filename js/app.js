/*
*   khrizenriquez <christoferen7@gmail.com>
*/

//'use strict';
var map, myPosition, watchID, geoLoc;
var placesArr = [],
    mapMarkers = [];
var menuArrow = 'left';
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
    var elementName = element.parentNode.parentNode.children[0].innerText;
    var umgPlace    = elementName.replace('Información de ', '');
    var title   = document.querySelector('#mapOptions .modal-title');
    var content = document.querySelector('#mapOptions .modal-body');

    title.innerHTML     = '';
    content.innerHTML   = '';

    placesArr.some(function (element, index, arr) {
        if (element.name === umgPlace) {
            title.innerHTML     = elementName;
            content.innerHTML   = element.description;

            $('#mapOptions').modal('show');
            return false;
        }
    });
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

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude : " + latitude + " Longitude: " + longitude);
}

function errorHandler(err) {
    if(err.code == 1) {
       console.log("Error: Access is denied!");
    }

    else if( err.code == 2) {
       console.log("Error: Position is unavailable!");
    }
}

var getLocationUpdate = function (map) {
    if(navigator.geolocation){
       // timeout at 60000 milliseconds (60 seconds)
       var options = {timeout:60000};
       geoLoc = navigator.geolocation;
       watchID = geoLoc.watchPosition(function (position) {
           var latitude = position.coords.latitude;
           var longitude = position.coords.longitude;
           var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
           };
           console.log("Latitude : " + latitude + " Longitude: " + longitude);
           if (myPosition === undefined) {
               myPosition = new Marker({
                   map:        map,
                   position:   new google.maps.LatLng(latitude, longitude),
                   title:      "Este eres tú",
                   icon: {
                       path:             SQUARE_PIN,
                       fillColor:        '#000',
                       fillOpacity:      1,
                       strokeColor:      '#000',
                       strokeWeight:     1
                   }, map_icon_label:    '<span class="map-icon map-icon-library"></span>'
               });
               //map.setCenter(pos);
           } else {
               myPosition.setPosition(new google.maps.LatLng(latitude, longitude));
           }
       }, errorHandler, options);
    }
    else{
       console.log("Sorry, browser does not support geolocation!");
    }
}



var initMap = function () {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(mapContainer, mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: '<h2>Piscina</h2><div><a onclick="return showMarkerInfo(1);">Ver más</a></div>'
    });
    //markerPool.addListener('click', function() {
    //    infowindow.open(map, markerPool);
    //});

    getLocationUpdate(map);
};

var loadGoogleMaps = function () {
    var container = '';
    initMap();
};

var drawMarker = function (map, obj) {};
var drawMarkers = function (map, arrObj, umgPlaces) {
    var places = umgPlaces || [];

    if (places === []) return;

    //  Elimino todos los marcadores
    mapMarkers.some(function (el, ind, ar) {el.setMap()});

    var m = map || new google.maps.Map(mapContainer, mapOptions);
    var data = arrObj || [];

    data.some(function (element, index, arr) {
        if (element.isActive) {
            umgPlaces.some(function (umgElement, umgIndex, umgArr) {
                if (umgElement === element.name) {
                    element.locations.some(function (el, ind, ar) {
                        var m = new Marker({
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
                        mapMarkers.push(m);

                        var infowindow = new google.maps.InfoWindow({
                            content: '<h2>Información de '
                            + element.name +
                            '</h2><div><a onclick="return showMarkerInfo(this);">Ver más</a></div>'
                        });
                        m.addListener('click', function() {
                            infowindow.open(map, m);
                        });
                    });

                    return false;
                }
            });
        }
    });
};

var fillMapOptions = function () {
    var xhr         = new XMLHttpRequest();
    var container   = document.querySelector('.container-map .optionsContainer #container-map-list-elements');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            placesArr = JSON.parse(xhr.responseText);
            container.innerHTML = '';

            placesArr.some(function (element, index, arr) {
                if (element.isActive) {
                    container.innerHTML += "<li class='pure-menu-item white'><label for='element-"+
                    index
                    +"'><input id='element-"+
                    index
                    +"' type='checkbox' name='umg-places-list' value='"+ element.name +"' /> "+
                    "<span class='map-icon "+ element.icon +"'></span>" +
                    element.name
                    +"</label></li>";
                }
            });

            document.querySelector("#container-map-list-elements").addEventListener('change', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                console.log(evt.target);
                var placesSelected = [];
                var chkArr = document.getElementsByName("umg-places-list");
                for (k = 0; k< chkArr.length; k++) {
                    if (chkArr[k].checked) {
                        placesSelected.push(chkArr[k].value);
                        console.log(chkArr[k].value);
                    }
                    //console.log(chkArr[k].checked);
                }

                drawMarkers(map, placesArr, placesSelected);
            });

            //drawMarkers(map, placesArr, 's');
        }
    };
    xhr.open('GET', 'storage/info.json', true);
    xhr.send(null);
};

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.arrow-container').addEventListener('click', function (evt) {
        var opContainer = document.querySelector('.optionsContainer');
        if (menuArrow == 'left') {
            menuArrow = 'right';
            this.classList.remove("arrow-container-left-side");
            this.classList.add("arrow-container-right-side");
            opContainer.classList.remove("arrow-container-hide");
            opContainer.classList.add("arrow-container-show");
            //console.log(this);

            return;
        } else
        if (menuArrow == 'right') {
            menuArrow = 'left';
            //console.log(this);
            this.classList.remove("arrow-container-right-side");
            this.classList.add("arrow-container-left-side");
            opContainer.classList.remove("arrow-container-show");
            opContainer.classList.add("arrow-container-hide");

            return;
        }
    });
});

window.onload = function() {
    loadGoogleMaps();
    fillMapOptions();
};
