// was receiving null errors on querySelector, so put everything inside a function that ensures
// that the page is loaded before executing js.
document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  var game = {

  	// wordArr: ["dog", "cat", "mouse", "giraffe", "horse", "wolf"],
  	wordArr: ["doooog"],
  	currWord: "",
  	currWordArr: [],
  	guessArr: [],
  	guessCount: 0,
  	gameSpace: document.querySelector('#gameSpace'),
  	// select random word from arr
  	selectWord: function(length) {
  		var num = Math.floor(Math.random() * (length - 0) + 0);
  		this.currWord = this.wordArr[num];
  		this.currWordArr = this.currWord.split('');
  		this.guessCount = 0;
  	},
  	// need to check lenth of word and draw blanks
  	writeHTML: function() {	
			var html = "";
			for (var i = 0; i < this.currWord.length; i++) {
				html += "<span id=\"pos" + i + "\"></span>";
			}
			this.gameSpace.innerHTML = html;
		},
		// fill in the blank/s on correct guess
		goodGuess: function(index) {
			document.querySelector('#pos' + index).innerHTML = this.currWord.charAt(index);
		},
		// word is complete: can check at the end of goodGuess if guessArr.join === word
		youWin: function() {
			
		},
		// local variable that iterates for each miss
		hangTheMan: function() {
			
		}

	};

	// onkey event
	document.onkeyup = function(event) {
		var userGuess = event.key;
		console.log(userGuess);
		var re = /^[a-z]/;
		if (re.test(userGuess)) {
			if (game.currWord.indexOf(userGuess) !== -1 && game.guessArr.indexOf(userGuess) === -1) {
				game.goodGuess(game.currWord.indexOf(userGuess));
				
			}
		}
	};

	game.selectWord(game.wordArr.length);
	game.writeHTML();

});
