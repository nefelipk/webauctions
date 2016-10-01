
angular.module('auction_land').controller('AuctionManagerController',
		['$scope','$log','$timeout','$cookies','AllCategories','ItemSeller','Item','ItemDelete','ItemUpdate','AuctionService','uiGmapGoogleMapApi','$window',
		 function($scope,$log,$timeout,$cookies,AllCategories,ItemSeller,Item,ItemDelete,ItemUpdate,AuctionService,uiGmapGoogleMapApi,$window) {
	
	$scope.item = {};		
			
	/*********************************************************************/
	/**********************************************************************
							FIX DATES TO STRING
	**********************************************************************/
	/*********************************************************************/
	
	$scope.fixDates = function(date) {
		date = new Date(date);
		var dd = date.getDate();
		var MM = date.getMonth() + 1;
		var yyyy = date.getFullYear();
		var HH = date.getHours();
		var mm = date.getMinutes();
		
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (MM < 10) {
			MM = '0' + MM;
		}
		if (HH < 10) {
			HH = '0' + HH;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		
		date = yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":00.000Z";
		console.log(date);
		return date;
	};
			
			
	/*********************************************************************/
	/**********************************************************************
						ALL COUNTIES AND CATEGORIES
	**********************************************************************/
	/*********************************************************************/
	
	$scope.countries = countries;
	$scope.default_country_option = "Country";
	
	$scope.allCategories = function() {
		AllCategories.query().$promise.then(function(data) {
			console.log(data);
			$scope.categories = data;
		});
	};
	$scope.allCategories();
	
	
	/*********************************************************************/
	/**********************************************************************
							ALL USER'S AUCTIONS
	**********************************************************************/
	/*********************************************************************/
	
	$scope.allItems = function() {
		term = $scope.user.username;
		ItemSeller.query({term : term}).$promise.then(function(data) {
			console.log(data);
			$scope.items = data;
			
			$scope.headers = {
				fields: [{
					orderByField: 'idItem',
					name: 'Id',
			    },{
			    	orderByField: 'name',
			    	name: 'Name',
			    },{
			    	orderByField: 'started',
			    	name: 'Starts',
			    },{
			    	orderByField: 'ends',
			    	name: 'Ends',
			    },{
			    	orderByField: 'firstBid',
			    	name: 'First Bid',
			    },{
			    	orderByField: 'buyPrice',
			    	name: 'Buy Price',
			    },{
			    	orderByField: 'currently',
			    	name: 'Current Price',
			    },{
			    	orderByField: 'numberOfBids',
			    	name: 'Number of Bids',
			    },{
			    	orderByField: 'noOrder',
			    	name: '',
			    },{
			    	orderByField: 'noOrder',
			    	name: '',
			    }]
			};
			
			$scope.orderByField = 'started';
			$scope.descending = false;
			console.log($scope.orderByField);
		    console.log($scope.descending);
			
		});
	};
	$scope.allItems();
	
	
	$scope.changeSorting = function(field) {
		console.log(field);
		if (field == "noOrder") {
			return;
		}
	    if ($scope.orderByField == field) {
	    	$scope.descending = !$scope.descending;
	    } else {
	    	$scope.orderByField = field;
	    	$scope.descending = false;
	    }
	    console.log($scope.orderByField);
	    console.log($scope.descending);
	};
	
	
	/*********************************************************************/
	/**********************************************************************
								IMPORT IMAGE
	**********************************************************************/
	/*********************************************************************/
	
	$scope.imageData = null;
	$scope.imageMessage = null;
	$scope.uploadImage = function(){
		var f = document.getElementById('img').files[0];
		var r = new FileReader();
		r.onloadend = function(e){
			$scope.imageData = e.target.result;			
		}
		if (f != null) {
			r.readAsBinaryString(f);
			$scope.imageMessage = "Image uploaded successfully";
		}
		document.getElementById('img').files[0] = null;
	}
	
	/*********************************************************************/
	/**********************************************************************
								HANDLE MAP
	**********************************************************************/
	/*********************************************************************/
	
	$scope.map = { 
		control: {}, 
		center: { 
			latitude: 44.5278427984555, 
			longitude: 13.623046875 
		}, 
		zoom: 5, 
		options: {}
	};
	
	var dit_location = {
		latitude: 37.968459261473726, 
		longitude: 23.76688241958618 
	}
	
	$scope.marker = { 
		id: "1", 
		coords: { 
			latitude: dit_location.latitude, 
			longitude: dit_location.longitude 
		}, 
		options: {
			draggable: true,
			labContent: null
		}, 
		events: {
			dragend: function (marker, eventName, args) {
				$log.log('marker dragend');
				var lat = marker.getPosition().lat();
				var lon = marker.getPosition().lng();
				$log.log(lat);
				$log.log(lon);
				
				$scope.marker.options = {
					draggable: true,
					labelContent: "lat: " + $scope.marker.coords.latitude + " lon: " + $scope.marker.coords.longitude,
					labelAnchor: "100 0",
					labelClass: "marker-labels"
				};
				$scope.error_map = false;
			}
		}
	};
	
	current_item_location = function(data) {
		if (data == "1") {
			AuctionService.set_map($scope.map);
		}
		else if (data == "2") {
			$scope.item.location.latitude = $scope.marker.coords.latitude;
			$scope.item.location.longitude = $scope.marker.coords.longitude;
		}
		else {
			$scope.marker.coords.latitude = data.location.latitude;
			$scope.marker.coords.longitude = data.location.longitude;
			$scope.marker.options.labelContent = "lat: " + data.location.latitude + " lon: " + data.location.longitude;
			$scope.marker.options.labelAnchor = "100 0";
			$scope.marker.options.labelClass = "marker-labels";
		}
	};
	
	uiGmapGoogleMapApi.then(function(maps) {
		$scope.markers = [];	
		$scope.google = google;
		$scope.geocoder = new google.maps.Geocoder();
		AuctionService.set_google_api($scope.google);
		AuctionService.set_map($scope.map);
	});
	
	/* when using a google map inside a bootstrap tab it is 
	 * almost necessary to use 'resize' event because the
	 * map does not load properly.
	 */
	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		var activeTab = $(".tab-content").find(".active");
		var id = activeTab.attr('id');
		if(id == "create") {
			var google = AuctionService.get_google_api();
			var map = AuctionService.get_map();
			current_item_location("1");
			$scope.google.maps.event.trigger($scope.map.control.getGMap(), 'resize'); 
		}
	});
	
	/*********************************************************************/
	/**********************************************************************
							CREATE NEW AUCTION
	**********************************************************************/
	/*********************************************************************/
	
	$scope.price_pattern = "[1-9][0-9]*";
	$scope.error_server = false;
	$scope.successful_creation = false;
	$scope.form_touched = false;
	$scope.error_prices = false;
	$scope.error_current_time = false;
	$scope.error_startEnd_time = false;
	$scope.error_map = false;
	$scope.imageAdded = false;
	$scope.imageIcon = null;
	
	$scope.createAuction = function() {
		console.log(">>>>>> button pressed <<<<<<<");
		if ($scope.imageAdded) {
			$scope.imageAdded = false;
			return;
		}
		console.log($cookies.getObject('user'));
		console.log($scope.user);
		console.log($scope.item);
		$scope.error_current_time = false;
		$scope.error_startEnd_time = false;
		
		if (1 * $scope.item.buyPrice < 1 * $scope.item.firstBid) {
			$scope.error_prices = true;
			return;
		}
		else {
			$scope.error_prices = false;
		}
		
		if ($scope.curItem.started < new Date() || $scope.curItem.ends < new Date()) {
			$scope.error_current_time = true;
			return;
		}
		else {
			$scope.error_current_time = false;
		}
		
		if ($scope.curItem.started > $scope.curItem.ends) {
			$scope.error_startEnd_time = true;
			return;
		}
		else {
			$scope.error_startEnd_time = false;
		}
		
		$scope.item.location.country = $scope.curItem.country.name;

		var i = 0;
		$scope.item.categories = new Array($scope.curItem.category.length);
		while (i < $scope.curItem.category.length) {
			$scope.item.categories[i] = {};
			$scope.item.categories[i].name = $scope.curItem.category[i].name;
			i++;
		}
		console.log($scope.curItem.category);
		console.log($scope.item.categories);
		
		if($scope.form.$invalid) {
			console.log("form ----> invalid");
			return;
		}
		
		$scope.item.started = $scope.fixDates($scope.curItem.started);
		$scope.item.ends = $scope.fixDates($scope.curItem.ends);
		console.log($scope.item.started);
		console.log($scope.item.ends);
		
		$scope.item.user = $scope.user;
		console.log($scope.item);
		
		if ($scope.marker.options.labelContent != null) {
			current_item_location("2");
		}
		else {
			$scope.error_map = true;
			return;
		}
		console.log($scope.item);
		
		if ($scope.imageData != null) {
			$scope.item.image = {};
			$scope.item.image.image = $window.btoa($scope.imageData);
		}
		$scope.imageData = null;
		$scope.imageMessage = null;
		console.log($scope.item);
		
		
		if ($scope.current_tab == "Edit Auction") {
			$scope.updateAuction();
			console.log("return after updating auction");
			return;
		}

		Item.save($scope.item).$promise.then(function(data) {
			console.log(">>>>>> CREATE <<<<<<<");
			console.log(data);
			console.log($scope.item);
			$scope.item = {};
			$scope.curItem = {};
			$scope.form.$setPristine(true);
			$scope.form.$setUntouched(true);
			$scope.submitted = false;
			$scope.success = true;
			$scope.successful_creation = true;
			$scope.error_server = false;
			$scope.form_touched = false;
			
			$scope.marker.coords.latitude = dit_location.latitude;
			$scope.marker.coords.longitude = dit_location.longitude;
			$scope.marker.options.labelContent = null;
			$scope.marker.options.labelAnchor = null;
			$scope.marker.options.labelClass = null;
		}, function() {
			alert("OOOPS: We are very sorry, server could not be reached. Please try again later.");
			console.log("error");
			$scope.error_server = true;
			$scope.successful_creation = false;
			$scope.form_touched = false;
			$scope.submitted = false;
			$scope.success = false;
			
			$scope.marker.coords.latitude = dit_location.latitude;
			$scope.marker.coords.longitude = dit_location.longitude;
			$scope.marker.options.labelContent = null;
			$scope.marker.options.labelAnchor = null;
			$scope.marker.options.labelClass = null;
		});
	};
	
	/*********************************************************************/
	/**********************************************************************
								EDIT ITEM
	**********************************************************************/
	/*********************************************************************/
	
	$scope.editItem = function(item) {
		console.log(">>>>>> Edit <<<<<<<");
		console.log(item.idItem);
		console.log(item.name);
		$scope.curItem = {};
		$scope.item = item;
		$scope.curItem.started = new Date(item.started);
		$scope.curItem.ends = new Date(item.ends);
		$scope.default_country_option = item.location.country;
		
		var index = ($scope.countries).map(function(d) { return d["name"]; }).indexOf(item.location.country);
		$scope.curItem.country = $scope.countries[index];
		console.log("--------------" + $scope.curItem.country);
		
		$scope.curItem.category = new Array(item.categories.length);
		for (i = 0; i < item.categories.length; i++) {
			console.log(item.categories[i].name);
			var index = ($scope.categories).map(function(d) { return d["name"]; }).indexOf(item.categories[i].name);
			console.log(index);
			$scope.curItem.category[i] = $scope.categories[index];
			console.log($scope.curItem.category[i]);
		}
		console.log($scope.curItem.category);
		
		current_item_location(item);
		
		if ($scope.item.image != null) {
			$scope.imageIcon = "data:image/jpg;base64," + $scope.item.image.image;
		}
		
		console.log($scope.item);
		$scope.set_active(3);
	};
	
	$scope.updateAuction = function() {
		console.log(">>>>>> UPDATE <<<<<<<");
		console.log($scope.item);
		$scope.default_country_option = "Country";
		
		ItemUpdate.save($scope.item).$promise.then(function() {
			console.log($scope.item);
			alert("Item updated successfully!");
			$window.location.reload();
			$scope.item = {};
			$scope.curItem = {};
			$scope.form.$setPristine(true);
			$scope.form.$setUntouched(true);
			$scope.submitted = false;
			$scope.success = true;
			$scope.successful_creation = true;
			$scope.error_server = false;
			$scope.form_touched = false;
			
			$scope.marker.coords.latitude = dit_location.latitude;
			$scope.marker.coords.longitude = dit_location.longitude;
			$scope.marker.options.labelContent = null;
			$scope.marker.options.labelAnchor = null;
			$scope.marker.options.labelClass = null;
			$scope.imageIcon = null;
		}, function() {
			alert("OOOPS: We are very sorry, server could not be reached. Please try again later.");
			console.log("error");
			$scope.error_server = true;
			$scope.successful_creation = false;
			$scope.form_touched = false;
			$scope.submitted = false;
			$scope.success = false;
			
			$scope.marker.coords.latitude = dit_location.latitude;
			$scope.marker.coords.longitude = dit_location.longitude;
			$scope.marker.options.labelContent = null;
			$scope.marker.options.labelAnchor = null;
			$scope.marker.options.labelClass = null;
			$scope.imageIcon = null;
		});
	}
	
	
	/*********************************************************************/
	/**********************************************************************
								DELETE ITEM
	**********************************************************************/
	/*********************************************************************/
	
	$scope.deleteItem = function(item) {
		console.log(">>>>>> Delete <<<<<<<");
		console.log(item.idItem);
		term = item.idItem;
		ItemDelete.remove({term : term}).$promise.then(function() {
			console.log(term);
			$window.location.reload();
		}, function() {
			alert("OOOPS: We are very sorry, server could not be reached. Please try again later.");
			console.log("error");
		});
	};
	
	
	/*********************************************************************/
	/**********************************************************************
									TABS
	**********************************************************************/
	/*********************************************************************/
	
	$scope.current_tab = "All Auctions";
	$scope.set_active = function(tab) {
		var overview_tab = angular.element(document.querySelector('#overview_tab'));
		var create_tab = angular.element(document.querySelector('#create_tab'));
		var edit_tab = angular.element(document.querySelector('#edit_tab'));
		overview_tab.removeClass('active');
		create_tab.removeClass('active');
		edit_tab.removeClass('active');
		
		if(tab == 1) {
			$scope.current_tab = "All Auctions";
			overview_tab.addClass('active');
			$window.location.reload();
			$scope.default_country_option = "Country";
			$scope.marker.coords.latitude = dit_location.latitude;
			$scope.marker.coords.longitude = dit_location.longitude;
			$scope.marker.options.labelContent = null;
			$scope.marker.options.labelAnchor = null;
			$scope.marker.options.labelClass = null;
			$scope.curItem = {};
			$scope.imageData = null;
			$scope.imageMessage = null;
			$scope.imageIcon = null;
		}
		else if(tab == 2) {
			$scope.current_tab = "New Auction";
			create_tab.addClass('active');
			$scope.default_country_option = "Country";
			$scope.marker.coords.latitude = dit_location.latitude;
			$scope.marker.coords.longitude = dit_location.longitude;
			$scope.marker.options.labelContent = null;
			$scope.marker.options.labelAnchor = null;
			$scope.marker.options.labelClass = null;
			$scope.curItem = {};
			$scope.item = null;
			$scope.imageData = null;
			$scope.imageMessage = null;
			$scope.imageIcon = null;
		}
		else if(tab == 3) {
			$scope.current_tab = "Edit Auction";
			edit_tab.addClass('active');
		}
		console.log($scope.current_tab);
		$scope.reading_sent = false;
		$scope.reading = false;
	};
	
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
}]);