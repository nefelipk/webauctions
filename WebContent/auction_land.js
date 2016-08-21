(function() {
	var app = angular.module('auction_land', [ 'ngResource', 'ngMessages', 'dibari.angular-ellipsis' ]);

	/*
	 * app.config(['$routeProvider',function($routeProvider){ $routeProvider
	 * .when('/',{ templateUrl : 'welcome.html', }) .when('/messages', {
	 * templateUrl : 'messages.html', }); }]);
	 */

	app.factory('User', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/users/:username');
	} ]);

	app.factory('UserPass', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/users/:user_pass', {
			username : '@username',
			password : '@password'
		});
	} ]);

	app.factory('Item', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/items/:term');
	} ]);

	app.controller('UserController', [ '$scope', 'User', function($scope, User) {

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

	app.controller('LoginController', [ '$scope', 'UserPass', function($scope, User) {

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

	/*
	 * app.controller('UserController',['$scope','User',function($scope,User) {
	 * $scope.submit_function = function() { User.save($scope.user);
	 * console.log("key pressed"); } }]);
	 */

	/*
	 * app.controller('SearchController', [ '$scope', '$window',
	 * function($scope, $window) {
	 * 
	 * $scope.category = false; $scope.price_low = 50; $scope.price_mid = 100;
	 * $scope.price_high = 200; $scope.location_continent = false;
	 * $scope.location_from_km = false; $scope.location_to_km = false;
	 * $scope.description = false;
	 * 
	 * 
	 * $scope.must = true; $scope.current_content = $scope.content;
	 * console.log($scope.current_content); $scope.test_search = function() {
	 * console.log("here"); $scope.search(); } $(window).on("resize.doResize",
	 * function() {
	 * 
	 * $scope.$apply(function() { if(window.innerWidth < 1290) { $scope.must =
	 * false; } else { $scope.must = true; } }); }); } ]);
	 */
	/*
	 * app.controller('MainContentController',['$window','$rootScope','$scope','Item',function($window,$rootScope,$scope,Item) { // //
	 * console.log("called"); // $scope.content = "main"; };
	 * 
	 * 
	 * 
	 * }]);
	 */

	app.controller('AuctionsController', [ '$window', '$scope', 'Item', function($window, $scope, Item) {
		$scope.content = "index";
		
		$scope.search = function(term) {
			Item.query({term : term}).$promise.then(function (data) {
				$scope.items = data.slice();
				//$scope.filtered_items = $.extend(true,[],$scope.items);
				$scope.filtered_items = angular.copy($scope.items);//.slice();
				$scope.filtered_items.pop();
				$scope.pages = Array.apply(null, {length: $scope.filtered_items.length/10}).map(Number.call, Number);
				console.log($scope.items);
				$scope.fix_filter_prices($scope.items);
				$scope.content = "main";
			});
			// $window.location.href =
			// '/WebAuctions/main.html';

		};
		
		var max_bids_array = [];
		$scope.fix_filter_prices = function(items) {
			for(i = 0; i < items.length-1; i++) {
				var max = $scope.get_max_bid(items[i]);
				items[i].max = max;
				max_bids_array.push(max);
				max_bids_array.sort(function(a, b){return a-b});
			}
			$scope.mid_price = (max_bids_array[max_bids_array.length-1] + max_bids_array[0]) / 2;
			console.log($scope.mid_price);
		}
		
		
		$scope.get_max_bid = function(item) {
			if(item != null) {
				if(item.bids != null) {
					var bids = item.bids.slice();
					var max = Math.max.apply(Math,bids.map(function(o){return o.amount;}));
					return max;
				}
			}
			return null;
		};
		
		
		$scope.get_max_bid_object = function(item) {
			var pos = 0;
			var max = item.bids[pos].amount;
			for(i = 1; i < item.bids; i++) {
				if(item.bids[i] > max) {
					max = item.bids[i].amount;
					pos = i;
				}
			}
			return item.bids[pos];
		}
		
		$scope.get_ending_time = function(item) {
			if(item.ends == null) { 
				var last_bid = $scope.get_max_bid_object(item)
				if(last_bid != null) {
					var ends = Date.parse(last_bid.time);
					if(ends < Date.now()) {
						return "Ended";
					}
				}
				else return "Ended";
			}
			else {
				return item.ends;
			}
		};
		
		$scope.clicked_item = false;
		$scope.set_current = function(item) {
			$scope.current = item;
			$scope.clicked_item = true;
		};

		/* object $scope.filter.<filter_name> */
		$scope.category = false;
		$scope.price_low = 50;
		$scope.price_mid = 100;
		$scope.price_high = 200;
		$scope.location_continent = false;
		$scope.location_from_km = false;
		$scope.location_to_km = false;
		$scope.description = false;
		/**/

		$scope.must = true;
		$scope.current_content = $scope.content;

		$scope.test_search = function() {
			$scope.search();
		}

		$scope.current_page = 1;
		var items_per_page = 10;

		$scope.getItems = function() {
			var from = ($scope.current_page - 1) * items_per_page;
			var to = $scope.current_page * items_per_page;
			if ($scope.current_page * items_per_page >= $scope.filtered_items.length)
				to = $scope.filtered_items.length;
			
			return $scope.filtered_items.slice(from, to);
		};
		
		$scope.get_rating = function(item) {
			if(item.user.ratingSeller == 0 || item.user.ratingSeller == null)
				return "Not yet rated";
			else 
				return item.user.ratingSeller;
		};
		
		$scope.categories = null;
		$scope.getCategories = function() {
			if ($scope.categories == null) {
				$scope.categories = $scope.items[$scope.items.length - 1].categories
				return $scope.categories;
			}
			return $scope.categories;
		};
		
		$scope.live_filters = {
			category : null
		};
		
		$scope.filter = function() {
			console.log("called");
			console.log(max_bids_array);

			$scope.filtered_items = angular.copy($scope.items);//.slice();
			$scope.filtered_items.pop();
			var length = $scope.filtered_items.length;
			if($scope.live_filters.category_change == true) {
				for (var i = length-1; i >= 0; i--) {
					var found = false;
					console.log($scope.filtered_items[i].categories);
					for (var j = 0; (j < $scope.filtered_items[i].categories.length) && !found; j++) {
						if ($scope.filtered_items[i].categories[j].name == $scope.live_filters.category.name)
							found = true;
					}
					if (!found)
						$scope.filtered_items.pop()
				}
			}
			
			if($scope.live_filters.option_price_change == true) {
				//console.log("price");
				for (var i = length-1; i >= 0; i--) {
					console.log($scope.live_filters.price);
					if($scope.live_filters.price == "less" && $scope.filtered_items[i].max >= $scope.mid_price)
						$scope.filtered_items.pop();
					else if($scope.live_filters.price == "more" && $scope.filtered_items[i].max <= $scope.mid_price)
						$scope.filtered_items.pop();
				}
			}
		
			$scope.live_filters.category_change = false;
			$scope.live_filters.option_price_change = false;
			
			//console.log(length);
			//console.log($scope.filtered_items);
			//console.log($scope.items);
		};


		$(window).on("resize.doResize", function() {

			$scope.$apply(function() {
				if (window.innerWidth < 1290) {
					$scope.must = false;
				} else {
					$scope.must = true;
				}
			});
		});

	} ]);

})();

/*
 * main.html sidebar following scroll.
 */
/*
 * $(function() {
 * 
 * $('.dropdown-toggle').dropdown();
 * 
 * var $sidebar = $("#sidebar"), $window = $(window), offset =
 * $sidebar.offset(), topPadding = 15; //var footer_top =
 * $('#footer').offset().top; //console.log(footer_top); var document_height =
 * $(document).height();
 * 
 * $window.scroll(function() { //console.log(document_height-footer_top);
 * console.log($window.scrollTop()); if ($window.scrollTop() > offset.top &&
 * ($window.scrollTop() < (document_height - 20))) { $sidebar.stop().animate({
 * marginTop: $window.scrollTop() + topPadding }); } else {
 * $sidebar.stop().animate({ marginTop: 0 }); }
 * 
 * }); });
 * 
 */
