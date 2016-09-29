
angular.module('auction_land').factory('User', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/:username');
} ]);
/*
angular.module('auction_land').factory('User', [ '$resource', function($resource) {
	return $resource('https://localhost:8443/WebAuctions/services/users/:username');
} ]);
*/
angular.module('auction_land').factory('UserLogin', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/login/');
} ]);

/*
angular.module('auction_land').factory('UserLogin', [ '$resource', function($resource) {
	return $resource('https://localhost:8443/WebAuctions/services/users/login/');
} ]);
*/
angular.module('auction_land').factory('AllUsers', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/allusers/');
} ]);

angular.module('auction_land').factory('UserVerify', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/verify/');
} ]);


angular.module('auction_land').factory('Item', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/:term');
} ]);

angular.module('auction_land').factory('ItemById', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/id/:id');
} ]);


angular.module('auction_land').factory('ItemCategory', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/category/:term');
} ]);


angular.module('auction_land').factory('ItemLocation', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/location/:term');
} ]);

angular.module('auction_land').factory('ItemPrice', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/price/:term');
} ]);

angular.module('auction_land').factory('ItemSeller', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/seller/:term');
} ]);

angular.module('auction_land').factory('ItemDelete', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/delete/:term');
} ]);

angular.module('auction_land').factory('ItemUpdate', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/update');
} ]);


angular.module('auction_land').factory('Message', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/messages/:username/:id',null,{
		'update': { method:'PUT' }
	});
} ]);

angular.module('auction_land').factory('Bid', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/bid/:id');
} ]);

angular.module('auction_land').factory('AllCategories', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/allcategories/');
} ]);

angular.module('auction_land').factory('TopCategories', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/top/categories/');
} ]);

angular.module('auction_land').factory('TopLocations', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/top/locations/');
} ]);

angular.module('auction_land').factory('TopUsers', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/top/');
} ]);

angular.module('auction_land').factory('HotRightNow', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/hot/');
} ]);

angular.module('auction_land').factory('DownloadXML', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/download/:id');
} ]);
