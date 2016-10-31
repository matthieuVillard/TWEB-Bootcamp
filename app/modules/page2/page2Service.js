(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:page2Service
	 * @description
	 * # page2Service
	 * Service of the app
	 */

  	angular
		.module('page2')
		.factory('Page2Service', Page2);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Page2.$inject = ['$http', '$q'];

		function Page2 ($http, $q) {
		
            var user;
            var repository;

            return {

                setUser: function (newUser) {
                    user =  newUser;
                },

                getUser: function () {
                    return user;
                },

                setRepository: function (newRepository) {
                    repository = newRepository;
                },

                getRepository: function () {
                    return repository;
                },

                getCommits: function () {
                    var deferred = $q.defer();

                    $http.get('/repos/' + user + '/' + repository + '/stats/contributors')
                        .then(function (ret) {
                            var authors = ret.data;

                            var labels = [];
                            var data = [];

                            for(var i in authors){
                                labels.push(authors[i]['author']['login']);
                                data.push(authors[i]['total'])
                            }

                            deferred.resolve({
                                data:  data,
                                labels: labels
                            });
                        });

                    return deferred.promise;
                },

                getParticipations: function () {
                    var deferred = $q.defer();

                    $http.get('/repos/' + user + '/' + repository + '/stats/participation')
                        .then(function (ret) {
                            var participations = ret.data;
                            var ownerData = [];
                            var allData = [];
                            var labels = [];
                            var series = ['Owner', 'All'];

                            for (var i in participations['all']){
                                labels.push(i);
                                allData.push(participations['all'][i]);
                            }

                            for (var i in participations['owner']){
                                ownerData.push(participations['owner'][i]);
                            }

                            deferred.resolve({
                                data:  [ownerData, allData],
                                labels: labels,
                                series: series
                            });
                        });

                    return deferred.promise;
                }
            }
        }
})();
