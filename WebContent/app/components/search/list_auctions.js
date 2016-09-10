angular.module('auction_land').controller('AuctionsController', 
		[ '$window', '$scope','$timeout','$location',
		  'localStorageService','AuctionService',
		  'Item','SearchService',
		  function($window, $scope,$timeout,$location,
				  localStorageService,AuctionService,
				  Item,SearchService ) {
		
		$scope.items = localStorageService.get('auctions');
		//console.log("refreshed items : ");
		//console.log($scope.items);
		
		var items_per_page = 5;
		$scope.items_per_page = items_per_page;
		
		$scope.search = function(term) {
			Item.query({term : term}).$promise.then(function (data) {
				$scope.items = data.slice();
				
				//console.log($scope.items);
				$scope.fix_filter_prices($scope.items);
				$scope.filtered_items = angular.copy($scope.items);
				$scope.filtered_items.pop();
				
				$scope.fix_pages();
				//console.log($scope.pages);
				
				$scope.current_items = $scope.get_items();
				
			});
		};
		
		$scope.current_page = 1;
				
		$scope.fix_pages = function() {
			$scope.pages = [];
			//console.log($scope.filtered_items.length/items_per_page);
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
			return angular.copy($scope.filtered_items.slice(from, to));
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
			//console.log($scope.mid_price);
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
					return  item.ends;
				}
			}
		};
		
		//$scope.items = SearchService.get_items();
		//console.log("items : ");
		//console.log($scope.items);
		$scope.fix_filter_prices($scope.items);
		$scope.filtered_items = angular.copy($scope.items);
		$scope.filtered_items.pop();
		$scope.fix_pages();
		//console.log($scope.pages);
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

		$scope.filtering = false;
		$scope.filter = function() {
			
			$scope.filtering = true;
			
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
		
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.filtering = false;
		});
		
		$scope.filter_by_category = function() {
			if($scope.live_filters.category == null) {
				$scope.filtered_items = angular.copy($scope.items);
				$scope.filtered_items.pop();
			}
			else {
				for (var i = $scope.filtered_items.length-1; i >= 0; i--) {
					var found = false;
					//console.log($scope.filtered_items[i].categories);
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
			//console.log("filter by mid price");
			for (var i = $scope.filtered_items.length-1; i >= 0; i--) {
				if($scope.live_filters.price == "less" && $scope.filtered_items[i].max >= $scope.mid_price)
					$scope.filtered_items.splice(i,1);
				else if($scope.live_filters.price == "more" && $scope.filtered_items[i].max <= $scope.mid_price)
					$scope.filtered_items.splice(i,1);
			}
		};
		
		$scope.filter_by_given_price = function() {
			//console.log("filter by given price");
			for (var i = ($scope.filtered_items.length)-1; i >= 0 ; i--) {
				//console.log($scope.filtered_items[i].max);
				if(($scope.live_filters.price_from > $scope.filtered_items[i].max) 
						|| ($scope.live_filters.price_to < $scope.filtered_items[i].max)) {
					$scope.filtered_items.splice(i,1);
				}
			}
		};
		
		$scope.filter_by_description = function() {
			//console.log("description");
			//console.log($scope.live_filters.text);
			var regex = new RegExp($scope.live_filters.text,'gi');
			for(var i = $scope.filtered_items.length-1; i >= 0; i--) {
				var res = $scope.filtered_items[i].description.match(regex); 
				if(res == null)
					$scope.filtered_items.splice(i,1);
				//else 
					//console.log($scope.filtered_items[i].name+" "+res);
			}
		};
		
		$scope.filter_by_country = function() {
			//console.log("filter by location");
			for(var i = $scope.filtered_items.length-1; i >= 0; i--) {
				var regex = new RegExp($scope.live_filters.country,'gi');
				var res = $scope.filtered_items[i].location.country.match(regex); 
				if(res == null) {
					res = $scope.filtered_items[i].location.location.match(regex);
					if(res == null)
						$scope.filtered_items.splice(i,1);
					//else
						//console.log($scope.filtered_items[i].name+" "+res);
				}
				//else 
					//console.log($scope.filtered_items[i].name+" "+res);
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
		
		
		
		$(window).on("resize.doResize", function() {

			$scope.$apply(function() {
				if (window.innerWidth < 1290) {
					$scope.must = false;
				} else {
					$scope.must = true;
				}
			});
		});
		
		$scope.filtering = false;
	} ]);

angular.module('auction_land').directive('onFinishRender', function ($timeout) {
return {
    restrict: 'A',
    link: function (scope, element, attr) {
        if(scope.$last === true) {
            $timeout(function () {
                scope.$emit(attr.onFinishRender);
            });
        }
    }
}
});
