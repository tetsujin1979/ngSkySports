ngSkySports
===========

AngularJS Single Page Application that uses the Sky Sports REST services to populate a page with all the available dates, the competitions on those dates, each fixture per competition and the lineups and events for each fixture

Recently, Sky Sports updated their mobile app to use a different source of data to the live score centre - `http://live.skysports.com/ScoreCentre/football.html`
I ran [the Linux proxy server][squid] - `http://www.squid-cache.org/` - on my Kubuntu laptop, and forced my mobile to use it as a proxy with ProxyDroid 

I found the following links were being opened by the app (note that {fixture id} in each link is assumed to be the same value )

[*] http://d.365dm.com/api/score-centre/v1/football/schedule - retrieving the list of available dates, with the competitions on each day and the id of each fixture
[*] http://d.365dm.com/api/score-centre/v1/football/fixture/{fixture id} - information about the fixture - competition, round, status, kick off time, teams, score, scorers, location, attendance, referee, etc
[*] http://d.365dm.com/api/score-centre/v1/football/fixture/teams/{fixture id} - the lineups for the fixture, and the squad number for each player
[*] http://d.365dm.com/api/score-centre/v1/football/fixture/teams/events/{fixture id} - each event in the fixture (goal, penalty, OG, assist, booking, red card, shoot out), organised by player id, which matches with the player id in the teams/{fixture id} link

### Getting Started

* The http server is retrieved using `npm`, the [node package manager][npm].
* The angular and font awesome code is retrieved using `bower`, a [client-side code package manager][bower].

`npm` has been configured to automatically run `bower` so simply run:

```
npm install
```

The .bowerrc file ensures the components are added to the 'app/bower_components' directory, instead of the default root directory

on completion run
```
npm start
```
to run the webserver and open the app itself at `http://localhost:8000/app/index.html` 

## Directory Layout

```
app/                    --> all of the source files for the application
  skysports/            --> the main application code
    skysports.html            --> the application template
    skysports.js              --> the controller logic
    skysports.css             --> the style sheet for the application
  index.html            --> the main html template file of the app
