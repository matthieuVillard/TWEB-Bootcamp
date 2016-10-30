(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:page2Ctrl
	* @description
	* # page2Ctrl
	* Controller of the app
	*/

  	angular
		.module('page2')
		.controller('Page2Ctrl', Page2);

		Page2.$inject = ['$q', '$http', 'Page2Service'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Page2($q, $http, Page2Service) {
			/*jshint validthis: true */
			var vm = this;

			vm.user = "matthieuVillard";
			vm.repository = "TWEB-Bootcamp";

			vm.update = function () {
				update(vm, $http, Page2Service)
			};

			update(vm, $http, Page2Service);
		}

		function update(vm, $http, Page2Service) {
			Page2Service.setUser(vm.user);
			Page2Service.setRepository(vm.repository);

			$http.post('/api/req', {user: vm.user, repository: vm.repository});

			Page2Service.getCommits().then(function (res) {
				vm.commitsLabels = res.labels;
				vm.commitsData = res.data
			});

			Page2Service.getParticipations().then(function (res) {
				vm.participationsData = res.data;
				vm.participationsSeries = res.series;
				vm.participationsLabels = res.labels;
			})
		}
})();
