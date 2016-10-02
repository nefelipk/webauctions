angular.module('auction_land', 
		[ 'ngResource', 
		  'ngAnimate', 
		  'ngRoute',
		  'ngMessages', 
		  'ngCookies',
		  'timer',
		  'dibari.angular-ellipsis', 
		  'uiGmapgoogle-maps' ]);

angular.module('auction_land').config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key : 'AIzaSyAkwqT274QZMdhfDQCS_C71GJ5wR5rmDRE',
		libraries : 'weather,geometry,visualization'
	});
});	
