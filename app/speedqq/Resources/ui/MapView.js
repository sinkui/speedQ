
//Master View Component Constructor
function MapView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});

//var win = Ti.UI.createWindow();
var scrollview = Ti.UI.createScrollView({borderWidth:1, borderColor:'#FF0000',top:"300dp", contentHeight:'auto', backgroundColor:'#EEE'});
var header = Ti.UI.createView({height:"50dp",top:0,color:'#FFFFFF'});


var Map = require('ti.map');


var annotation = Map.createAnnotation({
	latitude:101.605523,
	longitude:3.079298,
	title:"Ridzuan Condo",
	subtitle:'Block A',
	animate:true,
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});
var Ridzuan = {latitude:101.605523,longitude:3.079298,latitudeDelta:0.010, longitudeDelta:0.018};
//
// CREATE MAP VIEW
//
var mapview = Map.createView({
	top:"50dp",
	height:"250dp",
	mapType: Map.NORMAL_TYPE,
	region: Ridzuan,
	animate:true,
	regionFit:true,
	userLocation:true,
	annotations:[annotation]
});


var circle = Map.createCircle({
    center: { latitude: 33.74511, longitude: -84.38993 },
    radius: 1000, //1km
    fillColor: "#20FF0000"
});
mapview.addCircle(circle);





var installDB = Ti.Database.install('db/gps_db.sqlite', 'gpsDB');

function clear(){
	var db = Ti.Database.open('gpsDB');
	db.execute('BEGIN');
	db.execute('DELETE FROM gps');
	db.execute('COMMIT');
	db.close();
    
    var dataRow = [];
}

function setArray(dataArray) { 
    var db = Ti.Database.open('gpsDB');
    db.execute('BEGIN');
    var fulldata = db.execute('SELECT * FROM gps ORDER BY timestamp;');
 
    //******************** rowData *****************************//
    var fulldataArray = [];
    while (fulldata.isValidRow()) {
            fulldataArray.push({
                id: fulldata.fieldByName('id'),
                lon: fulldata.fieldByName('lon'),
                lat: fulldata.fieldByName('lat'),
                place: fulldata.fieldByName('place'),
                timestamp: fulldata.fieldByName('timestamp'),
            }); 
            fulldata.next();
    }
    db.execute('COMMIT');
    fulldata.close();
    db.close();
    
    // set the array to the tableView
    var dataRow = [];
    for (var i = 0; i < fulldataArray.length; i++) {
     
            var content1 = Ti.UI.createLabel({
                text : fulldataArray[i].id + '\n ' + fulldataArray[i].lon + '\n ' + fulldataArray[i].lat,
                font:{fontSize:12,fontWeight:'bold'}, color:'#333',
                borderWidth:1, borderColor:'#333',
                left:10, 
            });
            var content2 = Ti.UI.createLabel({
                text : fulldataArray[i].timestamp,
                font:{fontSize:10}, color:'#CCC',
                right:50
            });
            var timelabel = Ti.UI.createLabel({
            	text: i, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            	font:{fontSize:'10dp'}, backgroundColor:'#CCC', color:'000',
            	right:10, height: 50, width:50
            });
     
        var row = Ti.UI.createTableViewRow({
            height : 'auto', rowIndex: i, 
            className:'rowclass'
        });
        row.add(content1, content2, timelabel); 
        dataRow.push(row);
    };
    
    tableview.setData(dataRow);
    
};  // function setArray

function saveData(e){
    var dbcon = Ti.Database.open('gpsDB');
 
    dbcon.execute('BEGIN');
	dbcon.execute('INSERT INTO gps(lon, lat, place) VALUES("' + longitude + '", "' + latitude + '", "' + place + '")');
    dbcon.execute('COMMIT');
     
    dbcon.close();
};	// saveData

