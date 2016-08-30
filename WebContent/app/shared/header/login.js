angular.module('auction_land').controller('LoginController', [ '$scope', 'UserPass', function($scope, User) {

		// $scope.err = "";
		// $scope.check_username = function() {
		// User.query().$promise.then(function(data,all_users) {
		// var not_exists = true;
		// for(var i = 0; i < data.length; i++) {
		// console.log(data[i].username);
		// if($scope.user.username == data[i].username) {
		// console.log("username does not exist");
		// not_exists = false;
		// }
		// }
		// console.log(not_exists);
		// var input_elem =
		// angular.element(document.querySelector('#username_div'));
		// var i =
		// angular.element(document.querySelector('#i_username'));
		// input_elem.removeClass("has-error");
		// input_elem.removeClass("has-succcess");
		// if(not_exists) {
		// input_elem.addClass("has-error");
		// $scope.form.username.$error.not_exists = true;
		// }
		// else {
		// input_elem.addClass("has-success");
		// $scope.form.username.$error.not_exists = false;
		// }
		// $scope.err = "does not exist!";
		// console.log(input_elem);
		// });
		// }

		$scope.err = "";
		$scope.check_user_pass = function() {
			UserPass.get({
				username : $scope.user.username,
				password : $scope.user.password
			}).$promise.then(function(data) {
				var wrong = true;
				if (data != null) {
					console.log("username and password are correct");
					wrong = false;
				}
				document.write("user and pass: " + wrong + " ");
				console.log(wrong);
				input_elem.removeClass("has-error");
				input_elem.removeClass("has-succcess");
				if (wrong) {
					input_elem.addClass("has-error");
					$scope.form.login.$error.wrong = true;
				} else {
					input_elem.addClass("has-success");
					$scope.form.login.$error.wrong = false;
				}
				$scope.err = "wrong!";
				console.log(input_elem);
			});
		};

		// $scope.err = "";
		// $scope.check_password = function() {
		// User.query().$promise.then(function(data,all_users) {
		// var wrong = true;
		// for(var i = 0; i < data.length; i++) {
		// console.log(data[i].username);
		// console.log(data[i].password);
		// console.log(data);
		// if($scope.user.username == data[i].username) {
		// console.log(data[i].password);
		// document.write("data password: " + data[i].password);
		// document.write("scope password: " + $scope.user.password);
		// if($scope.user.password == data[i].password) {
		// console.log("password is correct");
		// wrong = false;
		// }
		// }
		// }
		// console.log(wrong);
		// var input_elem =
		// angular.element(document.querySelector('#password_div'));
		// var i =
		// angular.element(document.querySelector('#i_password'));
		// input_elem.removeClass("has-error");
		// input_elem.removeClass("has-succcess");
		// if(wrong) {
		// input_elem.addClass("has-error");
		// $scope.form.pass.$error.wrong = true;
		// }
		// else {
		// input_elem.addClass("has-success");
		// $scope.form.pass.$error.wrong = false;
		// }
		// $scope.err = "wrong!";
		// console.log(input_elem);
		// });
		// }

		$scope.submit = function() {
			console.log($scope.user.firstName);
			console.log($scope.user.password);
			$scope.user.location.country = $scope.user.country.name;
			// delete $scope.user.country;
			// User.save($scope.user);
		};
	} ]);
