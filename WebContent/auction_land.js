(function() {
	var app = angular.module('auction_land', [ 'ngResource','ngMessages']);

	app.factory('User', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/users/:username');
	} ]);
	
	app.factory('UserPass', [ '$resource', function($resource) {
		return $resource('http://localhost:8080/WebAuctions/services/users/:user_pass', {username:'@username', password:'@password'});
	} ]);

	app.controller('UserController', [ '$scope','User', 
			function($scope,User) {
				
				$scope.username_pattern = "([a-z]|[A-Z]|[0-9])*";
				/*
				 * regex from : 
				 */
				var strong_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	            var medium_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
				
	            $scope.strength = function(pass) {
	            	if(strong_regex.test(pass)) {
	            		$scope.pass_class = 1;
	            		$scope.pass_message = "strong";
	            		$scope.strong = true;
	            		$scope.medium = false;
	            		$scope.progress_width = "100%";
	            		//delete $scope.form.pass.$error;// = false;           		
	            	}
	            	else if(medium_regex.test(pass)) {
	            		$scope.pass_class = 2;
	            		$scope.pass_message = "medium (accepted)";   
	            		$scope.medium = true;
	            		//delete $scope.form.pass.$error;// = false;
	            		$scope.strong = false;
	            		$scope.progress_width = "50%";
	            	}
	            	else {
	            		$scope.pass_class = 3;
	            		$scope.strong = false;
	            		$scope.medium = false;
	            		$scope.progress_width = "1%";
	            		//$scope.form.pass.$error.strength = true;
	            		$scope.pass_message = "invalid";
	            	}
				};	            
				$scope.match = false;	
				$scope.confirm_pass = function() {
					var confirm_div = angular.element(document.querySelector('#confirm-div'));
					if($scope.user.password == $scope.form.confirm.$viewValue) {
						$scope.form.confirm.$error.match = false;
						confirm_div.removeClass("has-error");
						$scope.match = true;
					}
					else {
						$scope.form.confirm.$error.match = true;					
						$scope.match = false;
						confirm_div.addClass("has-error");
					}
				};
				
				$scope.err = "";
				$scope.check_username = function() {
					User.get({ username: $scope.user.username}).$promise.then(function(data) {
						var input_elem = angular.element(document.querySelector('#username_div'));
						var i = angular.element(document.querySelector('#i_username'));
						input_elem.removeClass("has-error");
						input_elem.removeClass("has-succcess");
						if(data.exists) {
							input_elem.addClass("has-error");
							$scope.form.username.$error.exists = true;
						}
						else {
							input_elem.addClass("has-success");
							$scope.form.username.$error.exists = false;
						}
						$scope.err = "already exists!";
						console.log(input_elem);
							
					},function(){
						alert("OOOPS:We are very sorry, server could not be reached.Please try again later.");
					});
				};
				
				$scope.submit = function() {
					console.log(">>>>>> SUBMIT <<<<<<<");
					console.log($scope.user.firstName);
					console.log($scope.user.password);
					$scope.user.location.country = $scope.user.country.name;
					delete $scope.user.country;
					User.save($scope.user).$promise.then(function(data) {
						//bring form at initial state
						$scope.user={};
						$scope.confirm = "";
						$scope.match = false;
						$scope.strong = false;
						$scope.medium = false;
						var input_elem = angular.element(document.querySelector('#username_div'));
						input_elem.removeClass("has-succcess");			
						input_elem.removeClass("has-succcess");
						$scope.form.$setPristine(true);
						$scope.form.$setUntouched(true);
						
						$scope.submitted = false;
						//
						$('#signup_modal').modal('hide');
						$scope.success = true;
						$scope.title = "Success";
						$scope.message = "Your registration has been successfull! Please wait untill an admin verify your application.\nThank you.";
						$('#signup_response').modal('show');
						console.log(data);
					},function() {
						$('#signup_modal').modal('hide');
						$scope.success = false;
						$scope.title = "Error";
						$scope.message = "We are terribly sorry.\nThere must have been a server error.";
						$('#signup_response').modal('show');
						console.log("error");
						$scope.submitted = false;
					});
				};		
				
		
				$scope.countries = [ {
					name : 'Afghanistan',
					code : 'AF'
				}, {
					name : 'Åland Islands',
					code : 'AX'
				}, {
					name : 'Albania',
					code : 'AL'
				}, {
					name : 'Algeria',
					code : 'DZ'
				}, {
					name : 'American Samoa',
					code : 'AS'
				}, {
					name : 'Andorra',
					code : 'AD'
				}, {
					name : 'Angola',
					code : 'AO'
				}, {
					name : 'Anguilla',
					code : 'AI'
				}, {
					name : 'Antarctica',
					code : 'AQ'
				}, {
					name : 'Antigua and Barbuda',
					code : 'AG'
				}, {
					name : 'Argentina',
					code : 'AR'
				}, {
					name : 'Armenia',
					code : 'AM'
				}, {
					name : 'Aruba',
					code : 'AW'
				}, {
					name : 'Australia',
					code : 'AU'
				}, {
					name : 'Austria',
					code : 'AT'
				}, {
					name : 'Azerbaijan',
					code : 'AZ'
				}, {
					name : 'Bahamas',
					code : 'BS'
				}, {
					name : 'Bahrain',
					code : 'BH'
				}, {
					name : 'Bangladesh',
					code : 'BD'
				}, {
					name : 'Barbados',
					code : 'BB'
				}, {
					name : 'Belarus',
					code : 'BY'
				}, {
					name : 'Belgium',
					code : 'BE'
				}, {
					name : 'Belize',
					code : 'BZ'
				}, {
					name : 'Benin',
					code : 'BJ'
				}, {
					name : 'Bermuda',
					code : 'BM'
				}, {
					name : 'Bhutan',
					code : 'BT'
				}, {
					name : 'Bolivia',
					code : 'BO'
				}, {
					name : 'Bosnia and Herzegovina',
					code : 'BA'
				}, {
					name : 'Botswana',
					code : 'BW'
				}, {
					name : 'Bouvet Island',
					code : 'BV'
				}, {
					name : 'Brazil',
					code : 'BR'
				}, {
					name : 'British Indian Ocean Territory',
					code : 'IO'
				}, {
					name : 'Brunei Darussalam',
					code : 'BN'
				}, {
					name : 'Bulgaria',
					code : 'BG'
				}, {
					name : 'Burkina Faso',
					code : 'BF'
				}, {
					name : 'Burundi',
					code : 'BI'
				}, {
					name : 'Cambodia',
					code : 'KH'
				}, {
					name : 'Cameroon',
					code : 'CM'
				}, {
					name : 'Canada',
					code : 'CA'
				}, {
					name : 'Cape Verde',
					code : 'CV'
				}, {
					name : 'Cayman Islands',
					code : 'KY'
				}, {
					name : 'Central African Republic',
					code : 'CF'
				}, {
					name : 'Chad',
					code : 'TD'
				}, {
					name : 'Chile',
					code : 'CL'
				}, {
					name : 'China',
					code : 'CN'
				}, {
					name : 'Christmas Island',
					code : 'CX'
				}, {
					name : 'Cocos (Keeling) Islands',
					code : 'CC'
				}, {
					name : 'Colombia',
					code : 'CO'
				}, {
					name : 'Comoros',
					code : 'KM'
				}, {
					name : 'Congo',
					code : 'CG'
				}, {
					name : 'Congo, The Democratic Republic of the',
					code : 'CD'
				}, {
					name : 'Cook Islands',
					code : 'CK'
				}, {
					name : 'Costa Rica',
					code : 'CR'
				}, {
					name : 'Cote D\'Ivoire',
					code : 'CI'
				}, {
					name : 'Croatia',
					code : 'HR'
				}, {
					name : 'Cuba',
					code : 'CU'
				}, {
					name : 'Cyprus',
					code : 'CY'
				}, {
					name : 'Czech Republic',
					code : 'CZ'
				}, {
					name : 'Denmark',
					code : 'DK'
				}, {
					name : 'Djibouti',
					code : 'DJ'
				}, {
					name : 'Dominica',
					code : 'DM'
				}, {
					name : 'Dominican Republic',
					code : 'DO'
				}, {
					name : 'Ecuador',
					code : 'EC'
				}, {
					name : 'Egypt',
					code : 'EG'
				}, {
					name : 'El Salvador',
					code : 'SV'
				}, {
					name : 'Equatorial Guinea',
					code : 'GQ'
				}, {
					name : 'Eritrea',
					code : 'ER'
				}, {
					name : 'Estonia',
					code : 'EE'
				}, {
					name : 'Ethiopia',
					code : 'ET'
				}, {
					name : 'Falkland Islands (Malvinas)',
					code : 'FK'
				}, {
					name : 'Faroe Islands',
					code : 'FO'
				}, {
					name : 'Fiji',
					code : 'FJ'
				}, {
					name : 'Finland',
					code : 'FI'
				}, {
					name : 'France',
					code : 'FR'
				}, {
					name : 'French Guiana',
					code : 'GF'
				}, {
					name : 'French Polynesia',
					code : 'PF'
				}, {
					name : 'French Southern Territories',
					code : 'TF'
				}, {
					name : 'Gabon',
					code : 'GA'
				}, {
					name : 'Gambia',
					code : 'GM'
				}, {
					name : 'Georgia',
					code : 'GE'
				}, {
					name : 'Germany',
					code : 'DE'
				}, {
					name : 'Ghana',
					code : 'GH'
				}, {
					name : 'Gibraltar',
					code : 'GI'
				}, {
					name : 'Greece',
					code : 'GR'
				}, {
					name : 'Greenland',
					code : 'GL'
				}, {
					name : 'Grenada',
					code : 'GD'
				}, {
					name : 'Guadeloupe',
					code : 'GP'
				}, {
					name : 'Guam',
					code : 'GU'
				}, {
					name : 'Guatemala',
					code : 'GT'
				}, {
					name : 'Guernsey',
					code : 'GG'
				}, {
					name : 'Guinea',
					code : 'GN'
				}, {
					name : 'Guinea-Bissau',
					code : 'GW'
				}, {
					name : 'Guyana',
					code : 'GY'
				}, {
					name : 'Haiti',
					code : 'HT'
				}, {
					name : 'Heard Island and Mcdonald Islands',
					code : 'HM'
				}, {
					name : 'Holy See (Vatican City State)',
					code : 'VA'
				}, {
					name : 'Honduras',
					code : 'HN'
				}, {
					name : 'Hong Kong',
					code : 'HK'
				}, {
					name : 'Hungary',
					code : 'HU'
				}, {
					name : 'Iceland',
					code : 'IS'
				}, {
					name : 'India',
					code : 'IN'
				}, {
					name : 'Indonesia',
					code : 'ID'
				}, {
					name : 'Iran, Islamic Republic Of',
					code : 'IR'
				}, {
					name : 'Iraq',
					code : 'IQ'
				}, {
					name : 'Ireland',
					code : 'IE'
				}, {
					name : 'Isle of Man',
					code : 'IM'
				}, {
					name : 'Israel',
					code : 'IL'
				}, {
					name : 'Italy',
					code : 'IT'
				}, {
					name : 'Jamaica',
					code : 'JM'
				}, {
					name : 'Japan',
					code : 'JP'
				}, {
					name : 'Jersey',
					code : 'JE'
				}, {
					name : 'Jordan',
					code : 'JO'
				}, {
					name : 'Kazakhstan',
					code : 'KZ'
				}, {
					name : 'Kenya',
					code : 'KE'
				}, {
					name : 'Kiribati',
					code : 'KI'
				}, {
					name : 'Korea, Democratic People\'s Republic of',
					code : 'KP'
				}, {
					name : 'Korea, Republic of',
					code : 'KR'
				}, {
					name : 'Kuwait',
					code : 'KW'
				}, {
					name : 'Kyrgyzstan',
					code : 'KG'
				}, {
					name : 'Lao People\'s Democratic Republic',
					code : 'LA'
				}, {
					name : 'Latvia',
					code : 'LV'
				}, {
					name : 'Lebanon',
					code : 'LB'
				}, {
					name : 'Lesotho',
					code : 'LS'
				}, {
					name : 'Liberia',
					code : 'LR'
				}, {
					name : 'Libyan Arab Jamahiriya',
					code : 'LY'
				}, {
					name : 'Liechtenstein',
					code : 'LI'
				}, {
					name : 'Lithuania',
					code : 'LT'
				}, {
					name : 'Luxembourg',
					code : 'LU'
				}, {
					name : 'Macao',
					code : 'MO'
				}, {
					name : 'Macedonia, The Former Yugoslav Republic of',
					code : 'MK'
				}, {
					name : 'Madagascar',
					code : 'MG'
				}, {
					name : 'Malawi',
					code : 'MW'
				}, {
					name : 'Malaysia',
					code : 'MY'
				}, {
					name : 'Maldives',
					code : 'MV'
				}, {
					name : 'Mali',
					code : 'ML'
				}, {
					name : 'Malta',
					code : 'MT'
				}, {
					name : 'Marshall Islands',
					code : 'MH'
				}, {
					name : 'Martinique',
					code : 'MQ'
				}, {
					name : 'Mauritania',
					code : 'MR'
				}, {
					name : 'Mauritius',
					code : 'MU'
				}, {
					name : 'Mayotte',
					code : 'YT'
				}, {
					name : 'Mexico',
					code : 'MX'
				}, {
					name : 'Micronesia, Federated States of',
					code : 'FM'
				}, {
					name : 'Moldova, Republic of',
					code : 'MD'
				}, {
					name : 'Monaco',
					code : 'MC'
				}, {
					name : 'Mongolia',
					code : 'MN'
				}, {
					name : 'Montserrat',
					code : 'MS'
				}, {
					name : 'Morocco',
					code : 'MA'
				}, {
					name : 'Mozambique',
					code : 'MZ'
				}, {
					name : 'Myanmar',
					code : 'MM'
				}, {
					name : 'Namibia',
					code : 'NA'
				}, {
					name : 'Nauru',
					code : 'NR'
				}, {
					name : 'Nepal',
					code : 'NP'
				}, {
					name : 'Netherlands',
					code : 'NL'
				}, {
					name : 'Netherlands Antilles',
					code : 'AN'
				}, {
					name : 'New Caledonia',
					code : 'NC'
				}, {
					name : 'New Zealand',
					code : 'NZ'
				}, {
					name : 'Nicaragua',
					code : 'NI'
				}, {
					name : 'Niger',
					code : 'NE'
				}, {
					name : 'Nigeria',
					code : 'NG'
				}, {
					name : 'Niue',
					code : 'NU'
				}, {
					name : 'Norfolk Island',
					code : 'NF'
				}, {
					name : 'Northern Mariana Islands',
					code : 'MP'
				}, {
					name : 'Norway',
					code : 'NO'
				}, {
					name : 'Oman',
					code : 'OM'
				}, {
					name : 'Pakistan',
					code : 'PK'
				}, {
					name : 'Palau',
					code : 'PW'
				}, {
					name : 'Palestinian Territory, Occupied',
					code : 'PS'
				}, {
					name : 'Panama',
					code : 'PA'
				}, {
					name : 'Papua New Guinea',
					code : 'PG'
				}, {
					name : 'Paraguay',
					code : 'PY'
				}, {
					name : 'Peru',
					code : 'PE'
				}, {
					name : 'Philippines',
					code : 'PH'
				}, {
					name : 'Pitcairn',
					code : 'PN'
				}, {
					name : 'Poland',
					code : 'PL'
				}, {
					name : 'Portugal',
					code : 'PT'
				}, {
					name : 'Puerto Rico',
					code : 'PR'
				}, {
					name : 'Qatar',
					code : 'QA'
				}, {
					name : 'Reunion',
					code : 'RE'
				}, {
					name : 'Romania',
					code : 'RO'
				}, {
					name : 'Russian Federation',
					code : 'RU'
				}, {
					name : 'Rwanda',
					code : 'RW'
				}, {
					name : 'Saint Helena',
					code : 'SH'
				}, {
					name : 'Saint Kitts and Nevis',
					code : 'KN'
				}, {
					name : 'Saint Lucia',
					code : 'LC'
				}, {
					name : 'Saint Pierre and Miquelon',
					code : 'PM'
				}, {
					name : 'Saint Vincent and the Grenadines',
					code : 'VC'
				}, {
					name : 'Samoa',
					code : 'WS'
				}, {
					name : 'San Marino',
					code : 'SM'
				}, {
					name : 'Sao Tome and Principe',
					code : 'ST'
				}, {
					name : 'Saudi Arabia',
					code : 'SA'
				}, {
					name : 'Senegal',
					code : 'SN'
				}, {
					name : 'Serbia and Montenegro',
					code : 'CS'
				}, {
					name : 'Seychelles',
					code : 'SC'
				}, {
					name : 'Sierra Leone',
					code : 'SL'
				}, {
					name : 'Singapore',
					code : 'SG'
				}, {
					name : 'Slovakia',
					code : 'SK'
				}, {
					name : 'Slovenia',
					code : 'SI'
				}, {
					name : 'Solomon Islands',
					code : 'SB'
				}, {
					name : 'Somalia',
					code : 'SO'
				}, {
					name : 'South Africa',
					code : 'ZA'
				}, {
					name : 'South Georgia and the South Sandwich Islands',
					code : 'GS'
				}, {
					name : 'Spain',
					code : 'ES'
				}, {
					name : 'Sri Lanka',
					code : 'LK'
				}, {
					name : 'Sudan',
					code : 'SD'
				}, {
					name : 'Suriname',
					code : 'SR'
				}, {
					name : 'Svalbard and Jan Mayen',
					code : 'SJ'
				}, {
					name : 'Swaziland',
					code : 'SZ'
				}, {
					name : 'Sweden',
					code : 'SE'
				}, {
					name : 'Switzerland',
					code : 'CH'
				}, {
					name : 'Syrian Arab Republic',
					code : 'SY'
				}, {
					name : 'Taiwan, Province of China',
					code : 'TW'
				}, {
					name : 'Tajikistan',
					code : 'TJ'
				}, {
					name : 'Tanzania, United Republic of',
					code : 'TZ'
				}, {
					name : 'Thailand',
					code : 'TH'
				}, {
					name : 'Timor-Leste',
					code : 'TL'
				}, {
					name : 'Togo',
					code : 'TG'
				}, {
					name : 'Tokelau',
					code : 'TK'
				}, {
					name : 'Tonga',
					code : 'TO'
				}, {
					name : 'Trinidad and Tobago',
					code : 'TT'
				}, {
					name : 'Tunisia',
					code : 'TN'
				}, {
					name : 'Turkey',
					code : 'TR'
				}, {
					name : 'Turkmenistan',
					code : 'TM'
				}, {
					name : 'Turks and Caicos Islands',
					code : 'TC'
				}, {
					name : 'Tuvalu',
					code : 'TV'
				}, {
					name : 'Uganda',
					code : 'UG'
				}, {
					name : 'Ukraine',
					code : 'UA'
				}, {
					name : 'United Arab Emirates',
					code : 'AE'
				}, {
					name : 'United Kingdom',
					code : 'GB'
				}, {
					name : 'United States',
					code : 'US'
				}, {
					name : 'United States Minor Outlying Islands',
					code : 'UM'
				}, {
					name : 'Uruguay',
					code : 'UY'
				}, {
					name : 'Uzbekistan',
					code : 'UZ'
				}, {
					name : 'Vanuatu',
					code : 'VU'
				}, {
					name : 'Venezuela',
					code : 'VE'
				}, {
					name : 'Vietnam',
					code : 'VN'
				}, {
					name : 'Virgin Islands, British',
					code : 'VG'
				}, {
					name : 'Virgin Islands, U.S.',
					code : 'VI'
				}, {
					name : 'Wallis and Futuna',
					code : 'WF'
				}, {
					name : 'Western Sahara',
					code : 'EH'
				}, {
					name : 'Yemen',
					code : 'YE'
				}, {
					name : 'Zambia',
					code : 'ZM'
				}, {
					name : 'Zimbabwe',
					code : 'ZW'
				} ];
				
			
			} ]);

	app.controller('LoginController', [ '$scope', 'UserPass', 
		function($scope, User) {
			
//			$scope.err = "";
//			$scope.check_username = function() {
//				User.query().$promise.then(function(data,all_users) {
//					var not_exists = true;
//					for(var i = 0; i < data.length; i++) {
//						console.log(data[i].username);
//						if($scope.user.username == data[i].username) {	
//							console.log("username does not exist");
//							not_exists = false;
//						}
//					}
//					console.log(not_exists);
//					var input_elem = angular.element(document.querySelector('#username_div'));
//					var i = angular.element(document.querySelector('#i_username'));
//					input_elem.removeClass("has-error");
//					input_elem.removeClass("has-succcess");
//					if(not_exists) {
//						input_elem.addClass("has-error");
//						$scope.form.username.$error.not_exists = true;
//					}
//					else {
//						input_elem.addClass("has-success");
//						$scope.form.username.$error.not_exists = false;
//					}
//					$scope.err = "does not exist!";
//					console.log(input_elem);
//				});			
//			}
		
		
			$scope.err = "";
			$scope.check_user_pass = function() {
				UserPass.get({username: $scope.user.username, password: $scope.user.password}).$promise.then(function(data) {
					var wrong = true;
					if (data != null) {
						console.log("username and password are correct");
						wrong = false;
					}
					document.write("user and pass: " + wrong + " ");
					console.log(wrong);
					input_elem.removeClass("has-error");
					input_elem.removeClass("has-succcess");
					if(wrong) {
						input_elem.addClass("has-error");
						$scope.form.login.$error.wrong = true;
					}
					else {
						input_elem.addClass("has-success");
						$scope.form.login.$error.wrong = false;
					}
					$scope.err = "wrong!";
					console.log(input_elem);
				});
			};
			
			
//			$scope.err = "";
//			$scope.check_password = function() {
//				User.query().$promise.then(function(data,all_users) {
//					var wrong = true;
//					for(var i = 0; i < data.length; i++) {
//						console.log(data[i].username);
//						console.log(data[i].password);
//						console.log(data);
//						if($scope.user.username == data[i].username) {
//							console.log(data[i].password);
//							document.write("data password: " + data[i].password);
//							document.write("scope password: " + $scope.user.password);
//							if($scope.user.password == data[i].password) {
//								console.log("password is correct");
//								wrong = false;
//							}
//						}
//					}
//					console.log(wrong);
//					var input_elem = angular.element(document.querySelector('#password_div'));
//					var i = angular.element(document.querySelector('#i_password'));
//					input_elem.removeClass("has-error");
//					input_elem.removeClass("has-succcess");
//					if(wrong) {
//						input_elem.addClass("has-error");
//						$scope.form.pass.$error.wrong = true;
//					}
//					else {
//						input_elem.addClass("has-success");
//						$scope.form.pass.$error.wrong = false;
//					}
//					$scope.err = "wrong!";
//					console.log(input_elem);
//				});			
//			}
			
			$scope.submit = function() {
				console.log($scope.user.firstName);
				console.log($scope.user.password);
				$scope.user.location.country = $scope.user.country.name;
//				delete $scope.user.country;
//				User.save($scope.user);
			};
		}
	]);

	 /*
	 app.controller('UserController',['$scope','User',function($scope,User) {
	 $scope.submit_function = function() {
	 User.save($scope.user);
	 console.log("key pressed");
	 }
	 }]);
*/
	 app.controller('SearchController', [ '$scope', '$window',
		function($scope, $window) {
		 
		 	$scope.category = false;
		 	$scope.price_low = 50;
		 	$scope.price_mid = 100;
		 	$scope.price_high = 200;
		 	$scope.location_continent = false;
		 	$scope.location_from_km = false;
		 	$scope.location_to_km = false;
		 	$scope.description = false;
		 	
		 	
		 	$scope.must = true;
			$scope.current_content = $scope.content;
			console.log($scope.current_content);
			$scope.test_search = function() {
				console.log("here");
				$scope.search();
			}
			$(window).on("resize.doResize", function() {
				
				$scope.$apply(function() {
					if(window.innerWidth < 1290) {
						$scope.must = false;
					}
					else {
						$scope.must = true;
					}
				});
			});

 		} 
	 ]);
	 
	 app.controller('MainContentController',['$window','$scope',function($window,$scope) {
		 $scope.content = "index";
		 $scope.search = function() {
			 $window.location.href = '/WebAuctions/main.html';
//			 console.log("called");
//			 $scope.content = "main";
		 };
	 }]);
	 
	 
	 
	 app.controller('AuctionsController',['$scope',function($scope) {
		 // test for ng-repeat
		 $scope.current_page = 1;
		 var items_per_page = 10;
		 
		 $scope.items = [
		            {"item" : {"name" :"iphone 5s",
		             "max_bid" : 35.4,
		             "description" : "The iPhone 5 is a smartphone that was designed and marketed by Apple Inc. " +
		             "It is the sixth generation of the iPhone, succeeding the iPhone 4S " +
		             "and preceding the iPhone 5S and iPhone 5C. " +
		             "Formally unveiled as part of a press event on September 12, 2012, "
		             ,"seller" :
		             	{
		            	  "username":"BestSeller09",
		            	  "seller_rating": 300,
		             	}
		            }
		 }];        
		 
		 $scope.getItems = function() {
			return $scope.items.slice(0,items_per_page); 
		 };
		 
		 var p = $scope.items.length ;
		 console.log(p);
		 $scope.pages = new Array(p).join().split(',').map(function(item, index){ return ++index;})
		 console.log($scope.pages);
		 
		 $scope.get_page = function() {
			 
		 };
		              
	 }]);
	 
	
	 
})();

$(function() {
	$('.dropdown-toggle').dropdown();
    var $sidebar   = $("#sidebar"), 
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });
    
});

