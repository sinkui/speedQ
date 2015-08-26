// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
//var win1 = require('ui/QueueStatus');

var win1 = Titanium.UI.createWindow({  
    title:'Tab A',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'My Map',
    window:win1
});

var MasterView = require('ui/MasterView'),
	DetailView = require('ui/DetailView');

	//construct UI
	var masterView = MasterView();
	win1.add(masterView);
	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		//create detail view container
		var detailView = DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'Product Details',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		detailContainerWindow.add(detailView);
		detailView.fireEvent('itemSelected',e);
		detailContainerWindow.open();
	});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'My Queue',
    window:win2
});
// 
// var label2 = Titanium.UI.createLabel({
	// color:'#999',
	// text:'I am Window 2',
	// font:{fontSize:20,fontFamily:'Helvetica Neue'},
	// textAlign:'center',
	// width:'auto'
// });
// 
// win2.add(label2);

var iTamano = 20;
var lblMensajeCentral = Titanium.UI.createLabel({
    color:'#400040',
    text:'CAS Móvil 2012',
    font:{fontSize:iTamano,
          fontFamily:'Helvetica Neue'},
    textAlign:'top',
    top: '2%'
});
win2.add(lblMensajeCentral);

	var MapView = require('ui/MapView');
		

	//construct UI
	var mapView = MapView();
	win2.add(mapView);
	
	//add behavior for master view
	// masterView.addEventListener('itemSelected', function(e) {
		// //create detail view container
		// var detailView = DetailView();
		// var detailContainerWindow = Ti.UI.createWindow({
			// title:'Product Details',
			// navBarHidden:false,
			// backgroundColor:'#ffffff'
		// });
		// detailContainerWindow.add(detailView);
		// detailView.fireEvent('itemSelected',e);
		// detailContainerWindow.open();
	// });


//
// create controls tab and root window
//
var win3 = Titanium.UI.createWindow({  
    title:'Tab 3',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Profit',
    window:win3
});

var label3 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 3',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win3.add(label3);

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);

// open tab group
tabGroup.open();


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();

