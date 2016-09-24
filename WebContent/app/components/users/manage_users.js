
angular.module('auction_land').controller('UserManagerController',
		['$scope','$timeout','$cookies','AllUsers','UserVerify','$window',
		 function($scope,$timeout,$cookies,AllUsers,UserVerify,$window) {

			
			
			/*app.directive('fixedTableHeaders', ['$timeout', function($timeout) {
				  return {
				    restrict: 'A',
				    link: function(scope, element, attrs) {
				      $timeout(function() {
				          var container = element.parentsUntil(attrs.fixedTableHeaders);
				          element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });
				      }, 0);
				    }
				  }
				}]); */
			
			
	/*	$scope.scrollWithfixedTableHeaders = function(scope, element, attrs) {
		      $timeout(function() {
		          var container = element.parentsUntil(attrs.fixedTableHeaders);
		          element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });
		      }, 0);
		    };
		    $scope.scrollWithfixedTableHeaders();*/
		
		
		$scope.allUsers = function() {
		AllUsers.query().$promise.then(function(data) {
//			console.log(data);
//			console.log(data.length);
//			
//			for(i = 0; i < data.length; i++) {
//				console.log(data[i].username);
//			}
			
			$scope.users = data;
			console.log($scope.users);
			
//			$scope.orderByField = 'username';
//			$scope.descending = false;
			
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
//			$scope.sort = {
//				orderByField: 'username',
//				descending: false
//			};
			
			/*$scope.changeSorting = function(field) {
//			    var sort = $scope.sort;
				console.log(field);
//				if (field == 'verified') return;
			    if ($scope.orderByField == field) {
			    	$scope.descending = !$scope.descending;
			    } else {
			    	$scope.orderByField = field;
			    	$scope.descending = false;
			    }
			    console.log($scope.orderByField);
			    console.log($scope.descending);
			};*/
			
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
	
	
	$scope.changeSorting = function(field) {
//	    var sort = $scope.sort;
		console.log(field);
//		if (field == 'verified') return;
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
		
		UserVerify.save(user).$promise.then(function(user) {

			/*// bring form at initial
			// state
			$scope.user = {};
			$scope.confirm2 = "";
			$scope.match = false;
			$scope.strong = false;
			$scope.medium = false;
			var input_elem = angular.element(document.querySelector('#username_div'));
			input_elem.removeClass("has-succcess");
			input_elem.removeClass("has-succcess");
			$scope.form.$setPristine(true);
			$scope.form.$setUntouched(true);

			$scope.submitted = false;
			//
			$('#signup_modal').modal('hide');
			$scope.success = true;
			$scope.title = "Success";
			$scope.message = "Your registration has been successfull! Please wait untill an admin verify your application.\nThank you.";
			$('#signup_response').modal('show');*/
			//console.log(data);
		}, function() {
			//console.log(data);
			/*$('#signup_modal').modal('hide');
			$scope.success = false;
			$scope.title = "Error";
			$scope.message = "We are terribly sorry.\nThere must have been a server error.";
			$('#signup_response').modal('show');
			console.log("error");
			$scope.submitted = false;*/
		});
	};
	
	
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