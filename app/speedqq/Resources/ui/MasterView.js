//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});

	var search;
var searchAsChild = false;
 
if (Ti.Platform.name == 'android' && Ti.Platform.Android.API_LEVEL > 11) {
    // Use action bar search view
    search = Ti.UI.Android.createSearchView({
        hintText: "Table Search"
    });
 
	self.addEventListener("open", function(e) {
    self.getActivity().onCreateOptionsMenu = function(e) {
        var menu = e.menu;
        var menuItem = menu.add({
            title: 'Table Search',
            actionView : search,
            icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
        });
    };
	});
}
else {
    // Use search bar
    search = Ti.UI.createSearchBar({
        hintText: "Table Search"
    });
    searchAsChild = true;
}
	
	//some dummy data for our table view
	var tableData = [
		{title:'Apples', price:'1.25', hasChild:true, color: '#000'},
		{title:'Grapes', price:'1.50', hasChild:true, color: '#000'},
		{title:'Oranges', price:'2.50', hasChild:true, color: '#000'},
		{title:'Bananas', price:'1.50', hasChild:true, color: '#000'},
		{title:'Pears', price:'1.40', hasChild:true, color: '#000', backgroundColor: 'blue'},
		{title:'Kiwis', price:'1.00', hasChild:true, color: '#000'}
	];
	

	var tableview = Titanium.UI.createTableView({
    data:tableData,
    search:search,
    searchAsChild:searchAsChild
});
	self.add(tableview);

	//add behavior
	tableview.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			price:e.rowData.price
		});
	});

	return self;
};

module.exports = MasterView;