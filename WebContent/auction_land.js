(function() {
	var app = angular.module('auction_land', [ 'ngResource','ngMessages','dibari.angular-ellipsis']);
		
/*	
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl : 'welcome.html',
		})
		.when('/messages', {
			templateUrl : 'messages.html',
		});
	}]);
*/	
	
	app.factory('User', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/users/:username');
	} ]);
	
	app.factory('UserPass', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/users/:user_pass', {username:'@username', password:'@password'});
	} ]);

	app.factory('Item', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/items/:term');
	} ]);
	
	app.controller('UserController', [ '$scope','User', 
			function($scope,User) {
				
				$scope.username_pattern = "([a-z]|[A-Z]|[0-9])*";
				/*
				 * regex from : 
				 */
				var strong_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	            var medium_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
				
	            $scope.strength = function(pass) {
	            	if(strong_regex.test(pass)) {
	            		$scope.pass_class = 1;
	            		$scope.pass_message = "strong";
	            		$scope.strong = true;
	            		$scope.medium = false;
	            		$scope.progress_width = "100%";
	            	}
	            	else if(medium_regex.test(pass)) {
	            		$scope.pass_class = 2;
	            		$scope.pass_message = "medium (accepted)";   
	            		$scope.medium = true;
	            		$scope.strong = false;
	            		$scope.progress_width = "50%";
	            	}
	            	else {
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
					if($scope.user.password == $scope.form.confirm.$viewValue) {
						$scope.form.confirm.$error.match = false;
						confirm_div.removeClass("has-error");
						$scope.match = true;
					}
					else {
						$scope.form.confirm.$error.match = true;					
						$scope.match = false;
						confirm_div.addClass("has-error");
					}
				};
				
				$scope.err = "";
				$scope.check_username = function() {
					if(username != "") {
						User.get({ username: $scope.user.username}).$promise.then(function(data) {
							var input_elem = angular.element(document.querySelector('#username_div'));
							var i = angular.element(document.querySelector('#i_username'));
							input_elem.removeClass("has-error");
							input_elem.removeClass("has-succcess");
							if(data.exists) {
								input_elem.addClass("has-error");
								$scope.form.username.$error.exists = true;
							}
							else {
								input_elem.addClass("has-success");
								$scope.form.username.$error.exists = false;
							}
							$scope.err = "already exists!";
							console.log(input_elem);
								
						},function(){
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
						//bring form at initial state
						$scope.user={};
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
					},function() {
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

	app.controller('LoginController', [ '$scope', 'UserPass', 
		function($scope, User) {
			
//			$scope.err = "";
//			$scope.check_username = function() {
//				User.query().$promise.then(function(data,all_users) {
//					var not_exists = true;
//					for(var i = 0; i < data.length; i++) {
//						console.log(data[i].username);
//						if($scope.user.username == data[i].username) {	
//							console.log("username does not exist");
//							not_exists = false;
//						}
//					}
//					console.log(not_exists);
//					var input_elem = angular.element(document.querySelector('#username_div'));
//					var i = angular.element(document.querySelector('#i_username'));
//					input_elem.removeClass("has-error");
//					input_elem.removeClass("has-succcess");
//					if(not_exists) {
//						input_elem.addClass("has-error");
//						$scope.form.username.$error.not_exists = true;
//					}
//					else {
//						input_elem.addClass("has-success");
//						$scope.form.username.$error.not_exists = false;
//					}
//					$scope.err = "does not exist!";
//					console.log(input_elem);
//				});			
//			}
		
		
			$scope.err = "";
			$scope.check_user_pass = function() {
				UserPass.get({username: $scope.user.username, password: $scope.user.password}).$promise.then(function(data) {
					var wrong = true;
					if (data != null) {
						console.log("username and password are correct");
						wrong = false;
					}
					document.write("user and pass: " + wrong + " ");
					console.log(wrong);
					input_elem.removeClass("has-error");
					input_elem.removeClass("has-succcess");
					if(wrong) {
						input_elem.addClass("has-error");
						$scope.form.login.$error.wrong = true;
					}
					else {
						input_elem.addClass("has-success");
						$scope.form.login.$error.wrong = false;
					}
					$scope.err = "wrong!";
					console.log(input_elem);
				});
			};
			
			
//			$scope.err = "";
//			$scope.check_password = function() {
//				User.query().$promise.then(function(data,all_users) {
//					var wrong = true;
//					for(var i = 0; i < data.length; i++) {
//						console.log(data[i].username);
//						console.log(data[i].password);
//						console.log(data);
//						if($scope.user.username == data[i].username) {
//							console.log(data[i].password);
//							document.write("data password: " + data[i].password);
//							document.write("scope password: " + $scope.user.password);
//							if($scope.user.password == data[i].password) {
//								console.log("password is correct");
//								wrong = false;
//							}
//						}
//					}
//					console.log(wrong);
//					var input_elem = angular.element(document.querySelector('#password_div'));
//					var i = angular.element(document.querySelector('#i_password'));
//					input_elem.removeClass("has-error");
//					input_elem.removeClass("has-succcess");
//					if(wrong) {
//						input_elem.addClass("has-error");
//						$scope.form.pass.$error.wrong = true;
//					}
//					else {
//						input_elem.addClass("has-success");
//						$scope.form.pass.$error.wrong = false;
//					}
//					$scope.err = "wrong!";
//					console.log(input_elem);
//				});			
//			}
			
			$scope.submit = function() {
				console.log($scope.user.firstName);
				console.log($scope.user.password);
				$scope.user.location.country = $scope.user.country.name;
//				delete $scope.user.country;
//				User.save($scope.user);
			};
		}
	]);

	 /*
	 app.controller('UserController',['$scope','User',function($scope,User) {
	 $scope.submit_function = function() {
	 User.save($scope.user);
	 console.log("key pressed");
	 }
	 }]);
*/
	
/*	
	 app.controller('SearchController', [ '$scope', '$window',
		function($scope, $window) {
		 
		 	$scope.category = false;
		 	$scope.price_low = 50;
		 	$scope.price_mid = 100;
		 	$scope.price_high = 200;
		 	$scope.location_continent = false;
		 	$scope.location_from_km = false;
		 	$scope.location_to_km = false;
		 	$scope.description = false;
		 	
		 	
		 	$scope.must = true;
			$scope.current_content = $scope.content;
			console.log($scope.current_content);
			$scope.test_search = function() {
				console.log("here");
				$scope.search();
			}
			$(window).on("resize.doResize", function() {
				
				$scope.$apply(function() {
					if(window.innerWidth < 1290) {
						$scope.must = false;
					}
					else {
						$scope.must = true;
					}
				});
			});

 		} 
	 ]);
	 */
/*	 
	 app.controller('MainContentController',['$window','$rootScope','$scope','Item',function($window,$rootScope,$scope,Item) {
		
			 //

//			 console.log("called");
//			 $scope.content = "main";
		 };

		

	 }]);
	*/ 

	 app.controller('AuctionsController',['$window','$scope','Item',function($window,$scope,Item) {
		 $scope.content = "index";
		 $scope.search = function(term) {
			$scope.items = 	Item.query({ term: term});
			$scope.content = "main";
			//$window.location.href = '/WebAuctions/main.html';

			/*.$promise.then(function(data) {
				console.log("ok respone");
				console.log(data[0]);
				$scope.content = "main";
			});
			*/
		 };	 
		 
		 $scope.clicked_item = false;
		 $scope.set_current = function(item) {
			 $scope.current = item;
			 $scope.clicked_item = true;
		 };		 
		 	
		 	console.log($scope.items);
		 	$scope.category = false;
		 	$scope.price_low = 50;
		 	$scope.price_mid = 100;
		 	$scope.price_high = 200;
		 	$scope.location_continent = false;
		 	$scope.location_from_km = false;
		 	$scope.location_to_km = false;
		 	$scope.description = false;
		 	
		 	
		 	$scope.must = true;
			$scope.current_content = $scope.content;
			console.log($scope.current_content);
			
			$scope.test_search = function() {
				$scope.search();
			}
			
			$(window).on("resize.doResize", function() {
				
				$scope.$apply(function() {
					if(window.innerWidth < 1290) {
						$scope.must = false;
					}
					else {
						$scope.must = true;
					}
				});
			});
//	 	 // test for ng-repeat
		 $scope.current_page = 1;
		 var items_per_page = 10;      
		 
		 $scope.getItems = function() {
			 console.log("Lenght : "+$scope.items.length);
			return $scope.items.slice(0,items_per_page); 
		 };
		 
		 //var p = $scope.items.length ;
		 //$scope.pages = new Array(p).join().split(',').map(function(item, index){ return ++index;})
		 
		 $scope.get_page = function() {
			 
		 };
		              
	 }]);
	 
	
	 
})();





/*
 * main.html sidebar following scroll.
*/ 
/*
$(function() {
	
	$('.dropdown-toggle').dropdown();

	var $sidebar   = $("#sidebar"), 
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;
	//var footer_top = $('#footer').offset().top;
	//console.log(footer_top);
	var document_height = $(document).height();

	$window.scroll(function() {
		//console.log(document_height-footer_top);
        console.log($window.scrollTop());
		if ($window.scrollTop() > offset.top && ($window.scrollTop() < (document_height - 20))) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }

    });
  });

*/
