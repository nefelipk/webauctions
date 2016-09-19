
angular.module('auction_land').factory('User', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/:username');
} ]);

angular.module('auction_land').factory('UserLogin', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/login/');
} ]);

angular.module('auction_land').factory('Item', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/:term');
} ]);

angular.module('auction_land').factory('Message', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/messages/:username/:id',null,{
		'update': { method:'PUT' }
	});
} ]);


angular.module('auction_land').factory('Bid', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/bid/:id');
} ]);