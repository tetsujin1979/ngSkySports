myApp.controller('SkySportsCtrl', function($http, $filter) {

    'use strict';

    var thisController = this;
    thisController.dates = [];
    thisController.fixtures = [];
    thisController.fixture = '';
    thisController.date = '';
    thisController.competition = '';
    thisController.teams = '';
    thisController.events = '';

    thisController.clear = function() {

        thisController.fixtures = [];
        thisController.teams = '';
        thisController.events = '';

    };

    thisController.getDates = function() {

        thisController.clear();
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        var config = {

            method: 'GET',
            url: 'https://d.365dm.com/api/score-centre/v1/football/schedule'

        };
        $http(config).success(function(data) {

            thisController.dates = data.items;
            thisController.dates.forEach(function(entry, index) {

                if (entry.date === today) {

                    thisController.date = entry;

                }
                entry.date = new Date(entry.date);

            });

        }).
        error(function(data, status) {

            thisController.data = data || "Request failed";
            thisController.status = status;

        });

    };

    thisController.setDate = function(date) {

        thisController.competition = '';
        thisController.clear();
        thisController.date = date;

    };

    thisController.setFixtures = function(selectedCompetition, fixtures) {

        thisController.competition = selectedCompetition;
        thisController.clear();
        angular.forEach(fixtures, function(item) {

            var config = {

                method: 'GET',
                url: 'https://d.365dm.com/api/score-centre/v1/football/fixture/' + item

            };
            $http(config).success(function(data) {

                thisController.fixtures.push(data);

            }).
            error(function(data, status) {

                thisController.data = data || "Request failed";
                thisController.status = status;

            });

        });

    };

    thisController.isSelectedDate = function(date) {

        return (thisController.date === date) ? 'selected' : '';

    };

    thisController.isSelectedCompetition = function(competitionName) {

        return (thisController.competition === competitionName) ? 'selected' : '';

    };

    thisController.setFixture = function(id) {

        thisController.teams = '';
        thisController.events = '';
        thisController.selectedFixtureId = id;
        var teamsConfig = {

            method: 'GET',
            url: 'https://d.365dm.com/api/score-centre/v1/football/fixture/teams/' + id

        };
        var eventsConfig = {

            method: 'GET',
            url: 'https://d.365dm.com/api/score-centre/v1/football/fixture/teams/events/' + id

        };
        $http(teamsConfig).success(function(data) {

            thisController.teams = data;

        }).
        error(function(data, status) {

            thisController.data = data || "Request failed";
            thisController.status = status;

        });
        $http(eventsConfig).success(function(data) {

            thisController.events = data.items;

        }).
        error(function(data, status) {

            thisController.data = data || "Request failed";
            thisController.status = status;

        });

    };

    thisController.isSelectedFixture = function(fixtureId) {

        return (thisController.selectedFixtureId === fixtureId) ? 'selected' : '';

    };

    thisController.eventClass = function(eventType) {

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

});

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
