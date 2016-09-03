
$(document).ready(function(){

	var guessList = [];
	var guessCount = 0;
	var guessDiff = 0;
	var guessDiffList = [];
	var currentGuessDiff = 0;
	var previousGuessDiff = 0;
	var currentNum = 0;
	var beaten = false;

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$('.new').click(function(){
  		$('h2#feedback').text('Make your Guess!');
  		$('ul#guessList').children().remove();
  		$('span#count').text(0);
  		$('h2#warning').fadeOut();
  		beaten = newGame();
  	})

  	$('input#guessButton').on('click',function(event){
		event.preventDefault();
		$('h2#warning').fadeOut();
		if(beaten == true){
			$('h2#warning').fadeIn().text('You won this round! Click new game to try again.');
			$('input#userGuess').val('');
		} else {
			beaten = checkGuess();
		}
	});

  	newGame();

});

var newGame = function(){
	guessList = [];
	guessCount = 0;
	guessDiff = 0;
	guessDiffList = [];
	currentGuessDiff = 0;
	previousGuessDiff = 0;
	currentNum = numberGen();
	
	return false;
}

var checkGuess = function(){
	userGuess = parseInt($('input#userGuess').val());
	$('input#userGuess').val('');
	if(isNaN(userGuess)) {
		$('h2#warning').fadeIn().text('Please Enter a Valid Number');
	} else if (userGuess < 1 || userGuess > 100) {
		$('h2#warning').fadeIn().text('Please Enter a Number Between 1 and 100');
	} else {
		guessList.push(userGuess);
		guessCount++;
		$('span#count').text(guessCount);
		$('ul#guessList').append('<li>' + guessList[guessList.length -1] + '</li>');
		if(userGuess == currentNum){
			$('h2#feedback').text('You got it! Click New Game to Try Again');
			return true;
		} else if(guessList.length == 1) {
			feedbackGen(firstGuessFeedback(userGuess, currentNum, guessDiffList));
		} else {
			guessDiffList.push(guessDiffGen(userGuess, currentNum));
			currentGuessDiff = guessDiffList[guessDiffList.length - 1];
			previousGuessDiff = guessDiffList[guessDiffList.length - 2];
			if(userGuess == guessList[guessList.length - 2]){
				feedbackGen('Try a different number!')
			} else if(currentGuessDiff == previousGuessDiff){
				feedbackGen('You stayed the same!')
			} else if(currentGuessDiff > previousGuessDiff){
				feedbackGen('Getting colder!');
			} else {
				feedbackGen('Getting warmer!');
			}
		}
	}
}

var numberGen = function(){
	return Math.floor(Math.random() * (100-1)) + 1;
}

var feedbackGen = function(feedback){
	$('h2#feedback').text(feedback);
}

var firstGuessFeedback = function(userGuess, currentNum, guessDiffList){
	if (userGuess < currentNum && userGuess >= currentNum-10) {
		return 'You\'re on fire!'
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess > currentNum && userGuess <= currentNum+10){
		return 'You\'re on fire!';
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess < currentNum-10 && userGuess >= currentNum-25){
		return 'You\'re hot!';
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess > currentNum+10 && userGuess <= currentNum+25){
		return 'You\'re hot!';
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess < currentNum-25 && userGuess >= currentNum-50){
		return 'You\'re cold!';
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess > currentNum+25 && userGuess <= currentNum+50){
		return 'You\'re cold!';
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess < currentNum-50 && userGuess >= currentNum-75){
		return 'You\'re ice cold!';
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
	} else if(userGuess > currentNum+50 && userGuess <= currentNum+75){
		return 'You\'re ice cold!';
	} else {
		guessDiffList.push(guessDiffGen(userGuess, currentNum));
		return 'You\'re freezing!';
	}
}

var guessDiffGen = function(guess, num){
	return Math.abs(guess - num);
}
