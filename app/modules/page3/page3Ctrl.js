(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:page3Ctrl
	* @description
	* # page3Ctrl
	* Controller of the app
	*/

  	angular
		.module('page3')
		.controller('Page3Ctrl', Page3);

		Page3.$inject = ['$q', '$http', 'Page3Service'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Page3($q, $http, Page3Service) {
			/*jshint validthis: true */
			var vm = this;

			vm.items = [];

			Page3Service.getAll().then(function (ret) {
				vm.items = ret.data;
			})

		}

})();
