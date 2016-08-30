
angular.module('auction_land').config(['$routeProvider',function($routeProvider){ 
	$routeProvider
		.when('/',{ templateUrl : 'app/components/home/index_tmpl.html', }) 
		.when('/messages', { templateUrl : 'app/components/messages/messages.html', })
		.when('/search', {templateUrl : 'app/components/search/search_tmpl.html', })
		.when('/item', {templateUrl : 'app/components/auction/item_tmpl.html', });
}]);