function getNewData(d){ 
    var db = Ti.Database.open('gpsDB');
    db.execute('BEGIN');
    var fulldata = db.execute('SELECT * FROM gps ORDER BY timestamp DESC LIMIT 1;');
 	
    //******************** rowData *****************************//
    var fulldataArray = [];
    while (fulldata.isValidRow()) {
            fulldataArray.push({
                id: fulldata.fieldByName('id'),
                lon: fulldata.fieldByName('lon'),
                lat: fulldata.fieldByName('lat'),
                place: fulldata.fieldByName('place'),
                timestamp: fulldata.fieldByName('timestamp'),
            }); 
            fulldata.next();
    }
    db.execute('COMMIT');
    fulldata.close();
    db.close();

	var dataRow = [];
    for (var i = 0; i < fulldataArray.length; i++) {
     
            var content1 = Ti.UI.createLabel({
                text : fulldataArray[i].id + '\n ' + fulldataArray[i].lon + '\n ' + fulldataArray[i].lat,
                font:{fontSize:12,fontWeight:'bold'}, color:'#333',
                borderWidth:1, borderColor:'#333',
                left:10, 
            });
            var content2 = Ti.UI.createLabel({
                text : fulldataArray[i].timestamp,
                font:{fontSize:10}, color:'#CCC',
                right:50
            });
            var timelabel = Ti.UI.createLabel({
            	text: i, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            	font:{fontSize:'10dp'}, backgroundColor:'#CCC', color:'000',
            	right:10, height: 50, width:50
            });
     
        var row = Ti.UI.createTableViewRow({
            height : 'auto', rowIndex: i
        });
        
        row.add(content1, content2, timelabel); 
        dataRow.push(row);
        
    };
    tableview.appendRow(dataRow);
    // tableview.setData(dataRow);
};	// getNewData

var tableview = Ti.UI.createTableView({
    backgroundColor:'#EFEFEF', borderWidth:1, borderColor:'#333'
});

var longitude;
var latitude;
var place;
				var placeLabel = Ti.UI.createLabel({
	                text : '',
	                font:{fontSize:12,fontWeight:'bold'}, color:'#000000',
	                left:10
       			});
	            var timeStampLabel = Ti.UI.createLabel({
	                text : '',
	                font:{fontSize:10,color:'orange'},
	                right:10
	            });
	            var positionLabel = Ti.UI.createLabel({
	            	text:'' , font:{fontSize:10, color:'blue'}
	            });
	     
		        var row = Ti.UI.createTableViewRow({
		            height : 'auto',
		            className:'rowclass',borderWidth:1, borderColor:'black'
		        });

 
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (!e.success || e.error)
    {
        alert('error ' + JSON.stringify(e.error));
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
                placeLabel.text = place;
                timeStampLabel.text = timestamp;
                positionLabel.text = 'Lon ' + longitude +', lat ' + latitude;
               	row.add(placeLabel);
               	row.add(timeStampLabel); 
               	row.add(positionLabel);  
                tableview.appendRow(row);
                
                
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
var processButton = Ti.UI.createButton({
    title:'Start',
    height:"60dp",
    left:0,
    width:"50%"
});

var clearButton = Ti.UI.createButton({
    title:'Clear',
    height:"60dp",
    right:0,
    width:"50%"
});

buttonView.add(processButton);
buttonView.add(clearButton);



scrollview.add(tableview);

self.add(header);
self.add(mapview);
self.add(scrollview);


self.add(buttonView);


// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    Ti.API.info("Clicked " + evt.clicksource + " on " + evt.latitude + "," + evt.longitude);
});
processButton.addEventListener('click', function(evt){
	if (processButton.title == "Start") {
		alert('Tracking is started.');
		Titanium.Geolocation.addEventListener('location', locationCallback);
		processButton.title = 'Stop';
	}else{
		alert('Tracking is stoped.');
		Titanium.Geolocation.removeEventListener('location', locationCallback);
		processButton.title = 'Start';
	}
});

clearButton.addEventListener('click', function(evt){
	placeLabel.text = '';
    timeStampLabel.text = '';
    positionLabel.text = '';
    row.add(placeLabel);
    row.add(timeStampLabel); 
    row.add(positionLabel); 
	tableview.setData(row);
});


//self.add(mapview);

	return self;
};

module.exports = MapView;



/////////////////////

//setArray();
