angular.module('auction_land').controller('UserController', [ '$scope', 'User', function($scope, User) {

		$scope.username_pattern = "([a-z]|[A-Z]|[0-9])*";
		/*
		 * regex from :
		 */
		var strong_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		var medium_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

		$scope.strength = function(pass) {
			if (strong_regex.test(pass)) {
				$scope.pass_class = 1;
				$scope.pass_message = "strong";
				$scope.strong = true;
				$scope.medium = false;
				$scope.progress_width = "100%";
			} else if (medium_regex.test(pass)) {
				$scope.pass_class = 2;
				$scope.pass_message = "medium (accepted)";
				$scope.medium = true;
				$scope.strong = false;
				$scope.progress_width = "50%";
			} else {
				$scope.pass_class = 3;
				$scope.strong = false;
				$scope.medium = false;
				$scope.progress_width = "1%";
				$scope.pass_message = "invalid";
			}
		};
		$scope.match = false;
		$scope.confirm_pass = function() {
			var confirm_div = angular.element(document.querySelector('#confirm-div'));
			if ($scope.user.password == $scope.form.confirm.$viewValue) {
				$scope.form.confirm.$error.match = false;
				confirm_div.removeClass("has-error");
				$scope.match = true;
			} else {
				$scope.form.confirm.$error.match = true;
				$scope.match = false;
				confirm_div.addClass("has-error");
			}
		};

		$scope.err = "";
		$scope.check_username = function() {
			if (username != "") {
				User.get({
					username : $scope.user.username
				}).$promise.then(function(data) {
					var input_elem = angular.element(document.querySelector('#username_div'));
					var i = angular.element(document.querySelector('#i_username'));
					input_elem.removeClass("has-error");
					input_elem.removeClass("has-succcess");
					if (data.exists) {
						input_elem.addClass("has-error");
						$scope.form.username.$error.exists = true;
					} else {
						input_elem.addClass("has-success");
						$scope.form.username.$error.exists = false;
					}
					$scope.err = "already exists!";
					console.log(input_elem);

				}, function() {
					alert("OOOPS:We are very sorry, server could not be reached.Please try again later.");
				});
			}
		};

		$scope.submit = function() {
			console.log(">>>>>> SUBMIT <<<<<<<");
			console.log($scope.user.firstName);
			console.log($scope.user.password);
			$scope.user.location.country = $scope.user.country.name;
			delete $scope.user.country;
			User.save($scope.user).$promise.then(function(data) {
				// bring form at initial
				// state
				$scope.user = {};
				$scope.confirm = "";
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
				$('#signup_response').modal('show');
				console.log(data);
			}, function() {
				$('#signup_modal').modal('hide');
				$scope.success = false;
				$scope.title = "Error";
				$scope.message = "We are terribly sorry.\nThere must have been a server error.";
				$('#signup_response').modal('show');
				console.log("error");
				$scope.submitted = false;
			});
		};

		$scope.countries = countries;

	} ]);