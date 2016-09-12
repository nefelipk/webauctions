
angular.module('auction_land').controller('MessagesController',
		['$scope','$timeout','$cookies','Message','$window',
		 function($scope,$timeout,$cookies,Message,$window) {

	$scope.username = $cookies.get('username');
			
	var add_readable_date = function(message) {
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		var date = new Date(message.time);
		r_month = month[date.getMonth()];
		r_date = date.getDate();
		message.readable_date = r_month + " " + r_date;
	}
	
	var fix_first_line = function(message) {
		message.first_line = message.message.substring(0,20) + "...";
	};
	/********************************************************************/
	/*********************************************************************
							CONSUME SERVICES 
	*********************************************************************/
	/********************************************************************/
	
	$scope.presented_messages = [];
	$scope.current_items = [];
	$scope.refresh = function() {
		Message.query({username : $cookies.get('username')}).$promise.then(function(data) {
			$scope.inbox =  Object.keys(data[0]).map(function(k) { return data[0][k] });
			$scope.sent =  Object.keys(data[1]).map(function(k) { return data[1][k] });
	
			for(i = 0; i < $scope.inbox.length; i++) {
				$scope.inbox[i].pos = i+1;
				add_readable_date($scope.inbox[i]);
				fix_first_line($scope.inbox[i]);
			}
			for(i = 0; i < $scope.sent.length; i++) {
				$scope.sent[i].pos = i+1;
				add_readable_date($scope.sent[i]);
				fix_first_line($scope.sent[i]);
			}
			
			$scope.presented_messages = $scope.inbox;
			$scope.fix_pages();
			$scope.current_items = $scope.get_items();
			//console.log($scope.presented_messages.length);

		});
	};
	$scope.refresh();
	
	
	$scope.delete_message = function() {
		console.log("****** delete messages *********");
		var length = $scope.selected_messages.length-1
		$scope.selected = false;
		$scope.check_all = false;
		for(i = length; i >= 0; i--) {
			console.log($scope.current_items[$scope.selected_messages[i]]);
			var response = Message.remove({username : $cookies.get('username'),id : $scope.current_items[$scope.selected_messages[i]].id});
			response.$then(function() {
				$scope.current_items.splice($scope.selected_messages[i],1);
				$scope.selected_messages.pop();
				$scope.fix_pages();
				$scope.current_items = $scope.get_items();
			});
		}
	};
	
	$scope.new_message = {};
	$scope.new_message_sent = false;
	
	$scope.send = function() {
		$scope.new_message.senderUsername = $cookies.get('username');
		$scope.read = false;
		var date = new Date();
		$scope.new_message.time = date.getTime();
		Message.save($scope.new_message).$promise.then(function(data) {
			$scope.new_message_sent = true;
			$scope.new_message = {};
			$timeout(function() { 
				$scope.new_message_sent = false; 
				//$('#inbox_tab').tab('show')
				//$scope.set_active(2);
			}, 3000);	
			return;
		});
	};
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
	
	
	
	
	
	/*********************************************************************/
	/**********************************************************************
							PAGINATION 
	**********************************************************************/
	/*********************************************************************/

	
	var messages_per_page = 5;
	$scope.current_page = 1;
	
	$scope.fix_pages = function() {
		$scope.pages = [];
		console.log($scope.presented_messages.length/messages_per_page);
		for(i = 0; i < $scope.presented_messages.length/messages_per_page; i++)
			$scope.pages.push(i+1);
		$scope.last_page = $scope.pages[$scope.pages.length-1];
		$scope.current_page = 1;
	};
	
	$scope.get_items = function() {
		var from = ($scope.current_page - 1) * messages_per_page;
		var to = $scope.current_page * messages_per_page;
		if ($scope.current_page * messages_per_page >= $scope.presented_messages.length)
			to = $scope.presented_messages.length;
		return $scope.presented_messages.slice(from, to);
	};
	
	$scope.get_page = function(page_num) {
		$scope.current_page = page_num;
		$scope.current_items = $scope.get_items();
		$window.scrollTo(0,0);	
	}; 
	

	$scope.current_items = $scope.get_items();
	
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
	
	
	
	
	
	
	

	/*********************************************************************/
	/**********************************************************************
							VIEWS CONTROLL 
	**********************************************************************/
	/*********************************************************************/
	$scope.check_all = false;
	$scope.selected_messages = new Array();
	$scope.selected = false;
	
	$scope.select_all = function() {
	
	}
	

	$scope.select = function(index) {
		if(index == null) {
			$scope.check_all = !$scope.check_all;
		
			if($scope.selected_messages.length > 0)
				$scope.selected_messages = [];
			else {
				$scope.selected_messages = new Array();
				for(i = 0; i < $scope.current_items.length; i++)
					$scope.selected_messages.push(i);
				console.log($scope.selected_messages);
				//$scope.selected_messages = $scope.current_items;
			}
		}
		else {
			//console.log($scope.selected_messages);	
			//console.log(message);
			var pos = $scope.selected_messages.indexOf(index);
			if(pos != -1) {
				$scope.selected_messages.splice(pos,1);
				console.log("found");
			}
			else {
				console.log("not found");
				$scope.selected_messages.push(index);
			}
			console.log("selected_messages : ");
			console.log($scope.selected_messages);
		}
	};
	
	$scope.reading = false;
	$scope.read_message = function(message) {
		$scope.current = message;
		$scope.reading = true;
		$scope.current.read = true;
	};
	
	$scope.reading_sent = false;
	$scope.read_sent_message = function(message) {
		$scope.current_sent = message;
		$scope.reading_sent = true;
	};
	
	$scope.back = function() {
		$scope.reading = false;
		$scope.current = {};
		$scope.reading_sent = false;
		$scope.current_sent = {};
	};
	
	$scope.current_tab = "Inbox";
	$scope.set_active = function(tab) {
		var inbox_tab = angular.element(document.querySelector('#inbox_tab'));
		var sent_tab = angular.element(document.querySelector('#sent_tab'));
		var compose_tab = angular.element(document.querySelector('#compose_tab'));
		inbox_tab.removeClass('active');
		sent_tab.removeClass('active');
		compose_tab.removeClass('active');
		
		if(tab == 1) {
			compose_tab.addClass('active');
			$scope.current_tab = "Compose";
		}
		else if(tab == 2) {
			$scope.current_tab = "Inbox";
			inbox_tab.addClass('active');
			$scope.presented_messages = $scope.inbox;
			$scope.fix_pages();
		}
		else if(tab == 3) {
			$scope.current_tab = "Sent";
			sent_tab.addClass('active');
			$scope.presented_messages = $scope.sent;
			$scope.fix_pages();
		}
	};
	
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	/*********************************************************************/
	
}]);