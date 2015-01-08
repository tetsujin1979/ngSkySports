myApp.controller('SkySportsCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    'use strict';

    $scope.dates = [];
    $scope.fixtures = [];

    $scope.date = '';
    $scope.events = '';
    $scope.selectedCompetition = '';
    $scope.selectedFixture = '';
    $scope.teams = '';

    $scope.clear = function() {

        $scope.fixtures = [];
        $scope.teams = '';
        $scope.events = '';

    };

    $scope.getDates = function() {

        $scope.clear();
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        var config = {

            method: 'GET',
            url: 'http://d.365dm.com/api/score-centre/v1/football/schedule'

        };
        $http(config).success(function(data) {

            $scope.dates = data.items;
            $scope.dates.forEach(function(entry, index) {

                if (entry.date === today) {

                    $scope.date = entry;

                }
                entry.date = new Date(entry.date);

            });

        }).
        error(function(data, status) {

            $scope.data = data || "Request failed";
            $scope.status = status;

        });

    };

    $scope.setDate = function(date) {

        $scope.selectedCompetition = '';
        $scope.clear();
        $scope.date = date;

    };

    $scope.setFixtures = function(selectedCompetition, fixtures) {

        $scope.selectedCompetition = selectedCompetition;
        $scope.clear();
        angular.forEach(fixtures, function(item) {

            var config = {

                method: 'GET',
                url: 'http://d.365dm.com/api/score-centre/v1/football/fixture/' + item

            };
            $http(config).success(function(data) {

                $scope.fixtures.push(data);

            }).
            error(function(data, status) {

                $scope.data = data || "Request failed";
                $scope.status = status;

            });

        });

    };

    $scope.setFixture = function(id) {

        $scope.teams = '';
        $scope.events = '';
        $scope.selectedFixture = id;
        var teamsConfig = {

            method: 'GET',
            url: 'http://d.365dm.com/api/score-centre/v1/football/fixture/teams/' + id

        };
        var eventsConfig = {

            method: 'GET',
            url: 'http://d.365dm.com/api/score-centre/v1/football/fixture/teams/events/' + id

        };
        $http(teamsConfig).success(function(data) {

            $scope.teams = data;

        }).
        error(function(data, status) {

            $scope.data = data || "Request failed";
            $scope.status = status;

        });
        $http(eventsConfig).success(function(data) {

            $scope.events = data.items;

        }).
        error(function(data, status) {

            $scope.data = data || "Request failed";
            $scope.status = status;

        });

    };

    $scope.isSelectedCompetition = function(competitionName) {

        return ($scope.selectedCompetition === competitionName) ? 'selected' : '';

    };

    $scope.isSelectedDate = function(date) {

        return ($scope.date === date) ? 'selected' : '';

    };

    $scope.isSelectedFixture = function(fixtureId) {

        return ($scope.selectedFixture === fixtureId) ? 'selectedFixture' : '';

    };

    $scope.eventClass = function(eventType) {

        var retVal = '';
        switch (eventType) {

            case 1: //goal
                retVal = "fa fa-futbol-o";
                break;

            case 2: //penalty in normal time
                retVal = "fa fa-futbol-o penalty";
                break;

            case 3: //own goal
                retVal = "fa fa-futbol-o red";
                break;

            case 4: //booking
                retVal = "fa fa-square yellow";
                break;

            case 5: //sening off 
                retVal = "fa fa-square red";
                break;

            case 12: //substituted
                retVal = "fa fa-refresh red";
                break;

            case 21: //penalty in shoot out
                retVal = '';
                break;

            case 30: //introduced
                retVal = "fa fa-refresh green";
                break;

            case 31: //assist
                retVal = "fa fa-star-o";
                break;

            default:
                retVal = '';
                break;

        }
        return retVal;

    };


}]);

myApp.filter('matchTime', function() {

    return function(time) {

        var retVal = time.split(':')[0];
        if (time.indexOf("(") != -1) {

            var extraTime = time.split('(')[1];
            retVal = retVal + "+" + extraTime[0];

        }
        return retVal + "'";

    };

});