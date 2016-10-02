angular.module('auction_land').service('AuctionService',function() {
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

angular.module('auction_land').controller('AuctionController',
		['$scope','$route','$timeout','$cookies','$window','Bid','AuctionService','uiGmapGoogleMapApi','DownloadXML','$routeParams','ItemById',
		 function($scope,$route,$timeout,$cookies,$window,Bid,AuctionService,uiGmapGoogleMapApi,DownloadXML,$routeParams,ItemById) {
	
			
	$scope.logged_in = $cookies.get('logged-in');		
	if($scope.logged_in != 'true')			
		$scope.message = "You have to login to place a bid !";
	else
		$scope.message = "";
	$scope.$watch(function(){
		return $cookies.get('logged-in');
	}, function(stored_data){
		$scope.logged_in = stored_data;
		if($scope.logged_in != 'true')			
			$scope.message = "You have to login to place a bid !";
		else
			$scope.message = "";
	});	
	
	var marker_key = 9998;
	$scope.current = AuctionService.get_current_auction();
	if($scope.current == null) {
		var id = $routeParams.id;
		ItemById.get({id:id},function(data) {
			$scope.current = data;
			$scope.filename = "auction_"+$scope.current.idItem+".xml";
			$scope.url = "http://localhost:8080/WebAuctions/services/items/download/"+$scope.current.idItem;
			$scope.get_ending_time($scope.current);
			$scope.markers = [];	
			console.log($scope.current);
			AuctionService.set_current_auction($scope.current);
			$scope.current.mkey = marker_key++;
			$route.reload();
		}); 
	}
	else {
		$scope.filename = "auction_"+$scope.current.idItem+".xml";
		$scope.url = "http://localhost:8080/WebAuctions/services/items/download/"+$scope.current.idItem;
	}
	
	$scope.get_ending_time = function(item) {
		if($scope.current == null)
			return "Loading";
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
			var now = Date.now();
			if(ends < Date.now()) {
				item.ended = true;
				return "Ended";
			}
			else {
				item.ended = false;
				//var time_left = (ends - now)/1000;
				return item.ends;
			}
		}
	};
	 
	$scope.get_first_bid = function() {
		if($scope.current == null)
			return "Loading";
		$scope.current.firstBid = $scope.current.firstBid.replace('$','');
		//auction.firstBid = auction.firstBid.replace('$','');
		return $scope.current.firstBid;
	};
	
	
	
	$scope.check_amount = function() {
		if($scope.bid.amount > $scope.current.max)
			return true;
		else
			return false;
	};
	
	$scope.bid_placed = false;
	$scope.give_warning = function() {
		if($scope.bid_form.$invalid == true)
			return;
		$scope.bid_placed = true;
	};
	
	$scope.bid = {};
	$scope.place_bid = function() {
		if($scope.bid_form.$valid == false) {
			return;
		}
		$scope.bid.item = {};
		$scope.bid.item.idItem = $scope.current.idItem;
		$scope.bid.time = (new Date().getTime()).toString();
		$scope.bid.user = {};
		/* get username from cookies */
		$scope.bid.user.username = $cookies.getObject('user').username;
		if($scope.bid.user.username == undefined || $scope.bid.user.username == null) {
			alert("SEVERE ERROR WITH LOGIN. YOUR BID WAS NOT PLACED");
		}
		Bid.save($scope.bid).$promise.then(function(data) {
			/* get new bids */
			Bid.query({id : $scope.current.idItem}).$promise.then(function(data) {
				$scope.current.bids = data;
				var bids = $scope.current.bids.slice();
				$scope.current.max = Math.max.apply(Math,bids.map(function(o){return o.amount;}));
			});
			$scope.bid = {};
			$scope.successfull_bid = true;
			$timeout(function() { 
				$scope.successfull_bid = false; 
			}, 3000);
		});
	};
	
	
	current_item_location = function() {
		if(($scope.current.location.latitude != 0) && ($scope.current.location.longitude != 0)) {
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
		AuctionService.set_google_api($scope.google);
		AuctionService.set_map($scope.map);
	});
		
	/* when using a google map inside a bootstrap tab it is 
	 * almost necessary to use 'resize' event because the
	 * map does not load properly.
	 */
	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		var activeTab = $(".tab-content").find(".active");
		var id = activeTab.attr('id');
		if(id == "map1") {
			var google = AuctionService.get_google_api();
			var map = AuctionService.get_map();
			current_item_location();
			$scope.google.maps.event.trigger($scope.map.control.getGMap(), 'resize'); 
		}
	});
	
	$scope.user = $cookies.getObject('user');
	if($scope.user != null)
		$scope.admin = $scope.user.admin;
	else 
		$scope.admin = false;

	console.log($scope.url);
}]);

angular.module('auction_land').config( ['$compileProvider',function( $compileProvider ) {   
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
// Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);