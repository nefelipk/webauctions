
angular.module('auction_land').controller('AuctionManagerController',
		['$scope','$timeout','$cookies','AllCategories','ItemSeller','Item','ItemDelete','$window',
		 function($scope,$timeout,$cookies,AllCategories,ItemSeller,Item,ItemDelete,$window) {
	
	$scope.countries = countries;
	
	/*********************************************************************/
	/**********************************************************************
							GET ALL CATEGORIES
	**********************************************************************/
	/*********************************************************************/
	
	$scope.allCategories = function() {
		AllCategories.query().$promise.then(function(data) {
			console.log(data);
			$scope.categories = data;
		});
	};
	$scope.allCategories();
	
	
//	var categories = [ {
//		"name" : 'Collectibles',
//	}, {
//		"name" : 'Åland Islands',
//	}, {
//		"name" : 'Decorative & Holiday',
//	}, {
//		"name" : 'Algeria',
//	}, {
//		"name" : 'Zambia',
//	}, {
//		"name" : 'Zimbabwe',
//	} ];
//	
//		
//	$scope.categories = categories;
		
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
	
	$scope.createAuction = function() {
		console.log(">>>>>> CREATE <<<<<<<");
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
		
		if ($scope.item.started < new Date() || $scope.item.ends < new Date()) {
			$scope.error_current_time = true;
			return;
		}
		else {
			$scope.error_current_time = false;
		}
		
		if ($scope.item.started > $scope.item.ends) {
			$scope.error_startEnd_time = true;
			return;
		}
		else {
			$scope.error_startEnd_time = false;
		}
		
		$scope.item.location.country = $scope.curItem.country.name;
		//delete $scope.item.country;

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
		$scope.item.user = $scope.user;
		console.log($scope.item);
		
		if ($scope.current_tab == "Edit Auction") {
			$scope.updateAuction();
			console.log("return after updating auction");
			return;
		}
		
/////////////////////////////////////////////////////////////////////////////////////////////////
return;			///TEMPORARY --> gia dokimes!!!!!!!!!!!
/////////////////////////////////////////////////////////////////////////////////////////////////

		Item.save($scope.item).$promise.then(function(data) {
			console.log(data);
			$scope.item = {};
			$scope.form.$setPristine(true);
			$scope.form.$setUntouched(true);
			$scope.submitted = false;
			$scope.success = true;
			$scope.successful_creation = true;
			$scope.error_server = false;
			$scope.form_touched = false;
			
		}, function() {
			$scope.error_server = true;
			$scope.successful_creation = false;
			$scope.form_touched = false;
			$scope.submitted = false;
			$scope.success = false;
		});
	};
	
	/*********************************************************************/
	/**********************************************************************
							EDIT AND DELETE ITEM
	**********************************************************************/
	/*********************************************************************/
	
	$scope.deleteItem = function(item) {
		console.log(">>>>>> Delete <<<<<<<");
		console.log(item.idItem);
		term = item.idItem;
		ItemDelete.remove({term : term}).$promise.then(function() {
			console.log(term);
		}, function() {
			alert("OOOPS: We are very sorry, server could not be reached. Please try again later.");
			console.log("error");
		});
	};
	
	$scope.default_country_option = "Country";
	
	$scope.editItem = function(item) {
		console.log(">>>>>> Edit <<<<<<<");
		console.log(item.idItem);
		console.log(item.name);
		$scope.item = item;
		$scope.item.started = new Date(item.started);
		$scope.item.ends = new Date(item.ends);
		$scope.curItem = {};
		$scope.curItem.country = item.location.country;
		$scope.default_country_option = item.location.country;
		console.log($scope.curItem.country);
		
		var temp = new Array(item.categories.length);
		for (i = 0; i < item.categories.length; i++) {
			console.log(item.categories[i].name);
			var index = ($scope.categories).map(function(d) { return d["name"]; }).indexOf(item.categories[i].name);
			console.log(index);
			temp[i] = $scope.categories[index];
			console.log(temp[i]);
		}
		$scope.curItem.category = temp;		
		console.log($scope.curItem.category);
		
		console.log($scope.item);
		$scope.set_active(3);
		
//		user.verified = !user.verified;
//		console.log(user.verified);
//		
//		UserVerify.save(user).$promise.then(function() {
//			console.log(user);
//		}, function() {
//			alert("OOOPS: We are very sorry, server could not be reached. Please try again later.");
//			console.log("error");
//		});
	};
	
	$scope.updateAuction = function() {
		console.log($scope.item);
		$scope.default_country_option = "Country";
	}
	
	
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
		}
		else if(tab == 2) {
			$scope.current_tab = "New Auction";
			create_tab.addClass('active');
			$scope.default_country_option = "Country";
			$scope.item = null;
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