angular.module('auction_land').controller('SearchController',
		['$scope','$route','$cookies','localStorageService','$location',
		 'Item','TopCategories','TopUsers','TopLocations','SearchService','ItemPrice','ItemLocation','ItemCategory',
		 function($scope,$route,$cookies,localStorageService,$location,Item,TopCategories,TopUsers,TopLocations,SearchService,ItemPrice,ItemLocation,ItemCategory) {
		
		$scope.logged_in = $cookies.get('logged-in');
		$scope.username = $cookies.get('username');
		$scope.admin = $cookies.get('admin');
		
		$scope.$watch(function(){
			return $cookies.get('logged-in');
		}, function(stored_data){
			$scope.logged_in = stored_data;
			$scope.user = $cookies.getObject('user');
		});	
	
		$scope.category = "General";
		
		$scope.logout = function() {
			console.log("logout");
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (v, k) {
			    $cookies.remove(k);
			});
			$location.path('/');
		};
		
		$scope.profile = function() {
			$location.path('/profile');
		};
		
		$scope.userManager = function() {
			$location.path('/manage_users');
		};
		
		$scope.select_cat = function(name) {
			$scope.category = name;
			console.log($scope.category);
		}
		
		$scope.searching = false;
		$scope.search = function(term) {
			$scope.searching = true;
			console.log($scope.category);
			if($scope.category == 'Category') {
				ItemCategory.query({term : term}).$promise.then(function(data) {
					localStorageService.remove('auctions');
					$scope.items = data.slice();
					SearchService.add_items($scope.items);
					console.log($scope.items);
					localStorageService.set('auctions',$scope.items);
					$location.path("/search");
					$route.reload();
					
				}, function() {
					$location.path("/no_results/"+term);
				});
			}
			else if($scope.category == 'General') {
				Item.query({term : term}).$promise.then(function (data) {
					localStorageService.remove('auctions');
					$scope.items = data.slice();
					SearchService.add_items($scope.items);
					console.log($scope.items);
					localStorageService.set('auctions',$scope.items);
					$location.path("/search");
					$route.reload();
					//$scope.searching = false;
				}, function() {
					$location.path("/no_results/"+term);
				});	
			}
			else if($scope.category == 'Location') {
				ItemLocation.query({term : term}).$promise.then(function(data) {
					localStorageService.remove('auctions');
					$scope.items = data.slice();
					SearchService.add_items($scope.items);
					console.log($scope.items);
					localStorageService.set('auctions',$scope.items);
					$location.path("/search");
					$route.reload();
					//$scope.searching = false;
				} , function() {
					$location.path("/no_results/"+term);		
				});
			}
			else if($scope.category == 'Price') {
				
			}
		};
		
		TopCategories.query().$promise.then(function(data) {
			$scope.top_categories = data;
			console.log($scope.top_categories);
		});
		

		TopUsers.query().$promise.then(function(data) {
			$scope.top_sellers = data;
			console.log($scope.top_sellers);
		});
		
		TopLocations.query().$promise.then(function(data) {
			$scope.top_locations = data;
			console.log($scope.top_locations);
		});		/*
		if($location.path() != '/') {
			console.log($location.path());
			$scope.search_bar = "header";
		}
		
		$scope.$on('$locationChangeStart', function(event) {
			if($location.path() != '/') {
				console.log($location.path());
				$scope.search_bar = "header";
			}
		});

		$scope.print = function() {
			console.log("search_controller");
		};
		*/
	}]);
		