
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
	
	Message.query({username : 'ripone07'}).$promise.then(function(data) {
		$scope.messages = data;
		console.log($scope.messages);
		for(i = 0; i < $scope.messages.length; i++) {
			$scope.messages[i].pos = i+1;
			add_readable_date($scope.messages[i]);
		}
	});
	
	$scope.set_active = function(tab) {
		var inbox_tab = angular.element(document.querySelector('#inbox_tab'));
		var sent_tab = angular.element(document.querySelector('#sent_tab'));
		var compose_tab = angular.element(document.querySelector('#compose_tab'));
		inbox_tab.removeClass('active');
		sent_tab.removeClass('active');
		compose_tab.removeClass('active');
		
		if(tab == 1)
			compose_tab.addClass('active');
		else if(tab == 2)
			inbox_tab.addClass('active');
		else if(tab == 3)
			sent_tab.addClass('active');

	};
	
	
	
	$scope.new_message = {};
	$scope.new_message_sent = false;
	$scope.send = function() {
		
		$scope.new_message.senderUsername = "pro-one";
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
	}
}]);