
angular.module('auction_land').factory('User', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/:username');
} ]);

angular.module('auction_land').factory('UserPass', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/users/:user_pass', {
		username : '@username',
		password : '@password'
	});
} ]);

angular.module('auction_land').factory('Item', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/items/:term');
} ]);

angular.module('auction_land').factory('Message', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/WebAuctions/services/messages/:username');
} ]);