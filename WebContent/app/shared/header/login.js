angular.module('auction_land').controller('LoginController', 
		[ '$scope','$cookies','$timeout','UserLogin', function($scope,$cookies,$timeout,UserLogin) {
			
		$scope.user = {};	
		$scope.err = "";
		$scope.error_login = false;
		$scope.show_welcome = false;
		$scope.not_verified = false;

		$scope.login = function() {
			console.log(">>>>>> LOGIN <<<<<<<");
			$scope.error_login = false;
			console.log($scope.user);
			UserLogin.save($scope.user).$promise.then(function(data) {
			    var input_elem = angular.element(document.querySelector('#login_div'));
			    console.log(data.verified);
			    if (data.verified == true) {
			    	input_elem.removeClass("has-error");
					input_elem.addClass("has-succcess");
					$scope.show_welcome = true;
					$scope.not_verified = false;
					$scope.user = {};
					$timeout(function() {
						$scope.show_welcome = false;
						$('#login_modal').modal('hide');
						$cookies.putObject('user',data);
						$cookies.put('logged-in',true);
						//$cookies.put('username',$scope.user.username);
						//$cookies.put('password',$scope.user.password);
					},2000);
					console.log(data);
//					$cookies.put('logged-in',true);
//					$cookies.put('username',$scope.user.username);
//					$cookies.put('password',$scope.user.password);
			    }
			    else {
			    	input_elem.removeClass("has-error");
					input_elem.removeClass("has-succcess");
					input_elem.addClass("has-error");
			    	$scope.show_welcome = false;
					$scope.not_verified = true;
					$scope.user = {};
//					$scope.form.$setPristine(true);
//					$scope.form.$setUntouched(true);
					$timeout(function() {
						$scope.not_verified = false;
						$('#login_modal').modal('hide');
					},2000);
			    }
			},function() {
				$scope.error_login = true;
			    var input_elem = angular.element(document.querySelector('#login_div'));
				input_elem.removeClass("has-error");
				input_elem.removeClass("has-success");
				input_elem.addClass("has-error");
				$cookies.put('logged-in',false);
			});
		};

	} ]);
