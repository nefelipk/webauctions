
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
	
}]);