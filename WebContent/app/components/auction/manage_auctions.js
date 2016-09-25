
angular.module('auction_land').controller('AuctionManagerController',
		['$scope','$timeout','$cookies','UserLogin','$window',
		 function($scope,$timeout,$cookies,UserLogin,$window) {
	
	console.log($cookies.getObject('user'));
	
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
		$("#dateTimeStartPicker").on("dp.change", function (e) {
			console.log(new Date(e.date));
			$('#dateTimeEndPicker').data("DateTimePicker").minDate(e.date);
			if (new Date(e.date) < new Date()) {
				$scope.startTime = null;
			}
			else {
				$scope.startTime = new Date(e.date);
			}
		});
		$("#dateTimeEndPicker").on("dp.change", function (e) {
			$('#dateTimeStartPicker').data("DateTimePicker").maxDate(e.date);
			console.log(new Date(e.date));
			if (new Date(e.date) < new Date()) {
				$scope.endTime = null;
			}
			else {
				$scope.endTime = new Date(e.date);
			}
		});
		
	};
	$scope.pickDateTime();
	
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
	
}]);