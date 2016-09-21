angular.module('auction_land').controller('SearchController',
		['$scope','$route','$cookies','localStorageService','$location',
		 'Item','TopCategories','TopUsers','SearchService','ItemPrice','ItemLocation','ItemCategory',
		 function($scope,$route,$cookies,localStorageService,$location,Item,TopCategories,TopUsers,SearchService,ItemPrice,ItemLocation,ItemCategory) {
		
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
		
		$scope.searching = false;
		$scope.search = function(term) {
			$scope.searching = true;
			
			if($scope.category == 'Category') {
				
			}
			else if($scope.category == 'General') {
				
			}
			else if($scope.category == 'Location') {
				
			}
			else if($scope.category == 'Price') {
				
			}
			
			Item.query({term : term}).$promise.then(function (data) {
				localStorageService.remove('auctions');
				$scope.items = data.slice();
				SearchService.add_items($scope.items);
				console.log($scope.items);
				localStorageService.set('auctions',$scope.items);
				$route.reload();
				$location.path("/search");
				//$scope.searching = false;
			}, function() {
				$location.path("/no_results/"+term);
			});	
		};
		
		TopCategories.query().$promise.then(function(data) {
			$scope.top_categories = data;
			console.log($scope.top_categories);
		});
		

		TopUsers.query().$promise.then(function(data) {
			$scope.top_sellers = data;
			console.log($scope.top_sellers);
		});
		
		/*
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
		