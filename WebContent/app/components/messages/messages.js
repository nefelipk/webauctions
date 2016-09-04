
angular.module('auction_land').controller('MessagesController',
		['$scope','$timeout','Message',
		 function($scope,$timeout,Message) {
	$scope.pages = [1,2];		
	$scope.current_page = 1;
	$scope.selected = false;
	
	/*
	Message.query({username : $cookies.get('username')}).$promise.then(function(data) {
		console.log(data);
	});

	Message.query({username : 'ripone07'}).$promise.then(function(data) {
		console.log(data);
	});
	*/
	
	$scope.set_active = function(tab) {
		var inbox_tab = angular.element(document.querySelector('#inbox_tab'));
		var sent_tab = angular.element(document.querySelector('#sent_tab'));
		var compose_tab = angular.element(document.querySelector('#compose_tab'));
		inbox_tab.removeClass('active');
		sent_tab.removeClass('active');
		compose_tab.removeClass('active');
		
		if(tab == 1)
			compose_tab.addClass('active');
		else if(tab == 2)
			inbox_tab.addClass('active');
		else if(tab == 3)
			sent_tab.addClass('active');

	};
	
	$scope.message = {};
	$scope.message_sent = false;
	$scope.send = function() {
		
		$scope.message.senderUsername = "pro-one";
		//$scope.message.senderUsername = $cookies.get('username');
		$scope.read = false;
		var date = new Date();
		$scope.message.time = date.getTime();
		
		Message.save($scope.message).$promise.then(function(data) {
			$scope.message_sent = true;
			$scope.message = {};
			$timeout(function() { 
				$scope.message_sent = false; 
				//$('#inbox_tab').tab('show')
				//$scope.set_active(2);
			}, 3000);	
			return;
		});
	}
}]);