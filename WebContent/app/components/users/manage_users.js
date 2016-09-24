
angular.module('auction_land').controller('UserManagerController',
		['$scope','$timeout','$cookies','AllUsers','UserVerify','$window',
		 function($scope,$timeout,$cookies,AllUsers,UserVerify,$window) {
		
		$scope.allUsers = function() {
		AllUsers.query().$promise.then(function(data) {
			
			$scope.users = data;
			console.log($scope.users);
			
			$scope.headers = {
				fields: [{
					orderByField: 'id',
					name: 'Id',
			    },{
			    	orderByField: 'username',
			    	name: 'Username',
			    },{
			    	orderByField: 'firstname',
			    	name: 'First name',
			    },{
			    	orderByField: 'lastname',
			    	name: 'Last name',
			    },{
			    	orderByField: 'email',
			    	name: 'Email',
			    },{
			    	orderByField: 'phone',
			    	name: 'Phone',
			    },{
			    	orderByField: 'afm',
			    	name: 'TRN',
			    },{
			    	orderByField: 'ratingBidder',
			    	name: 'Rating as bidder',
			    },{
			    	orderByField: 'ratingSeller',
			    	name: 'Rating as seller',
			    },{
			    	orderByField: 'verified',
			    	name: '',
			    }]
			};
			$scope.orderByField = 'username';
			$scope.descending = false;
			console.log($scope.orderByField);
		    console.log($scope.descending);
		});
	};
	$scope.allUsers();
	
	
	$scope.changeSorting = function(field) {
		console.log(field);
	    if ($scope.orderByField == field) {
	    	$scope.descending = !$scope.descending;
	    } else {
	    	$scope.orderByField = field;
	    	$scope.descending = false;
	    }
	    console.log($scope.orderByField);
	    console.log($scope.descending);
	};
	
	
	$scope.confirm = function(user) {
		console.log(">>>>>> Confirm <<<<<<<");
		console.log(user.username);
		console.log(user.verified);
		user.verified = !user.verified;
		console.log(user.verified);
		
		UserVerify.save(user).$promise.then(function() {
			console.log(user);
		}, function() {
			alert("OOOPS: We are very sorry, server could not be reached. Please try again later.");
			console.log("error");
		});
	};
	
	
	/*********************************************************************/
	/**********************************************************************
								PAGINATION 
	**********************************************************************/
	/*********************************************************************/

//	
//	var users_per_page = 10;
//	$scope.current_page = 1;
//	
//	$scope.fix_pages = function() {
//		$scope.pages = [];
//		for(i = 0; i < $scope.presented_messages.length/users_per_page; i++)
//			$scope.pages.push(i+1);
//		$scope.last_page = $scope.pages[$scope.pages.length-1];
//		$scope.current_page = 1;
//	};
//	
//	$scope.get_items = function() {
//		var from = ($scope.current_page - 1) * users_per_page;
//		var to = $scope.current_page * users_per_page;
//		if ($scope.current_page * users_per_page >= $scope.presented_messages.length)
//			to = $scope.presented_messages.length;
//		return $scope.presented_messages.slice(from, to);
//	};
//	
//	$scope.get_page = function(page_num) {
//		$scope.current_page = page_num;
//		$scope.current_items = $scope.get_items();
//		$window.scrollTo(0,0);	
//	}; 
//	
//
//	$scope.current_items = $scope.get_items();
	
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
}]);