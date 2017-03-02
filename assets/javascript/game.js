// was receiving null errors on querySelector, so put everything inside a function that ensures
// that the page is loaded before executing js.
document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  var game = {

  	wordArr: [
  		"dog", "cat", "mouse", "giraffe", "horse", "wolf", "hippo", "dolphin", "sasquatch", "panda", "sloth", "zebra",
  		"jackal", "lion", "parrot", "raccoon", "otter", "armadillo", "porcupine", "possum", "reindeer"
  	],
  	// wordArr: ["doooog"],
  	currWord: "",
  	currWordArr: [],
  	guessArr: [],
  	guessStr: "",
  	guessCount: 12,
  	gameScreen: document.querySelector('#gameScreen'),
  	gameSpace: document.querySelector('#gameSpace'),
  	guessSpace: document.querySelector('#guessSpace'),
  	status: document.querySelector('#status'),
  	statusBox: document.querySelector('#statusBox'),

  	// select random word from arr
  	selectWord: function(length) {
  		var num = Math.floor(Math.random() * (length - 0) + 0);
  		this.currWord = this.wordArr[num];
  		this.currWordArr = this.currWord.split('');
  		this.guessCount = 12;
  		console.log(this.currWord);
  	},

  	// need to check lenth of word and draw blanks
  	writeHTML: function() {	
  		var html = "";
  		for (var i = 0; i < this.currWord.length; i++) {
  			html += "<span id=\"pos" + i + "\"></span>";
  		}
  		this.gameSpace.innerHTML = html;
  		this.guessSpace.innerHTML = "<p>Guessed letters: ...</p>" +
			"<p>Guesses Remaining: 12</p>";
  	},

  	logGuess: function(val) {
  		this.guessArr.push(val);
  		var html = "<p>Guessed letters: " + this.guessArr.join(", ").toUpperCase() + "</p>" +
  		"<p> Guesses Remaining: " + this.guessCount + "</p>";
  		this.guessSpace.innerHTML = html;
  	},

		// fill in the blank/s on correct guess
		goodGuess: function(val) {
			// document.querySelector('#pos' + index).innerHTML = this.currWord.charAt(index);
			this.logGuess(val);
			for (var i = 0; i < this.currWordArr.length; i++) {
				if (val === this.currWordArr[i]) {
					document.querySelector('#pos' + i).innerHTML = val;
					this.guessStr += val;
				}
				if (this.guessStr.length === this.currWord.length) {
					this.youWin();
				}
			}
		},

		// bad guess
		badGuess: function(val) {
			this.guessCount --;
			this.logGuess(val);
			if (this.guessCount === 0) {
				this.hangTheMan();
			}
		},

		// word is complete: can check at the end of goodGuess if guessArr.join === word
		youWin: function() {
			var html = "<h1 class=\"text-center\">You Win!!</h1>";
			this.status.innerHTML = html;
			this.statusBox.style.visibility = "visible";
		},

		// local variable that iterates for each miss
		hangTheMan: function() {
			var html = "<h1 class=\"text-center\">You Lose!!</h1>";
			this.status.innerHTML = html;
			this.statusBox.style.visibility = "visible";
		},

		// reset the game
		reset: function() {
			game.guessArr = [];
			game.guessStr = "";
			game.statusBox.style.visibility = "hidden";
			game.selectWord(game.wordArr.length);
			game.writeHTML();
		}

	};

	// onkey event
	document.onkeyup = function(event) {
		var userGuess = event.key;
		var re = /^[a-z]/;
		if (re.test(userGuess)) {
			if (game.currWord.indexOf(userGuess) !== -1 && game.guessArr.indexOf(userGuess) === -1) {
				game.goodGuess(userGuess);
			} else if (game.currWord.indexOf(userGuess) === -1 && game.guessArr.indexOf(userGuess) === -1) {
				game.badGuess(userGuess);
			}
		}
	};

	document.querySelector('#resetBtn').addEventListener('click', game.reset);

	// initial function calls to get the game rolling
	game.selectWord(game.wordArr.length);
	game.writeHTML();

});
