
angular.module('auction_land').controller('MessagesController',
		['$scope','$timeout','Message',
		 function($scope,$timeout,Message) {
	$scope.pages = [1,2];		
	$scope.current_page = 1;
	$scope.selected = false;
	
	/*
	Message.query({username : $cookies.get('username')}).$promise.then(function(data) {
		console.log(data);
	});
	*/
	
	Date.createFromMysql = function(mysql_string)
	{ 
	   var t, result = null;

	   if( typeof mysql_string === 'string' )
	   {
	      t = mysql_string.split(/[- :]/);

	      //when t[3], t[4] and t[5] are missing they defaults to zero
	      result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
	   }

	   return result;   
	}
	
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
	
	$scope.refresh = function() {
		Message.query({username : 'ripone07'}).$promise.then(function(data) {
			$scope.inbox = data[0];
			$scope.sent = data[1];
			console.log($scope.sent);
			console.log($scope.inbox);
	
			for(i = 0; i < $scope.inbox.length; i++) {
				$scope.inbox[i].pos = i+1;
				add_readable_date($scope.inbox[i]);
			}
			for(i = 0; i < $scope.sent.length; i++) {
				$scope.sent[i].pos = i+1;
				add_readable_date($scope.sent[i]);
			}
		});
	};
	$scope.refresh();
	
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
		}
		else if(tab == 3) {
			$scope.current_tab = "Sent";
			sent_tab.addClass('active');
		}
	};
	
	$scope.delete_message = function() {
		if($scope.selected == true) {
			Message.delete({username : 'ripone', id : $scope.selected_message.id}).$promise.then(function() {
				console.log("successfully delete message");
			});
		}
	};
	
	$scope.new_message = {};
	$scope.new_message_sent = false;
	$scope.send = function() {
		
		$scope.new_message.receiverUsername = "Antonios";
		$scope.new_message.senderUsername = "ripone07";
		//$scope.new_message.senderUsername = $cookies.get('username');
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
	
	$scope.select_all = false;
	$scope.selected = false;
	$scope.select = function(message) {
		$scope.selected = !$scope.selected;
		$scope.selected_message = message;
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
	
}]);