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
		['$scope','$route','localStorageService','Bid','AuctionService','uiGmapGoogleMapApi',
		 function($scope,$route,localStorageService,Bid,AuctionService,uiGmapGoogleMapApi) {
	
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
	
	$scope.bid = {};
	$scope.place_bid = function() {
		$scope.bid.item = {};
		$scope.bid.item.idItem = $scope.current.idItem;
		$scope.bid.time = (new Date().getTime()).toString();
		$scope.bid.user = {};
		$scope.bid.user.username = "ripone07"
		console.log("bid : ");
		console.log($scope.bid);
		Bid.save($scope.bid).$promise.then(function(data) {
			console.log(data);
		});
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
		
	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		var google = AuctionService.get_google_api();
		var map = AuctionService.get_map();
		console.log("called");
		current_item_location();
		google.maps.event.trigger(map.control.getGMap(), 'resize'); 
		console.log("exit");
	});
	
}]);