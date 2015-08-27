//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});


// var data = [
		// {title:'The Coffee Bean', latitude:'3.156011', longitude:'101.709267', typeOfName:'Fast Food',imageurl:'images/', hasChild:true, color: '#000'},
		// {title:'Maxis Mobile Sdn Bhd', latitude:'3.1156188', longitude:'101.6605234', typeOfName:'Fast Food',imageurl:'Resources/android/pp.png',hasChild:true,color: '#000'},
		// {title:'Starbucks v', latitude:'3.1572554', longitude:'101.7110829',typeOfName:'Fast Food',imageurl:'aquariaklcc.jpg',hasChild:true, color: '#000'},
		// {title:'KFC @ Suria KLCC', latitude:'3.158154',longitude:'101.7120899',typeOfName:'Fast Food', imageurl:'../aquariaklcc.jpg',hasChild:true, color: '#000'},
		// {title:'Nasi Kandar Pelita', latitude:'3.1592922',longitude:'101.7126343', typeOfName:'Fast Food',imageurl:'image/aquariaklcc.jpg',hasChild:true, color: '#000'},
		// {title:'NZ Curry House', latitude:'3.158541',longitude:'101.7166238',typeOfName:'Fast Food', imageurl:'image/pp.png',hasChild:true, color: '#000'}
	// ];
// 
// var table = Ti.UI.createTableView({
    // data: data,
     // maxRowHeight:'20', 
    // backgroundColor:'transparent'
   // // separatorInsets: {left: 0, right: 0}
// });
// 
// var searchBar = Titanium.UI.createSearchBar({
    // barColor:'#000', 
    // showCancel:true,
    // height:43,
    // top:0,
// });
// 
// // Add search bar how ever you want... eg, table.search = searchBar; 
// 
// table.setSearch(searchBar)
// 
// searchBar.addEventListener("return", function (e) {
    // // Do API call etc
    // var foo = "bar";
// 
    // data.push(foo);
// 
    // table.setData(data);
// });
// 
// table.addEventListener('delete', function(e) {
// 
    // // Adjust data to delete from the data array.
// 
    // data.pop();
// 
    // table.setData(data);
// });
 // self.add(table);
// 
	// // //some dummy data for our table view
	// // var tableData = [
		// // {title:'Apples', price:'1.25', hasChild:true, color: '#000'},
		// // {title:'Grapes', price:'1.50', hasChild:true, color: '#000'},
		// // {title:'Oranges', price:'2.50', hasChild:true, color: '#000'},
		// // {title:'Bananas', price:'1.50', hasChild:true, color: '#000'},
		// // {title:'Pears', price:'1.40', hasChild:true, color: '#000'},
		// // {title:'Kiwis', price:'1.00', hasChild:true, color: '#000'}
	// // ];
// // 
	// // var table = Ti.UI.createTableView({
		// // data:tableData
	// // });
	// // self.add(table); 
// // 
	// // //add behavior
	// table.addEventListener('click', function(e) {
		// self.fireEvent('itemSelected', {
			// title:e.rowData.title,
			// latitude:e.rowData.latitude,
			// longitude:e.rowData.longitude,
			// typeOfName:e.rowData.typeOfName,
			// imageurl:e.imageurl
		// });
	// });
	
	
	
	
	var label1 = Ti.UI.createLabel({text:"",backgroundImage: 'images/KFCgreen.png',top:0,height:75, text:'', width:"100%"});
	var label2 = Ti.UI.createLabel({text:"",backgroundImage: 'images/Starbucks.png',top:75,height:75, text:'', width:"100%"});
	var label3 = Ti.UI.createLabel({text:"",backgroundImage: 'images/BSN.png',top:150,height:75, text:'', width:"100%"});
	var label4 = Ti.UI.createLabel({text:"",backgroundImage: 'images/RHB.png',top:225,height:75, text:'', width:"100%"});
	var label5 = Ti.UI.createLabel({text:"",backgroundImage: 'images/Nasi Kandar Pelita.png',top:300,height:75, text:'', width:"100%"});
	var label6 = Ti.UI.createLabel({text:"",backgroundImage: 'images/NZ Curry.png',top:375,height:75, text:'', width:"100%"});
	var label7 = Ti.UI.createLabel({text:"",backgroundImage: 'images/Coffebean.png',top:450,height:75, text:'', width:"100%"});
	
	self.add(label1);
	self.add(label2);
	self.add(label3);
	self.add(label4);
	self.add(label5);
	self.add(label6);
	self.add(label7);

	function doSomething(e) {
		var DetailView = require('DetailView');
		var detailView = DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'Place Details',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		detailContainerWindow.add(detailView);
		detailContainerWindow.open();
	}
	
	function doSomething2(e) {
		var DetailView2 = require('DetailView2');
		var detailView2 = DetailView2();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'Place Details',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		detailContainerWindow.add(detailView2);
		detailContainerWindow.open();
	}
	
	function doSomething3(e) {
		var DetailView3 = require('DetailView3');
		var detailView3 = DetailView3();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'Place Details',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		detailContainerWindow.add(detailView3);
		detailContainerWindow.open();
	}
	
	label1.addEventListener('click', doSomething);
	label2.addEventListener('click', doSomething2);
	label3.addEventListener('click', doSomething3);
	
	
	
	
	label4.addEventListener('click', doSomething);
	label5.addEventListener('click', doSomething);
	label6.addEventListener('click', doSomething);
	label7.addEventListener('click', doSomething);



	return self;
};

module.exports = MasterView;