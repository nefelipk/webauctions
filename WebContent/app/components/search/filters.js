angular.module('auction_land').controller('FiltersController',['$scope',function($scope) {
		
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