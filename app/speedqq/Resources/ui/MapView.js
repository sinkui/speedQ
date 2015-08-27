
//Master View Component Constructor
function MapView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
var scrollview = Ti.UI.createScrollView({borderWidth:1, borderColor:'#FF0000',top:"300dp", contentHeight:'auto', backgroundColor:'#EEE'});
var header = Ti.UI.createView({height:"50dp",top:0,color:'#FFFFFF'});


var Map = require('ti.map');


var annotation = Map.createAnnotation({
	latitude:3.158154,
	longitude:101.7120899,
	title:"KFC ",
	subtitle:'Suria KLCC',
	animate:true,
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});

var annotations = [
    Map.createAnnotation({
        latitude:3.1534034,
		longitude:101.7130351,
		title:"KLCC",
		subtitle:'Convention Centre',
		animate:true,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this an
    }),
    Map.createAnnotation({
        latitude:3.1534356,
		longitude:101.7130987,
        title: 'Apple HQ',
        subtitle: 'Cupertino, CA',
        animate: true,
        pincolor: Ti.Map.ANNOTATION_RED,
        myid:2
    }),
    Map.createAnnotation({
        latitude:3.1530,
		longitude:101.71300,
        title: 'Google HQ',
        subtitle: 'Mountain View, CA',
        animate: true,
     	pincolor: Ti.Map.ANNOTATION_RED,
        myid:3
    })
];

var KLCC = {latitude: 3.1534034, longitude: 101.7130351,latitudeDelta:0.010, longitudeDelta:0.018};
//
// CREATE MAP VIEW
//
var mapview = Map.createView({
	top:"0dp",
	height:"450dp",
	mapType: Map.NORMAL_TYPE,
	region: KLCC,
	animate:true,
	regionFit:true,
	userLocation:true,
	annotations:[annotation]
});


var circle = Map.createCircle({
    center: { latitude: 3.1534034, longitude: 101.7130351 },
    radius: 1000, //1km
    fillColor: "#20FF0000"
});
//mapview.addCircle(circle);

var longitude;
var latitude;
var place;
 
Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (!e.success || e.error)
    {
        //alert('error ' + JSON.stringify(e.error));
        return;
    }
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
});
 
function locationCallback(e)
{
    if (!e.success || e.error)
    {
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
 
    setTimeout(function()
    {
 
    },600);
 
    // reverse geo
    Titanium.Geolocation.reverseGeocoder(latitude,longitude, function(evt)
    {
        if (evt.success) {
            var places = evt.places;
            if (places && places.length) {
                //reverseGeo.text = places[0].address;
                var place = places[0].address;
    
                //alert("Current location "+ place);
                
                
                //saveData();
                //getNewData();
            } else {
                //reverseGeo.text = "No address found";
                alert("No address found");
            }
            //Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
        }
        else {              
        }
    });	// reverseGeocoder
 
};

var buttonView = Ti.UI.createView({height:"60dp",bottom:0,color:'#FFFFFF'});



self.add(mapview);
self.add(buttonView);

Titanium.Geolocation.addEventListener('location', locationCallback);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    Ti.API.info("Clicked " + evt.clicksource + " on " + evt.latitude + "," + evt.longitude);
});

	return self;
};

module.exports = MapView;



/////////////////////

//setArray();
