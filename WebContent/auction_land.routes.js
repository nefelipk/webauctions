
angular.module('auction_land').config(['$routeProvider',function($routeProvider){ 
	$routeProvider
		.when('/',{ templateUrl : 'app/components/home/index_tmpl.html', }) 
		.when('/messages', { templateUrl : 'app/components/messages/messages2.html', })
		.when('/search', {templateUrl : 'app/components/search/search_tmpl.html', })
		.when('/item', {templateUrl : 'app/components/auction/item_tmpl.html', })
		.when('/no_results/:term', {templateUrl : 'app/shared/no_results_tmpl.html', })
		.when('/profile', {templateUrl : 'app/components/users/profile.html', })
		.when('/manage_users', {templateUrl : 'app/components/users/manage_users.html', })
		.when('/manage_auctions', {templateUrl : 'app/components/auction/manage_auctions.html', });
}]);