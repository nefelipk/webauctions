angular.module('auction_land').controller('SearchController',
		['$scope','$route','$cookies','localStorageService','$location','Item','SearchService',
		 function($scope,$route,$cookies,localStorageService,$location,Item,SearchService) {
		
		$scope.logged_in = $cookies.get('logged-in');
		$scope.username = $cookies.get('username');
		
		$scope.$watch(function(){
			return $cookies.get('logged-in');
		}, function(stored_data){
			$scope.logged_in = stored_data;
			$scope.user = $cookies.getObject('user');
			console.log($scope.user.unreadMessages);
		});	
		
		/*
		$scope.$watch(function(){
			return $cookies.getObject('user');
		}, function(stored_data){
			$scope.user = stored_data;
			$scope.logged_in = true;
		});	
		*/
		/*
		$scope.$watch(function(){
			return $cookies.get('username');
		}, function(stored_data){
			$scope.username = stored_data;
		});	
		*/
		
		$scope.logout = function() {
			console.log("logout");
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (v, k) {
			    $cookies.remove(k);
			});
			$location.path('/');
		};
		
		$scope.searching = false;
		$scope.search = function(term) {
			$scope.searching = true;
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
		
		if($location.path() != '/') {
			console.log($location.path());
			$scope.search_bar = "header";
		}
		
		$scope.$on('$locationChangeStart', function(event) {
			if($location.path() != '/') {
				console.log($location.path());
				$scope.search_bar = "header";
				$scope.$apply();
			}
		});

		$scope.print = function() {
			console.log("search_controller");
		};
	}]);
		