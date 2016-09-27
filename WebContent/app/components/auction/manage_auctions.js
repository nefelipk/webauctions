
angular.module('auction_land').controller('AuctionManagerController',
		['$scope','$timeout','$cookies','ItemSeller','Item','$window',
		 function($scope,$timeout,$cookies,ItemSeller,Item,$window) {
	
	$scope.countries = countries;
	
	console.log($cookies.getObject('user'));
	
	$scope.allItems = function() {
		ItemSeller.query().$promise.then(function(data) {
			$scope.items = data;
			console.log($scope.items);
		});
	};
	$scope.allItems();
	
	
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
		if($scope.item.buyPrice < $scope.item.firstBid) {
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
							DATE-TIME PICKER
	**********************************************************************/
	/*********************************************************************/
/*	
	$scope.startTime = null;
	$scope.endTime = null;
		
	$scope.pickDateTime = function() {
		console.log(">>> DateTimePicker <<<");
		$('#dateTimeStartPicker').datetimepicker({
			minDate : new Date()
		});
		$('#dateTimeEndPicker').datetimepicker({
			useCurrent: false //Important! See issue #1075
		});
		$("#dateTimeStartPicker").on("dp.change dp.show", function (e) {
			console.log(new Date(e.date));
			$('#dateTimeEndPicker').data("DateTimePicker").minDate(e.date);
			if (new Date(e.date) < new Date()) {
				$scope.startTime = null;
			}
			else {
				$scope.startTime = new Date(e.date);
			}
			$('#newAuctionForm').formValidation('revalidateField', 'started');
		});
		$("#dateTimeEndPicker").on("dp.change dp.show", function (e) {
			$('#dateTimeStartPicker').data("DateTimePicker").maxDate(e.date);
			console.log(new Date(e.date));
			if (new Date(e.date) < new Date()) {
				$scope.endTime = null;
			}
			else {
				$scope.endTime = new Date(e.date);
			}
			$('#newAuctionForm').formValidation('revalidateField', 'ends');
		});
		
		$('#newAuctionForm').formValidation({
	        framework: 'bootstrap',
	        fields: {
	        	started: {
	                validators: {
	                    date: {
	                        format: 'MM/DD/YYYY h:m A',
	                        message: 'The value is not a valid date'
	                    },
					    notEmpty: {
				            message: 'The field can not be empty'
				        }
	                }
	            }
	        }
	    });
		
	};
	//$scope.pickDateTime();
*/	
	
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