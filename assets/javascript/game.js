// put as much of the game in the object as i could
var game = {

	// sets up up variables / functions as key/value pairs of the game object
	wordArr: [
	"Family Guy", "Rick and Morty", "Ripper Street", "The Simpsons", "Criminal Minds", "Doctor Who", "Sherlock",
	"Marcella", "Daredevil", "Naruto", "Jessica Jones", "The Flash", "Arrow", "Batman Beyond", "Doug", "Hey Arnold",
	"Luke Cage", "Murdoch Mysteries", "Republic of Doyle", "Santa Clarita Diet", "Rugrats",
	"Futurama"
	],
	currWord: "",
	currWordArr: [],
	guessArr: [],
	guessStr: "",
	spaces: 0,
	guessCount: 6,
	wins: 0,
	losses: 0,
	hangCount: 0,
	gameOver: false,
	imageArr: [
	"<img src=\"assets/images/Hangman-0.png\" alt=\"Hangman-0\">",
	"<img src=\"assets/images/Hangman-1.png\" alt=\"Hangman-1\">",
	"<img src=\"assets/images/Hangman-2.png\" alt=\"Hangman-2\">",
	"<img src=\"assets/images/Hangman-3.png\" alt=\"Hangman-3\">",
	"<img src=\"assets/images/Hangman-4.png\" alt=\"Hangman-4\">",
	"<img src=\"assets/images/Hangman-5.png\" alt=\"Hangman-5\">",
	"<img src=\"assets/images/Hangman-6.png\" alt=\"Hangman-6\">",  	
	],
	theGame: document.querySelector("#the-game"),
	correct: document.querySelector("#correct"),
	incorrect: document.querySelector("#incorrect"),
	cheer: document.querySelector("#cheer"),
	wahwah: document.querySelector("#wahwah"),
	gameScreen: document.querySelector('#gameScreen'),
	gameSpace: document.querySelector('#gameSpace'),
	winGame: document.querySelector("#win-game"),
	loseGame: document.querySelector("#lose-game"),
	guessSpace: document.querySelector('#guessSpace'),
	status: document.querySelector('#status'),
	statusBox: document.querySelector('#statusBox'),

	// random number function
	randomNum: function(max, min) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	// select random word from arr
	selectWord: function() {

		var num = this.randomNum(this.wordArr.length - 1, 0);
		this.currWord = this.wordArr[num].toLowerCase();
		this.currWordArr = this.currWord.split('');
		this.guessCount = 6;
		console.log(this.currWord + " index: " + num);

	},

	// need to check lenth of word and draw blanks
	writeHTML: function() {	

		var html = "<p>Guessed letters: ...</p>" +
		"<p>Guesses Remaining: 6</p>" +
		"<p>Wins: " + this.wins + "</p>" +
		"<p>Losses: " + this.losses + "</p>";

		this.guessSpace.innerHTML = html;

		for (var i = 0; i < this.currWord.length; i++) {
			var newSpan = document.createElement("span");
			newSpan.setAttribute("id", "pos" + i);

			if (this.currWord[i] === " ") {
				newSpan.setAttribute("class", "no-border");
				this.spaces ++;
			}
			this.gameSpace.appendChild(newSpan);
		}

	},

	// prints guessed letters to screen
	logGuess: function(val) {
		this.guessArr.push(val);

		var html = "<p>Guessed letters: <br>" + 
		this.guessArr.join(", ").toUpperCase() + "</p>" +
		"<p> Guesses Remaining: " + this.guessCount + "</p>" +
		"<p>Wins: " + this.wins + "</p>" +
		"<p>Losses: " + this.losses + "</p>";

		this.guessSpace.innerHTML = html;

	},

	// fill in the blank/s on correct guess
	goodGuess: function(val) {

		this.correct.currentTime = 0;
		this.correct.play();
		this.logGuess(val);

		for (var i = 0; i < this.currWordArr.length; i++) {
			if (val === this.currWordArr[i]) {
				document.querySelector('#pos' + i).innerHTML = val;
				this.guessStr += val;
			}
		}
		if (this.guessStr.length === this.currWord.length - this.spaces) {
			this.gameOver = true;
				// setTimeout(this.youWin, 1000);
				this.youWin();
			}
		},

	// detects bad guess and lowers guessCount var by one.
	badGuess: function(val) {

		this.incorrect.currentTime = 0;
		this.incorrect.play();
		this.guessCount --;
		this.logGuess(val);
		this.hangTheMan();

		// when guessCount reaches 0 calls youLose()
		if (this.guessCount === 0) {
			this.gameOver = true;
			setTimeout(this.youLose, 1000);
		}

	},

	// updates image based on # of wrong guesses
	hangTheMan: function() {

		this.hangCount ++;
		this.gameScreen.innerHTML = this.imageArr[this.hangCount];

	},


	// 'this' defaults to window/global below, persumably due to the function call being wrapped in the setTimeout() function

	// win scenario
	youWin: function() {

		var html = "<h1 class=\"text-center\">You Win!!</h1>";

		game.wins ++;
		game.cheer.currentTime = 0;
		game.cheer.play();
		game.theGame.style.display = "none";
		game.winGame.style.display = "block";
		game.status.innerHTML = html;
		game.statusBox.style.visibility = "visible";

		// resets the game after 3 seconds
		game.gameOver = false;
		setTimeout(game.reset, 3000);

	},

	// switches to lose screen when user runs out of guesses
	youLose: function() {

		var html = "<h1 class=\"text-center\">You Lose!!</h1>" +
		"<p>The answer was <span class=\"blue\">" + game.currWord + "</span>.";
		
		game.losses ++;
		game.wahwah.currentTime = 0;
		game.wahwah.play();
		game.theGame.style.display = "none";
		game.loseGame.style.display = "block";
		game.status.innerHTML = html;
		game.statusBox.style.visibility = "visible";

		// resets the game after 3 seconds
		game.gameOver = false;
		setTimeout(game.reset, 3000);
	},

	// reset the game values / html
	reset: function() {
		
		game.guessArr = [];
		game.guessStr = "";
		game.hangCount = 0;
		game.spaces = 0;
		game.gameScreen.innerHTML = "<img src=\"assets/images/Hangman-0.png\" alt=\"Hangman-0\">";
		game.statusBox.style.visibility = "hidden";
		game.theGame.style.display = "block";
		game.winGame.style.display = "none";
		game.loseGame.style.display = "none";
		game.gameSpace.innerHTML = "";

		// function calls to setup new game once everything is reset
		game.selectWord();
		game.writeHTML();
	}

};

// initial function calls to get the game rolling
game.selectWord();
game.writeHTML();

// onkey event
// currently does not work with mobile devices
document.onkeyup = function(event) {

	// checks if gameOver has flagged true before accepting key input
	if (game.gameOver === false) {
		var userGuess = event.key;
		var re = /^[a-z]/;

		// using RegEx to only accept lowercase letters
		if (re.test(userGuess)) {
			if (game.currWord.indexOf(userGuess) !== -1 && game.guessArr.indexOf(userGuess) === -1) {
				game.goodGuess(userGuess);
			} else if (game.currWord.indexOf(userGuess) === -1 && game.guessArr.indexOf(userGuess) === -1) {
				game.badGuess(userGuess);
			}
		}
	}	

};