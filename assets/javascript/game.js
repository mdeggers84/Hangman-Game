// was receiving null errors on querySelector, so put everything inside a function that ensures
// that the page is loaded before executing js.

// initially wrapped object in the following event listener, but discovered the `defer` script att
// is one better than the other?
// document.addEventListener("DOMContentLoaded", function(event) { 
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
  	guessCount: 6,
  	hangCount: 0,
  	gameOver: false,
  	theGame: document.querySelector("#the-game"),
  	correct: document.querySelector("#correct"),
  	incorrect: document.querySelector("#incorrect"),
  	cheer: document.querySelector("#cheer"),
  	zombie: document.querySelector("#zombie"),
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
  		this.guessCount = 6;
  		console.log(this.currWord);
  	},

  	// need to check lenth of word and draw blanks
  	writeHTML: function() {	
  		// updated javascript
  		for (var i = 0; i < this.currWord.length; i++) {
  			var newSpan = document.createElement("span");
  			newSpan.setAttribute("id", "pos" + i);
  			this.gameSpace.appendChild(newSpan);
  		}
  		this.guessSpace.innerHTML = "<p>Guessed letters: ...</p>" +
  		"<p>Guesses Remaining: 6</p>";
  	},

  	// prints guessed letters to screen
  	logGuess: function(val) {
  		this.guessArr.push(val);
  		var html = "<p>Guessed letters: " + this.guessArr.join(", ").toUpperCase() + "</p>" +
  		"<p> Guesses Remaining: " + this.guessCount + "</p>";
  		this.guessSpace.innerHTML = html;
  	},

		// fill in the blank/s on correct guess
		goodGuess: function(val) {
			// document.querySelector('#pos' + index).innerHTML = this.currWord.charAt(index);
			this.correct.play();
			this.logGuess(val);
			for (var i = 0; i < this.currWordArr.length; i++) {
				if (val === this.currWordArr[i]) {
					document.querySelector('#pos' + i).innerHTML = val;
					this.guessStr += val;
				}
				if (this.guessStr.length === this.currWord.length) {
					this.gameOver = true;
					setTimeout(this.youWin, 1000);
				}
			}
		},

		// bad guess
		badGuess: function(val) {
			this.incorrect.play();
			this.guessCount --;
			this.logGuess(val);
			this.hangTheMan();
			if (this.guessCount === 0) {
				this.gameOver = true;
				setTimeout(this.youLose, 1000);
			}
		},

		// updates image based on # of wrong guesses
		// i'd like to learn how to do this with canvas / css for future update
		hangTheMan: function() {
			this.hangCount ++;
			this.gameScreen.innerHTML = "<img src=\"assets/images/Hangman-" + 
			this.hangCount + ".png\" alt=\"Hangman-" + this.hangCount + "\">";
		},

		// word is complete: can check at the end of goodGuess if guessArr.join === word
		youWin: function() {
			// "this" references "window" rather than the game object when I use the setTimeout function on the call
			// game.playCheer();
			game.cheer.play();
			game.theGame.innerHTML = "<img src=\"assets/images/sloth.gif\" alt=\"Sloth\">";
			var html = "<h1 class=\"text-center\">You Win!!</h1>";
			game.status.innerHTML = html;
			game.statusBox.style.visibility = "visible";
		},

		// local variable that iterates for each miss
		youLose: function() {
			game.zombie.play();
			game.theGame.innerHTML = "<img src=\"assets/images/zombie.gif\" alt=\"Sloth\">";
			var html = "<h1 class=\"text-center\">You Lose!!</h1>" +
			"<p>The answer was <span class=\"blue\">" + game.currWord + "</span>.";
			game.status.innerHTML = html;
			game.statusBox.style.visibility = "visible";
		},

		// reset the game -- essentially reload the page
		reset: function() {
			// game.gameOver = false;
			// game.guessArr = [];
			// game.guessStr = "";
			// game.hangCount = 0;
			// game.gameScreen.innerHTML = "<img src=\"assets/images/Hangman-0.png\" alt=\"Hangman-0\">";
			// game.statusBox.style.visibility = "hidden";
			// game.selectWord(game.wordArr.length);
			// game.writeHTML();

			// I initially reset variables / rewrote html, but decided forcing a page refresh was simpler.
			// in the future, if I wanted to set up a tracker, I'd revert back to the previous way.
			location.reload();
		}

	};

	// initial function calls to get the game rolling
	game.selectWord(game.wordArr.length);
	game.writeHTML();

	// onkey event
	document.onkeyup = function(event) {
		if (game.gameOver === false) {
			var userGuess = event.key;
			var re = /^[a-z]/;
			if (re.test(userGuess)) {
				if (game.currWord.indexOf(userGuess) !== -1 && game.guessArr.indexOf(userGuess) === -1) {
					game.goodGuess(userGuess);
				} else if (game.currWord.indexOf(userGuess) === -1 && game.guessArr.indexOf(userGuess) === -1) {
					game.badGuess(userGuess);
				}
			}
		}	
	};

	// listens for click even on resetBtn once game is finished
	document.querySelector('#resetBtn').addEventListener('click', game.reset);

// });
