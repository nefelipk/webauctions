
angular.module('auction_land').service('SearchService', function() {
	var items = [];
	var add_items = function(list_items) {
		items = angular.copy(list_items);
	};
	var get_items = function() {
		return items;
	};
	return {
		add_items : add_items,
		get_items : get_items
	};
});