function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'e3e3e3'
	});

	

	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name+': $'+e.price;
		var lbl = Ti.UI.createLabel({
		textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
		text:e.title,
		height:'auto',
		width:'auto',
		top:0,
		color:'#000'
	});
	//self.add(lbl);
	
	var lbl2 = Ti.UI.createLabel({
		textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
		text:e.typeOfName,
		height:'auto',
		width:'auto',
		top:20,
		color:'#000'
	});
	//self.add(lbl2);
	
	
	});
	
	var labelImage = Ti.UI.createLabel({
			text:"",
			backgroundImage:'images/kfc10.png',
			top:0,
			width:"100%",
			height:500,
		});
	
	self.add(labelImage);
	var locationButton = Ti.UI.createButton({
		text:'Open Location', bottom:0, width:"100%",title:"Open Location"
		});
	self.add(locationButton);
	

	// var key = Ti.App.Properties.getInt(num);
	// var db = Ti.Database.install('db/queueDB.sqlite','queueDB');
// 	
	// var db = Ti.Database.open('queueDB');
// 	
	// db.execute('BEGIN');
// 
	// var num =  db.execute('SELECT NUM FROM KFC where SEQ =' + key);
// 	
	// var numberOfCus = Ti.UI.createLabel({text:'Number of customer :' + num + '/50', bottom:50, width:"100%"});
// 
		// key = key +1;
		// if(key>3)
			// key = 1;
// 		
	// Ti.App.Properties.setInt('num', key);
// 
	// self.add(numberOfCus);
	function doSomething(e) {
		var MapView = require('MapView');
		var mapView = MapView();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'Map Details',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		detailContainerWindow.add(mapView);
		detailContainerWindow.open();
	}
	locationButton.addEventListener('click', doSomething);

	return self;
};

module.exports = DetailView;
