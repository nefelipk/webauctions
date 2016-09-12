angular.module('auction_land').controller('LoginController', 
		[ '$scope','$cookies','$timeout','UserLogin', function($scope,$cookies,$timeout,UserLogin) {
			
		$scope.user = {};	
		$scope.err = "";
		$scope.error_login = false;
		$scope.show_welcome = false;

		$scope.check_user_pass = function() {
			$scope.error_login = false;
			console.log($scope.user);
			UserLogin.save($scope.user).$promise.then(function(data) {
			    var input_elem = angular.element(document.querySelector('#login_div'));
				input_elem.removeClass("has-error");
				input_elem.addClass("has-succcess");
				$scope.show_welcome = true;
				$timeout(function() {
					$scope.show_welcome = false;
					$('#login_modal').modal('hide');
				},2000);
				console.log(data);
				$cookies.put('logged-in',true);
				$cookies.put('username',$scope.user.username);
				$cookies.put('password',$scope.user.password);
			},function() {
				$scope.error_login = true;
			    var input_elem = angular.element(document.querySelector('#login_div'));
				input_elem.removeClass("has-error");
				input_elem.removeClass("has-success");
				input_elem.addClass("has-error");
				$cookies.put('logged-in',false);
			});
		};

		/*
		$scope.submit = function() {
			console.log($scope.user.firstName);
			console.log($scope.user.password);
			$scope.user.location.country = $scope.user.country.name;
			// delete $scope.user.country;
			// User.save($scope.user);
		};
		*/
	} ]);
