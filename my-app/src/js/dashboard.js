Vue.config.debug = true;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Vue.transition('reload', {
	enterClass: "flipInX",
	leaveClass: "fadeOutLeft",
});

Vue.component('competitors', {
	props: ['list', 'showAthletes'],
	template: '#competitors-template',
});

Vue.component('athlete', {
	props: ['data'],
	template: '#athlete-template',
	computed: {
		athleteName: function() {
			return this.data.userFirstName.capitalize() + ' ' + this.data.userLastInitial + '.';
		},
		numReps: function() {
			if (this.data.style == '(SC)') {
				return this.data.reps + '*';
			} else {
				return this.data.reps;
			}
		}
	}
});

new Vue({
	el: '#leaderboard-app',

	data: {
		test: '',
		competitors: [],
		tests: [],
		showAthletes: true,
		numAthletes: 0,
		pageOfLeaderboard: 0,
		numTopAthletesSticky: 3,
		numPagesOfLeaderboard: 0,
		numAthletesPerPage: 10,
		leaderboardPageDelay: 10000,
		ajaxErrorCount: 0,
		reps: [],
		percentPrescribed: 0,
	},

	methods: {
		updateData: function() {
			this.competitors = [];
			this.showAthletes = false;
			this.$http.get('https://apis.trainheroic.com/public/leaderboard/468425', function (response, status, request) {

				this.test = response.tests[0].title;
                competitors = response.results;
                this.competitors = this.addRepsStats(competitors);
                this.numAthletes = response.results.length;
                this.numPagesOfLeaderboard = this.calcNumPages();
                this.pageOfLeaderboard = 0;

                this.showAthletes = true;
                this.ajaxErrorCount = 0;

                this.cycleLeaderboard();

            }).catch(function (data, status, request) {
            	if (this.ajaxErrorCount < 3) {
            		this.ajaxErrorCount += 1;
            		this.updateData();
            	} else {
            		return false;
            	}
            });
		},
		cycleLeaderboard: function() {
			if (this.pageOfLeaderboard < this.numPagesOfLeaderboard) {
				this.pageOfLeaderboard += 1
				setTimeout(this.cycleLeaderboard, this.leaderboardPageDelay)
			} else {
				this.updateData()
			}
		},
		addRepsStats: function(competitors) {
			reps = []
			rxCount = 0
			scCount = 0
			for (var key in competitors) {
				var testStats = competitors[key].tests[0].split(' ');
				competitors[key]['reps'] = testStats[0]
				competitors[key]['style'] = testStats[1]

				reps.push(testStats[0])
				if (testStats[1] == '(RX)') {
					rxCount += 1
				} else {
					scCount += 1
				}
			}
			this.reps = reps
			this.percentPrescribed = Math.round(rxCount / (rxCount + scCount) * 100)
			return competitors
		},
		calcNumPages: function() {
			var numPaginatedAthletes = (this.numAthletes - this.numTopAthletesSticky)
			var numAthletesPerPage = this.numAthletesPerPage
			if (numPaginatedAthletes % numAthletesPerPage) {
				return Math.floor(numPaginatedAthletes / numAthletesPerPage) + 1;
			} else {
				return Math.floor(numPaginatedAthletes / numAthletesPerPage);
			}
		}
	},

	computed: {
		leaderboardTitle: function() {
			if (this.ajaxErrorCount < 3) {
				return this.test + ' Leaderboard';
			} else {
				return "No data. Please reload."
			}
		},
		topX: function() {
			var toppers = [{"userFirstName":"Monisha","userFirstInitial":"M","userLastName":"Padmavathy","userLastInitial":"R","username":"monisha","profileImg":"https:\/\/s3-us-west-2.amazonaws.com\/trainheroic-prod\/avatar\/avatar-AY-d63530f349bb4f5cdf099492d317429e.png","profileUrl":"https:\/\/athlete.trainheroic.com\/#\/profile\/ayankay","userId":12567,"saved_workout_date":null,"notes":"","rating":false,"rank":1,"avgRank":1,"tests":["100.00 (RX)"],"userTests":[{"sws_id":9861806,"timestamp":1456435137,"value":"100.00","rx_bool":true,"like_count":0,"comment_count":0,"liked":false,"valueForAvg":"100.00"}],"ranks":[1],"teamId":null,"initials":"AY", "reps":100.0},{"userFirstName":"Manonmani","userFirstInitial":"J","userLastName":"Hughes","userLastInitial":"H","username":"hugjax19","profileImg":"https:\/\/s3-us-west-2.amazonaws.com\/trainheroic-prod\/avatar\/avatar-JH-940ba5687344dee39f0a33bc639ea684.png","profileUrl":"https:\/\/athlete.trainheroic.com\/#\/profile\/hugjax19","userId":14326,"saved_workout_date":null,"notes":"","rating":false,"rank":2,"avgRank":2,"tests":["80.00 (RX)"],"userTests":[{"sws_id":9879750,"timestamp":1456318012,"value":"80.00","rx_bool":true,"like_count":0,"comment_count":0,"liked":false,"valueForAvg":"80.00"}],"ranks":[2],"teamId":null,"initials":"JH","reps":80.0},{"userFirstName":"Maithili","userFirstInitial":"G","userLastName":"AndrewDavis","userLastInitial":"A","username":"gdavis","profileImg":"https:\/\/s3-us-west-2.amazonaws.com\/trainheroic-prod\/avatar\/avatar-GA-3adf2de9c2bd5750b20262442e3afce9.png","profileUrl":"https:\/\/athlete.trainheroic.com\/#\/profile\/gdavis","userId":46845,"saved_workout_date":null,"notes":"","rating":false,"rank":3,"avgRank":3,"tests":["60.00 (RX)"],"userTests":[{"sws_id":9896653,"timestamp":1456546350,"value":"60.00","rx_bool":true,"like_count":0,"comment_count":0,"liked":false,"valueForAvg":"60.00"}],"ranks":[3],"teamId":null,"initials":"GA","reps":50.0}]
			return toppers.slice(0,3);
		},
		leaderboardPage: function() {
			var start = (this.pageOfLeaderboard - 1) * this.numAthletesPerPage + 5
			var end = start + this.numAthletesPerPage
			if (end > this.numAthletes) {
				end = this.numAthletes
			}
			return this.competitors.slice(start, end);
		},
		medianReps: function() {
			var middle = Math.floor(this.numAthletes / 2);
			return this.reps[middle]
		},
		maxReps: function() {
			return this.reps[0];
		}
	},

    ready: function() {
        this.updateData();
    },
});