var current_item = 0;
var total_item = 4;

var backEventListener = null;

var  player_name,modal,btn;
var $i=0;

var register = function() {
	if (backEventListener !== null) {
		document.removeEventListener('tizenhwkey', backEventListener);
		backEventListener = null;
		window.tizen.application.getCurrentApplication().exit();
	}
}




function navigation(direction) {
	
	
	
	$("#btn_" + current_item).removeClass("select_btn");
	if (direction == "down") {
		if (current_item == 0) {
			current_item = 4;

		}

		else
			current_item--;
	}
	if (direction == "up") {
		if (current_item == 4) {
			current_item = 0;

		} else
			current_item++;

	}
	$("#btn_" + current_item).addClass("select_btn");
	
	
	

};


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
			Question: "Which style of dance do dancers wear shoes with metal plates on the heels and toes?",
			Correct: "Tap",
			options: ["Line dancing","Ballroom dancing","Ballet","Tap"],
		},
		Q2:{
			Question: " What are the health benefits of dance?",
			Correct: "All of the above",
			options: ["Increases flexibility",
			          "Burns calories"
			          ,"Increases muscle tone"
			          ," All of the above"],
		},
		Q3:{
			Question:"In ballet, what kind of step is a pirouette?",
			Correct:"A turn",
			options:["A jump","A leap","A turn","A kick"],
		},
		Q4:{
			Question:"The Electric Slide is associated with what dance form?",
			Correct:"Line dancing",
			options:["Line dancing","Hip hop","Jazz","Ballroom"],
		},
		Q5:{
			Question:"Who composed the music for the famous ballet Swan Lake?",
			Correct:"Tchaikovsky",
			options:["Beethoven","Mozart","Stravinsky","Tchaikovsky"],
		},
		Q6:{
			Question:"A toprock is performed in which style of dancing?",
			Correct:"Breakdancing",
			options:["Breakdancing","Tap","Belly dancing","Ballroom"],
		},
		Q7:{
			Question:"During what year was the movie Fame released?",
			Correct:"1980",
			options:["1970","1980","1990","2000"],
		},
		Q8:{
			Question:"Martha Graham is considered a pioneer of which style of dance?",
			Correct:"Modern",
			options:["Jazz","Modern","Ballet","Tap"],

		},
		Q9:{
			Question:"Where is Leonardo da Vinci's The Last Supper located?",
			Correct:"Milan",
			options:["Rome","Milan","Florence","Venice"],
		},
	},
	movies:{
		Q1:{
			Question: "What art movement is Jackson Pollock’s No. 5 a prime example of?",
			Correct: "abstract expressionism",
			options: ["abstract expressionism","pop art","surrealism","impression"],
		},
		Q2:{
			Question: "Which of the following paintings is by the Russian-French artist Marc Chagall in 1943:",
			Correct: "The Juggler",
			options: ["The Last Supper","The Cellist","Woman with Drawers","The Juggler"],
		},
		Q3:{
			Question:"Edgar Degas, who painted The Woman Ironing in 1869 and Woman Drying Herself in 1890, is famous for what style of painting?",
			Correct:"Impressionism",
			options:["Cubism","Futurism","Surrealism","Impressionism"],
		},
		Q4:{
			Question:"When was Leonardo Da Vinci born?",
			Correct:"1452",
			options:["1512","1600","1452","1390"],
		},
		Q5:{
			Question:"Which Salvador Dali painting shows a melting watch?",
			Correct:"The Persistence of Memory (1931)",
			options:["Girl at the Window (1925)","The Persistence of Memory (1931)","Soft Construction with Boiled Beans (1936)","The Burning Giraffe (1936)"],
		},
		Q6:{
			Question:"Which Nuremberg artist was famous for his paintings of hares?",
			Correct:"Albrecht Dürer",
			options:["Hans Arp","Albrecht Dürer","Max Beckmann","Otto Dix"],
		},
		Q7:{
			Question:"Francis Bacon started painting in a cubist art style. What movement did he later turn to?",
			Correct:"Futurism",
			options:["Surrealism","Impressionism","Romantic","Futurism"],
		},
	},
	miscellaneous:{
		Q1:{
			Question: "The Romantic painter of The Haywain John Constable grew up in Britain in which Vale?",
			Correct: "Needham",
			options: ["Feedham","Needham","Dedham","Liveham"],
		},
		Q2:{
			Question: "Which great artist painted Mona Lisa in 1503?",
			Correct: "Leonardo Da Vinci",
			options: ["Marc Chagall","Salvador Dali","Albrecht Dürer","Leonardo Da Vinci"],
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
	$("body").css("background-image","url('../fond/music.jpg')");
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
		printAnswer(i,theCurrentQuestion.options[i]);}
	}
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
		$("body").css("background-image","url('../fond/music.jpg')");}
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


navigation("down");
document.addEventListener('keydown', function(e) {

	switch (e.keyCode) {

	case TvKeyCode.KEY_LEFT: // LEFT arrow

		break;
	case TvKeyCode.KEY_UP:
		navigation("up");

	case TvKeyCode.KEY_RIGHT: // RIGHT arrow
		break;
	case TvKeyCode.KEY_DOWN:
		navigation("down");
	
		break;
	case TvKeyCode.KEY_ENTER: // OK button
		{		
		if(current_item!=4){
		console.log("current : " + current_item);
		checkAnswer(theCurrentQuestion.options[current_item]);
		timer.stop();}
		else
			{
			getQuestion();
			$("body").css("background-image","url('../fond/music.jpg')");
			$(".StartPage").hide();
			
			}
		}
		
		
		break;
	case 10009: // RETURN button

		parent.location="../art.html";
		break;
	default:
		console.log("Key code : " + e.keyCode);
		break;

	}
});

}
);