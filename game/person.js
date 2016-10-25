window.onload = function() {

	//navigation("down");
	document.addEventListener('keydown', function(e) {

		switch (e.keyCode) {

		case TvKeyCode.KEY_LEFT: //LEFT arrow 	  	
			break;
		case TvKeyCode.KEY_UP:
		//	navigation("up");

		case TvKeyCode.KEY_RIGHT: //RIGHT arrow 		
			break;
		case TvKeyCode.KEY_DOWN:
			//navigation("down");
			/*TO DO 3 : NAVIGATION */
			break;
		case TvKeyCode.KEY_ENTER: //OK button
		//	goTo(current_item);
			break;
  	case 10009: //RETURN button
    		
    		parent.location="../Biology.html";
    		break;
		default:
			console.log("Key code : " + e.keyCode);
			break;

		}
	});
};


/*
function navigation(direction) {
	$("#btn_" + current_item).removeClass("select_btn");
	if (direction == "down") {
		if (current_item == 1) {
			current_item = 4;

		}

		else
			current_item--;
	}
	if (direction == "up") {
		if (current_item == 4) {
			current_item = 1;

		} else
			current_item++;

	}
	$("#btn_" + current_item).addClass("select_btn");

};
*/

$(document).ready(function(){

$(".QuestionPage").hide();
$(".GameOver").hide();

// INTIALIZE VARIABLES
var picked=[];
var count=0;
var right=0;
var wrong=0;
var counter;

// INTIALIZE CATEGORIES, QUESTIONS, AND ANSWERS
var categories={
	games:{
		Q1:{
			Question: "What was the first video game ever made?",
			Correct: "Tennis For Two",
			options: ["Tennis For Two","Pong","Spacewar","Donkey Kong"],
		},
		Q2:{
			Question: "Which instrument has not appeared in a Legend of Zelda game?",
			Correct: "Triangle",
			options: ["Triangle","Drums","Guitar","Ukelele"],
		},
		Q3:{
			Question:"Pac Man makes a hidden cameo in which popular movie?",
			Correct:"Tron",
			options:["Tron","The Wizard","Star Wars","The Avengers"],
		},
		Q4:{
			Question:"Who kidnaps Mario in 'Luigi's Mansion'?",
			Correct:"King Boo",
			options:["King Boo","Bowser","Angry Goombas","Big Boo"],
		},
		Q5:{
			Question:"Who is the Monitor of Installation 04 in the 'Halo' universe?",
			Correct:"343 Guilty Spark",
			options:["343 Guilty Spark","000 Tragic Solitude","The Knowing","Adjutant Reflex"],
		},
		Q6:{
			Question:"What was the codename for the Nintendo GameCube?",
			Correct:"Dolphin",
			options:["Dolphin","Revolution","Project Reality","Ultra Famicom"],
		},
		Q7:{
			Question:"In what game did the 'Konami Code' originate?",
			Correct:"Gradius",
			options:["Gradius","Contra","Super Mario Brothers","Metal Gear"],
		},
		Q8:{
			Question:"Sonic the Hedgehog originally had a human girlfriend. What was her name?",
			Correct:"Madonna",
			options:["Madonna","Rose","Bunny","Kate"],
		},
		Q9:{
			Question:"'E.T. - The Extra Terrestrial' for the Atari 2600 sold more units than which of the following games?",
			Correct:"Space Invaders",
			options:["Space Invaders","Pac-Man","Defender","None of These"],
		},
	},
	movies:{
		Q1:{
			Question: "What weapon does Chigurh use in 'No Country for Old Men'?",
			Correct: "Cow Thunker",
			options: ["Sawn-off Shotgun","Cow Thunker","Knife","Chainsaw"],
		},
		Q2:{
			Question: "What is Roy holding during his final scene in 'Bladerunner'",
			Correct: "A Dove",
			options: ["A Dove","Deckard's Hand","A Flower","A Pin"],
		},
		Q3:{
			Question:"What airline never crashed in the movie 'Rain Man'?",
			Correct:"Qantas",
			options:["Virgin Airlines","Qantas","Southwest","United"],
		},
		Q4:{
			Question:"What is the name of the horse in 'The Godfather'?",
			Correct:"Khartoum",
			options:["Khartoum","Gypsy","Clemenza","Cannoli"],
		},
		Q5:{
			Question:"When was the Russian film 'Battleship Potemkin' released?",
			Correct:"1925",
			options:["1925","1934","2001","1963"],
		},
		Q6:{
			Question:"What classic film was called production 9401 during filming?",
			Correct:"Psycho",
			options:["Psycho","Citizen Kane","The Maltese Falcon","Vertigo"],
		},
		Q7:{
			Question:"William Hurt won the best actor Oscar for what 1985 movie?",
			Correct:"The Kiss of the Spiderwoman",
			options:["Cat People","The Kiss of the Spiderwoman","Body Heat","Dark City"],
		},
	},
	miscellaneous:{
		Q1:{
			Question: "I am without hinges, key, or lid, yet golden treasure inside is hid. What am I?",
			Correct: "An Egg",
			options: ["A Skull","The Internet","An Egg","Treasure Chest"],
		},
		Q2:{
			Question: "What goes up but never comes down?",
			Correct: "Age",
			options: ["Age","Birds","Hot Air Balloon","A Tree"],
		},
		Q3:{
			Question:"In Greek mythology, which god was father to the muses?",
			Correct:"Zeus",
			options:["Zeus","Poseidon","Hades","Cronos"],
		},
		Q4:{
			Question:"The 'White Way of Delight' is the given name of a place in which book series?",
			Correct:"Anne of Green Gables",
			options:["Anne of Green Gables","Chronicles of Narnia","The Lord of the Rings","Harry Potter"],
		},
	},
}

var theCurrentQuestion={
	Question:"",
	Correct:"",
	options:[],
}

//CREATES THE TIMER OBJECT
var timer = {
	time:15,
	reset:function(){
	 	timer.time = 15;
	    $(".TimeLeft").html("15");
	},

	start: function(){
	    counter=setInterval(timer.count,1000);
	    counter2=setTimeout(timer.timeUp,15000);
	},

	stop: function(){
	    clearInterval(counter);
	    clearTimeout(counter2);
	},

	count: function(){
	    timer.time--;
	    $(".TimeLeft").html(timer.time);
	},

	timeUp: function(){
		wrong++;
		timer.stop();
		timer.reset();
		$(".StartPage").show();
		$(".QuestionPage").hide();
		$(".RightOrWrong").html("TIMES UP!");
		$(".Score").html("Right: "+right+"<br>Wrong: "+wrong);
		$(".StartButton").html("Next Question");
	},
}

//STARTS THE GAME
$(".StartButton").on("click", function(){
	getQuestion();
	$("body").css("background-image","url('../fond/person.jpg')");
	$(".StartPage").hide();})


	//SHUFFLES THE ANSWERS
	var shuffle= function(thing){
		thing.sort(function(){
			return 0.5 - Math.random()});}

//RANDOMLY SELECTS A CATEGORY AND QUESTION
var getQuestion=function(){
	timer.start();
	count++;
	var keys=Object.keys(categories);
	var randomCategory=categories[keys[keys.length*Math.random()<<0]];
	keys=Object.keys(randomCategory);
	var randomQuestion=randomCategory[keys[keys.length*Math.random()<<0]];
	for(var i=-1;i<picked.length;i++){
		if(randomQuestion.Question==picked[i]){
			var keys=Object.keys(categories);
			var randomCategory=categories[keys[keys.length*Math.random()<<0]];
			keys=Object.keys(randomCategory);
			var randomQuestion=randomCategory[keys[keys.length*Math.random()<<0]];
			i=-1;}}
	theCurrentQuestion=randomQuestion;
	picked.push(theCurrentQuestion.Question);
	printQuestions();}

//PRINTS QUESTION AND ANSWERS TO THE PAGE
var printQuestions=function(){
	$(".QuestionPage").show();
	var id="";
	shuffle(theCurrentQuestion.options);
	$(".Question").html(theCurrentQuestion.Question);
	for(var i=0;i<theCurrentQuestion.options.length;i++){
		$(".choice"+i).html(theCurrentQuestion.options[i]);
		printAnswer(i,theCurrentQuestion.options[i]);}}
var printAnswer=function(i,option){
	$(".choice"+i).unbind('click');
	$(".choice"+i).on("click",function(){
		checkAnswer(option);
		timer.stop();})}

//CHECKS FOR THE CORRECT ANSWER AND RETURNS A MESSAGE
var checkAnswer=function(x){
	if(x==theCurrentQuestion.Correct && count<10){
		right++;
		timer.reset();
		$(".StartPage").show();
		$(".QuestionPage").hide();
		$(".RightOrWrong").html("CORRECT!");
		$(".StartButton").html("Next Question");
		$(".Score").html("Right: "+right+"<br>Wrong: "+wrong);
		$("body").css("background-image","url('../fond/personCorrect.jpg')");}
	else if(x!=theCurrentQuestion.Correct && count<10){
		wrong++;
		timer.reset();
		$(".StartPage").show();
		$(".QuestionPage").hide();
		$(".RightOrWrong").html("WRONG!");
		$(".StartButton").html("Next Question");
		$(".Score").html("Right: "+right+"<br>Wrong: "+wrong);}
	else if(x==theCurrentQuestion.Correct && count==10){
		timer.stop();
		right++;
		$(".QuestionPage").hide();
		$(".GameOver").show();
		$(".Score").html("Right: "+right+"<br>Wrong: "+wrong);}
	else if(x!=theCurrentQuestion.Correct && count==10){
		timer.stop();
		right++;
		$(".QuestionPage").hide();
		$(".GameOver").show();
		$(".Score").html("Right: "+right+"<br>Wrong: "+wrong);}}

//RESETS THE GAME
$(".ResetGame").on("click", function(){
	picked=[];
	right=0;
	wrong=0;
	count=0;
	$(".GameOver").hide();
	getQuestion();});
});