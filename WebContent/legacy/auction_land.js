(function() {
	var app = angular.module('auction_land', ['ngResource','LocalStorageModule','ngRoute', 'ngMessages', 'dibari.angular-ellipsis','uiGmapgoogle-maps' ])
	.config(function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyAkwqT274QZMdhfDQCS_C71GJ5wR5rmDRE',
	        // v: '3.20', //defaults to latest 3.X anyhow
	        libraries: 'weather,geometry,visualization'
	});
	});
	
	app.config(['$routeProvider',function($routeProvider){ 
		$routeProvider
			.when('/',{ templateUrl : 'app/components/home/index_tmpl.html', }) 
			.when('/messages', { templateUrl : 'app/components/messages.html', })
			.when('/search', {templateUrl : 'app/components/search/search_tmpl.html', })
			.when('/item', {templateUrl : 'app/components/auction/item_tmpl.html', });
	}]);
	

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
	
	app.service('SearchService', function() {
		var items = [];
		var add_items = function(list_items) {
			items = angular.copy(list_items);
		};
		var get_items = function() {
			return items;
		};
		return {
			add_items : add_items,
			get_items : get_items
		};
	});
	
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
	
	app.controller('SearchController',['$scope','$route','localStorageService','$location','Item','SearchService',
	                                   function($scope,$route,localStorageService,$location,Item,SearchService) {
		$scope.search = function(term) {
			Item.query({term : term}).$promise.then(function (data) {
				localStorageService.remove('auctions');
				$scope.items = data.slice();
				SearchService.add_items($scope.items);
				console.log($scope.items);
				localStorageService.set('auctions',$scope.items);
				$route.reload();
				$location.path("/search");
			});	
		};
		
		$scope.print = function() {
			console.log("search_controller");
		};
	}]);
		
	app.controller('AuctionsController', [ '$window', '$scope','$location','localStorageService','AuctionService','Item','SearchService',
	                                       function($window, $scope,$location,localStorageService,AuctionService,Item,SearchService ) {
		
		$scope.items = localStorageService.get('auctions');
		console.log("refreshed items : ");
		console.log($scope.items);
		
		var items_per_page = 5;
		$scope.items_per_page = items_per_page;
		
		$scope.search = function(term) {
			Item.query({term : term}).$promise.then(function (data) {
				$scope.items = data.slice();
				
				console.log($scope.items);
				$scope.fix_filter_prices($scope.items);
				$scope.filtered_items = angular.copy($scope.items);
				$scope.filtered_items.pop();
				
				$scope.fix_pages();
				console.log($scope.pages);
				
				$scope.current_items = $scope.get_items();
				
			});
		};
		
		$scope.current_page = 1;
				
		$scope.fix_pages = function() {
			$scope.pages = [];
			console.log($scope.filtered_items.length/items_per_page);
			for(i = 0; i < $scope.filtered_items.length/items_per_page; i++)
				$scope.pages.push(i+1);
			$scope.last_page = $scope.pages[$scope.pages.length-1];
			$scope.current_page = 1;
		};
		
		$scope.get_items = function() {
			var from = ($scope.current_page - 1) * items_per_page;
			var to = $scope.current_page * items_per_page;
			if ($scope.current_page * items_per_page >= $scope.filtered_items.length)
				to = $scope.filtered_items.length;
			return $scope.filtered_items.slice(from, to);
		};
		
		$scope.get_page = function(page_num) {
			$scope.current_page = page_num;
			$scope.current_items = $scope.get_items();
			$window.scrollTo(0,0);	
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
		
		/******** convention ********/
		$scope.get_ending_time = function(item) {
			if(item.ends == null) { 
				var last_bid = $scope.get_max_bid_object(item)
				if(last_bid != null) {
					var ends = Date.parse(last_bid.time);
					if(ends < Date.now()) {
						item.ended = true;
						return "Ended";
					}
				}
				else {
					item.ended = true;
					return "Ended";
				}
			}
			else {
				var ends = Date.parse(item.ends);

				if(ends < Date.now()) {
					item.ended = true;
					return "Ended";
				}
				else {
					item.ended = false;
					return  Date.parse(ends);
				}
			}
		};
		
		//$scope.items = SearchService.get_items();
		console.log("items : ");
		console.log($scope.items);
		$scope.fix_filter_prices($scope.items);
		$scope.filtered_items = angular.copy($scope.items);
		$scope.filtered_items.pop();
		$scope.fix_pages();
		console.log($scope.pages);
		$scope.current_items = $scope.get_items();
		
		var marker_key = 0;
		$scope.set_current = function(item) {
			item.mkey = marker_key++;
			AuctionService.set_current_auction(item);
		};
		
		$scope.location_continent = false;
		$scope.location_from_km = false;
		$scope.location_to_km = false;
		$scope.description = false;
		/**/

		$scope.test_search = function() {
			$scope.search();
		}
		
		$scope.get_rating = function(item) {
			if(item.user.ratingSeller == 0 || item.user.ratingSeller == null)
				return "Not yet rated";
			else 
				return item.user.ratingSeller;
		};
		
		$scope.categories = null;
		$scope.getCategories = function() {
			if ($scope.categories == null) {
				$scope.categories = $scope.items[$scope.items.length - 1].categories.sort(function(a,b) {
					if(a.name< b.name)
						return -1;
				    if(a.name > b.name)
				    	return 1;
				});
				return $scope.categories;
			}
			return $scope.categories;
		};
		
		$scope.live_filters = {
			category : null
		};
		
		
		$scope.applied_filters = {
			category : false,
			mid_price : false,
			given_price : false,
			location : false,
			country : false,
			free_text : false
		};
		
		$scope.filter = function() {
			
			$scope.apllied_any_filter = true;
			
			$scope.filtered_items = angular.copy($scope.items);
			$scope.filtered_items.pop();
			
			if($scope.applied_filters.category == true)
				$scope.filter_by_category();
				
			if($scope.applied_filters.mid_price == true) 
				$scope.filter_by_mid_price();
			
			if($scope.applied_filters.given_price == true)
				$scope.filter_by_given_price();
					
			if($scope.applied_filters.free_text == true)
				$scope.filter_by_description();
			
			if($scope.applied_filters.country == true) 
				$scope.filter_by_country();
			
			$scope.fix_pages();
			$scope.current_items = $scope.get_items();
			
		};

		$scope.filter_by_category = function() {
			if($scope.live_filters.category == null) {
				$scope.filtered_items = angular.copy($scope.items);
				$scope.filtered_items.pop();
			}
			else {
				for (var i = $scope.filtered_items.length-1; i >= 0; i--) {
					var found = false;
					console.log($scope.filtered_items[i].categories);
					for(var j = 0; (j < $scope.filtered_items[i].categories.length) && !found; j++) {
						if($scope.filtered_items[i].categories[j].name == $scope.live_filters.category.name)
							found = true;
					}
					if (!found)
						$scope.filtered_items.splice(i,1);
				}
			}
		};
		
		$scope.filter_by_mid_price = function() {
			console.log("filter by mid price");
			for (var i = $scope.filtered_items.length-1; i >= 0; i--) {
				if($scope.live_filters.price == "less" && $scope.filtered_items[i].max >= $scope.mid_price)
					$scope.filtered_items.splice(i,1);
				else if($scope.live_filters.price == "more" && $scope.filtered_items[i].max <= $scope.mid_price)
					$scope.filtered_items.splice(i,1);
			}
		};
		
		$scope.filter_by_given_price = function() {
			console.log("filter by given price");
			for (var i = ($scope.filtered_items.length)-1; i >= 0 ; i--) {
				console.log($scope.filtered_items[i].max);
				if(($scope.live_filters.price_from > $scope.filtered_items[i].max) 
						|| ($scope.live_filters.price_to < $scope.filtered_items[i].max)) {
					$scope.filtered_items.splice(i,1);
				}
			}
		};
		
		$scope.filter_by_description = function() {
			console.log("description");
			console.log($scope.live_filters.text);
			var regex = new RegExp($scope.live_filters.text,'gi');
			for(var i = $scope.filtered_items.length-1; i >= 0; i--) {
				var res = $scope.filtered_items[i].description.match(regex); 
				if(res == null)
					$scope.filtered_items.splice(i,1);
				else 
					console.log($scope.filtered_items[i].name+" "+res);
			}
		};
		
		$scope.filter_by_country = function() {
			console.log("filter by location");
			for(var i = $scope.filtered_items.length-1; i >= 0; i--) {
				var regex = new RegExp($scope.live_filters.country,'gi');
				var res = $scope.filtered_items[i].location.country.match(regex); 
				if(res == null) {
					res = $scope.filtered_items[i].location.location.match(regex);
					if(res == null)
						$scope.filtered_items.splice(i,1);
					else
						console.log($scope.filtered_items[i].name+" "+res);
				}
				else 
					console.log($scope.filtered_items[i].name+" "+res);
			}
		}
		
		$scope.clear_filters = function() {
			$scope.live_filters.category = null;
			$scope.live_filters.price = null;
			$scope.live_filters.price_from = null;
			$scope.live_filters.price_to = null;
			$scope.live_filters.text = "";
			
			$scope.apllied_any_filter = false;
			$scope.applied_filters.category = false;
			$scope.applied_filters.mid_price = false;
			$scope.applied_filters.given_price = false;
			$scope.applied_filters.location = false;
			$scope.applied_filters.free_text = false;
						
			$scope.filtered_items = angular.copy($scope.items);
			$scope.filtered_items.pop();

			$scope.fix_pages();
			$scope.current_page = 1;
			$scope.current_items = $scope.get_items();
		}
		
		$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
			var google = AuctionService.get_google_api();
			var map = AuctionService.get_map();
			console.log("called");
			current_item_location();
			google.maps.event.trigger(map.control.getGMap(), 'resize'); 
			console.log("exit");
		});
		
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
	
	app.service('AuctionService',function() {
		var current_auction = null;
		var google_api = null;
		var map_instance = null;
		var set_current_auction = function(auction) {
			current_auction = auction;
		};
		var get_current_auction = function() {
			return current_auction;
		};
		var get_google_api = function() {
			return google_api;
		};
		var set_google_api = function(google) {
			google_api = google;
		};
		var set_map = function(map) {
			map_instance = map;
		};
		var get_map = function() {
			return map_instance; 
		};
		
		return {
			set_current_auction : set_current_auction,
			get_current_auction : get_current_auction,
			get_google_api : get_google_api,
			set_google_api : set_google_api,
			set_map : set_map,
			get_map : get_map
		};
	}); 
	
	var global_google = "";

	app.controller('AuctionController',['$scope','$route','localStorageService','AuctionService','uiGmapGoogleMapApi', function($scope,$route,localStorageService,AuctionService,uiGmapGoogleMapApi) {
		
		$scope.current = AuctionService.get_current_auction();
		console.log($scope.current);
		if($scope.current == null)
			$scope.current = localStorageService.get('current_item');
		localStorageService.set('current_item',$scope.current);
		  
		$scope.get_first_bid = function(auction) {
			auction.firstBid = auction.firstBid.replace('$','');
			console.log(auction.firstBid);
			return auction.firstBid;
		};
		
		$scope.get_ending_time = function(auction) {
			if(auction.ended)
				return "Ended";
			else
				return auction.ends;
		};
		
		current_item_location = function() {
			if(($scope.current.location.latitude != 0) && ($scope.current.location.longitude != 0)) {
				console.log("CURRENT ITEM MAP")
				var coords = { latitude : $scope.current.location.latitude, longitude : $scope.current.location.longitude};
				$scope.current.coords = coords;
				$scope.map.center.latitude = $scope.current.location.latitude;
				$scope.map.center.longitude = $scope.current.location.longitude;
				
				var loc = { lat: coords.latitude, lng: coords.longitude};
		        $scope.geocoder.geocode({'location': loc}, function(results, status) {
		        	if(status == google.maps.GeocoderStatus.OK) {
		                if(results[1]) 
		                	$scope.current.final_location = results[1].formatted_address;	
		                else 
		                	alert('No results found');
		        	}
		        	else {
		        		alert('Geocoder failed due to: ' + status);
		        	}
		        });
			}
			
			else {
				/*
				 * country + if(city == null) -> location -> if(location ==
				 * null) -> address
				 * 
				 * else (plain)country
				 */
				
				$scope.geocoder.geocode( { 'address': $scope.current.location.country }, function(results, status) {
					if(status == google.maps.GeocoderStatus.OK) {
						console.log(results[0].geometry.location.lat());
						var coords = {latitude :  results[0].geometry.location.lat(), longitude : results[0].geometry.location.lng()};
						$scope.map.center.latitude = coords.latitude;
						$scope.map.center.longitude = coords.longitude;
			        	$scope.current.coords = coords;
			        	
						$scope.current.final_location = $scope.current.location.country

			        } 
					else {
			          alert("Geocode was not successful for the following reason: " + status);
			        }
			    });
			}
			AuctionService.set_map($scope.map);
			
		};
		
		$scope.map = { control:{}, center: { latitude: 45, longitude: -73 }, zoom: 5 };

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.markers = [];	
			$scope.google = google;
			$scope.geocoder = new google.maps.Geocoder();
			console.log($scope.map);
			console.log("google api returned");
			AuctionService.set_google_api($scope.google);
			AuctionService.set_map($scope.map);
		});
			
		
		
	}]);
	
	app.controller('FiltersController',['$scope',function($scope) {
		
		if(window.innerWidth < 1290)
			$scope.show_filters = false;
		else
			$scope.show_filters = true;
		
		$(window).on("resize.doResize", function() {
			$scope.$apply(function() {
				if (window.innerWidth < 1290)
					$scope.show_filters = false;
				else 
					$scope.show_filters = true;
			});
		});
	}]);

})();

/*
 * filters sidebar following scroll.
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
