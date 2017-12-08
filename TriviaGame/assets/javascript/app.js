var triviaQuestions = [{
	question: "What is Rick's favorite attraction in Anatomy Park?",
	answerList: ["The Body Coaster", "Disneyland", "Pirates of the Pancreas", "Humans"],
	answer: 2
},{
	question: "Who are Rick's best friends?",
	answerList: ["Steve Jobs & Bill Gates", "Birdperson & Squanchy", "Snoopy and Birdie", "Mark and Eduardo"],
	answer: 1
},{
	question: "Jerry attempts to eat which cereal brand?",
	answerList: ["Frosted Flakes", "Fruit Loops", "Morty Loops", "Eyeholes"],
	answer: 3
},{
	question: "Rick's favorite McDonald's sauce is?",
	answerList: ["BBQ", "Sweet and Sour", "Buffalo", "Szechuan"],
	answer: 3
},{
	question: "What vegetable does Rick become in an episode?",
	answerList: ["Avocado", "Pickle", "Corn", "Lettuce"],
	answer: 1
},{
	question: "What song does Rick and Morty play to save the world?",
	answerList: ["Halo", "Welcome to the Jungle", "Get Schwifty", "Baby"],
	answer: 2
},{
	question: "What arcade does Rick and Morty love?",
	answerList: ["Tron", "Disney", "Blips and Chitz", "Wall-E"],
	answer: 2
},{
	question: "What game does Morty play in the arcade?",
	answerList: ["Guns 2", "Die Hard", "Zombieland", "Roy"],
	answer: 3
},{
	question: "What species is created to serve a singular purpose?",
	answerList: ["Eyehole man", "Mr.Meeseeks", "Humans", "Farts"],
	answer: 1
},{
	question: "What powers Rick's spaceship battery?",
	answerList: ["Electricity", "Lithium", "Miniverse", "Solar Power"],
	answer: 2
},{
	question: "Who tries to disturb Morty in his own adventure?",
	answerList: ["R2-D2", "Mr.Jellybean", "C-3PO", "Astro Boy"],
	answer: 1
},{
	question: "What animals try to kill Rick and Morty?",
	answerList: ["Bears", "Sharks", "Tarzan", "Squirrels"],
	answer: 3
},{
	question: "What is Beth's imaginary world?",
	answerList: ["Dreamworks", "Industrial Light & Magic", "Disney", "Froopyland"],
	answer: 3
},{
	question: "Who is Morty's sister?",
	answerList: ["Maria", "Caroline", "Melanie", "Summer"],
	answer: 3
},{
	question: "What is Jerry's occupation?",
	answerList: ["Education", "Banker", "Doctor", "None of the above"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yassss, wubba lubba dub bub!",
	incorrect: "Nah bruh",
	endTime: "Faster",
	finished: "Coolio! Lets see waddup"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
