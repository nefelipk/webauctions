angular.module('auction_land').controller('LoginController', 
		[ '$scope','$cookies','$timeout','UserLogin', function($scope,$cookies,$timeout,UserLogin) {
			
		$scope.user = {};	
		$scope.err = "";
		$scope.error_login = false;
		$scope.wrong_data = false;
		$scope.show_welcome = false;
		$scope.not_verified = false;

		$scope.login = function() {
			console.log(">>>>>> LOGIN <<<<<<<");
			$scope.error_login = false;
			console.log($scope.user);
			UserLogin.save($scope.user).$promise.then(function(data) {
			    var input_elem = angular.element(document.querySelector('#login_div'));
			    console.log(data.verified);
			    console.log(data);
			    if (data.verified == true) {
			    	console.log("!!!!!!!!!! ok login");
			    	input_elem.removeClass("has-error");
					input_elem.addClass("has-succcess");
					$scope.show_welcome = true;
					$scope.not_verified = false;
					$scope.wrong_data = false;
					$scope.user = {};
					$timeout(function() {
						$scope.show_welcome = false;
						$('#login_modal').modal('hide');
						$cookies.putObject('user',data);
						$cookies.put('logged-in',true);
					},2000);
					console.log(data);
			    }
			    else if (data.verified == false) {
			    	console.log("!!!!!!!!!! not verified");
			    	input_elem.removeClass("has-error");
					input_elem.removeClass("has-succcess");
					input_elem.addClass("has-error");
			    	$scope.show_welcome = false;
					$scope.not_verified = true;
					$scope.wrong_data = false;
					$scope.user = {};
					$timeout(function() {
						$scope.not_verified = false;
						$('#login_modal').modal('hide');
					},2000);
			    }
			    else {
			    	console.log("!!!!!!!!!! that user does not exist");
			    	$scope.wrong_data = true;
			    	$scope.show_welcome = false;
					$scope.not_verified = false;
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
