
angular.module('auction_land').controller('ProfileController',
		['$scope','$timeout','$cookies','UserLogin','$window',
		 function($scope,$timeout,$cookies,UserLogin,$window) {

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
	console.log($cookies.getObject('user'));
	
	/*********************************************************************/
	/**********************************************************************
									TABS
	**********************************************************************/
	/*********************************************************************/
	
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
	
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
}]);