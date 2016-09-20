
angular.module('auction_land').controller('UserManagerController',
		['$scope','$timeout','$cookies','AllUsers','$window',
		 function($scope,$timeout,$cookies,AllUsers,$window) {

			
	$scope.allUsers = function() {
		AllUsers.query().$promise.then(function(data) {
			console.log(data);
			console.log(data.length);
			
			for(i = 0; i < data.length; i++) {
				console.log(data[i].username);
			}
			
//			$scope.inbox =  Object.keys(data[0]).map(function(k) { return data[0][k] });
//			$scope.sent =  Object.keys(data[1]).map(function(k) { return data[1][k] });
//	
//			for(i = 0; i < $scope.inbox.length; i++) {
//				$scope.inbox[i].pos = i+1;
//				add_readable_date($scope.inbox[i]);
//				fix_first_line($scope.inbox[i]);
//			}
//			for(i = 0; i < $scope.sent.length; i++) {
//				$scope.sent[i].pos = i+1;
//				add_readable_date($scope.sent[i]);
//				fix_first_line($scope.sent[i]);
//			}
//			
//			$scope.presented_messages = $scope.inbox;
//			$scope.fix_pages();
//			$scope.current_items = $scope.get_items();
//			//console.log($scope.presented_messages.length);
//			console.log($scope.inbox);
//			console.log($scope.sent);

		});
	};
	$scope.allUsers();		
			
	
			
	$scope.username = $cookies.getObject('user').username;
	$scope.name = $cookies.getObject('user').firstName;
	$scope.surname = $cookies.getObject('user').lastName;
	$scope.email = $cookies.getObject('user').email;
	$scope.phone = $cookies.getObject('user').phone;
	$scope.trn = $cookies.getObject('user').afm;
	$scope.country = $cookies.getObject('user').location.country;
	$scope.city = $cookies.getObject('user').location.city;
	$scope.address = $cookies.getObject('user').location.address;
	$scope.postalCode = $cookies.getObject('user').location.postalCode;
	
	$scope.current_tab = "Overview";
	$scope.set_active = function(tab) {
		var overview_tab = angular.element(document.querySelector('#overview_tab'));
		var changePass_tab = angular.element(document.querySelector('#changePass_tab'));
		var edit_tab = angular.element(document.querySelector('#edit_tab'));
		overview_tab.removeClass('active');
		changePass_tab.removeClass('active');
		edit_tab.removeClass('active');
		
		if(tab == 1) {
			$scope.current_tab = "Overview";
			overview_tab.addClass('active');
		}
		else if(tab == 2) {
			edit_tab.addClass('active');
			$scope.current_tab = "Edit";
		}
		else if(tab == 3) {
			$scope.current_tab = "ChangePass";
			changePass_tab.addClass('active');
		}
		$scope.reading_sent = false;
		$scope.reading = false
	};
	
}]);