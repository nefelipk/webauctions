
angular.module('auction_land').controller('AuctionManagerController',
		['$scope','$timeout','$cookies','ItemSeller','Item','$window',
		 function($scope,$timeout,$cookies,ItemSeller,Item,$window) {
	
	$scope.countries = countries;
//	$scope.today = new Date();
//	console.log($scope.today);
//	
//	var today = new Date();
//	var dd = today.getDate();
//	var mm = today.getMonth() + 1; //January is 0
//	var yyyy = today.getFullYear();
//	var h = today.getHours();
//	var min = today.getMinutes();
//	var a = "AM";
//	
//	if (dd < 10) {
//		dd = '0' + dd;
//	} 
//	if (mm < 10) {
//		mm = '0' + mm;
//	}
//	if (h > 12) {
//		h = h - 12;
//		a = "PM";
//	}
//	if (h < 10) {
//		h = '0' + h;
//	}
//	if (min < 10) {
//		min = '0' + min;
//	}
//	
//	
//	$scope.today = mm + '/' + dd + '/' + yyyy + ', ' + h + ':' + min + " " + a;
//	console.log($scope.today);
//	
//	document.getElementById("datefield").setAttribute("min", $scope.today);
//	console.log(document.getElementById("datefield").min);

	
		
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
	
	$scope.createAuction = function() {
		console.log(">>>>>> CREATE <<<<<<<");
		console.log($cookies.getObject('user'));
		console.log($scope.user);
		if(1 * $scope.item.buyPrice < 1 * $scope.item.firstBid) {
			$scope.error_prices = true;
			return;
		}
		else {
			$scope.error_prices = false;
		}
		$scope.item.location.country = $scope.item.country.name;
		delete $scope.item.country;
		if($scope.form.$invalid)
			return;
		$scope.item.user = $scope.user;
		console.log($scope.item);
		
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
									TABS
	**********************************************************************/
	/*********************************************************************/
	
	$scope.current_tab = "All Auctions";
	$scope.set_active = function(tab) {
		var overview_tab = angular.element(document.querySelector('#overview_tab'));
		var create_tab = angular.element(document.querySelector('#create_tab'));
		overview_tab.removeClass('active');
		create_tab.removeClass('active');
		
		if(tab == 1) {
			$scope.current_tab = "All Auctions";
			overview_tab.addClass('active');
		}
		else if(tab == 2) {
			$scope.current_tab = "New Auction";
			create_tab.addClass('active');
		}
		$scope.reading_sent = false;
		$scope.reading = false
	};
	
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
}]);