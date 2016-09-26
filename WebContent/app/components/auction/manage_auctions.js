
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
	
	
//	$scope.username = $cookies.getObject('user').username;
//	$scope.name = $cookies.getObject('user').firstName;
//	$scope.surname = $cookies.getObject('user').lastName;
//	$scope.email = $cookies.getObject('user').email;
//	$scope.phone = $cookies.getObject('user').phone;
//	$scope.trn = $cookies.getObject('user').afm;
//	$scope.country = $cookies.getObject('user').location.country;
//	$scope.city = $cookies.getObject('user').location.city;
//	$scope.address = $cookies.getObject('user').location.address;
//	$scope.postalCode = $cookies.getObject('user').location.postalCode;
//	console.log($cookies.getObject('user'));
	
	$scope.createAuction = function() {
		console.log(">>>>>> CREATE <<<<<<<");
		console.log($cookies.getObject('user'));
		console.log($scope.user);
//		$scope.user.location.country = $scope.user.country.name;
//		delete $scope.user.country;
//		User.save($scope.user).$promise.then(function(data) {
//			// bring form at initial
//			// state
//			$scope.user = {};
//			$scope.confirm = "";
//			$scope.match = false;
//			$scope.strong = false;
//			$scope.medium = false;
//			var input_elem = angular.element(document.querySelector('#username_div'));
//			input_elem.removeClass("has-succcess");
//			input_elem.removeClass("has-succcess");
//			$scope.form.$setPristine(true);
//			$scope.form.$setUntouched(true);
//
//			$scope.submitted = false;
//			//
//			$('#signup_modal').modal('hide');
//			$scope.success = true;
//			$scope.title = "Success";
//			$scope.message = "Your registration has been successfull! Please wait untill an admin verify your application.\nThank you.";
//			$('#signup_response').modal('show');
//			console.log(data);
//		}, function() {
//			$('#signup_modal').modal('hide');
//			$scope.success = false;
//			$scope.title = "Error";
//			$scope.message = "We are terribly sorry.\nThere must have been a server error.";
//			$('#signup_response').modal('show');
//			console.log("error");
//			$scope.submitted = false;
//		});
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