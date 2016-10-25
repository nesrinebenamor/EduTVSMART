var score=0;flag=false;
var src=['+','-','*','/','+','-','*','*','+','-'];
var i,player_name;
$(document).ready(function(){
    if(window.localStorage.getItem('md5'))
        {$('#login').show();}
    else
        {$('#register').show();}
        
    $('.hometab, header').click(function(){
        homesweethome();
    });
    $('.answer').click(function(){
								if (!flag){
        $('.answer').css({'background':'url(cssMathTest/wrong.png) no-repeat right center #F0A74F'});
            $('.right').css({'background':'url(cssMathTest/right.png) no-repeat right center #F0A74F'});
        if ($(this).hasClass('right')){
            score++;
            
        }
		flag=true;
								}
    });
});
function rockit(type){
            player_name=$('#player').val();
            i=5;
            $('#homepage').hide();
            $('#question').slideDown();
           fillit(type);
           itseasy=setInterval(function(){--i; fillit(type)},5000);
   }
function fillit(type)
{
	flag=false;
    $('.answer').css({'background':'#F0A74F'});
    $('.right').removeClass('right');
    opr1=Math.floor((Math.random())*10);
    opr2=Math.floor((Math.random())*10);
    opr3=Math.floor((Math.random())*10);
    opr4=Math.floor((Math.random())*10);
    while(!opr2){opr2=Math.floor((Math.random())*10);}
    while(!opr3){opr3=Math.floor((Math.random())*10);}
    while(!opr4){opr4=Math.floor((Math.random())*10);}
    oprfalse=Math.floor((Math.random())*10);
    while(opr1==oprfalse){oprfalse=Math.floor((Math.random())*10);}
    oprind=Math.floor((Math.random())*10);
    oprind1=Math.floor((Math.random())*10);
    oprind2=Math.floor((Math.random())*10);
    if (type=="easy"){
        formula=opr1+src[oprind]+opr2;
        ambiguity=oprfalse+src[oprind]+opr2;
        }
    else if (type=="normal")
    {
        formula=opr1+src[oprind]+opr2+src[oprind1]+opr3;
        ambiguity=oprfalse+src[oprind]+opr2+src[oprind1]+opr3;
    }
    else {
        formula=opr1+src[oprind]+opr2+src[oprind1]+opr3+src[oprind2]+opr4;
        ambiguity=oprfalse+src[oprind]+opr2+src[oprind1]+opr3+src[oprind2]+opr4;
    }
    answer=eval(formula);
    fraud=eval(ambiguity);
    $("#problem").html("What is "+formula+" ?");
    if(answer%2){$("#opt1").html(answer);$("#opt1").addClass('right');$("#opt2").html(fraud);}else{$("#opt1").html(fraud);$("#opt2").html(answer);$("#opt2").addClass('right');}
    
    if (i==0){resulttime(type);}
}

function resulttime(type){
    clearInterval(itseasy);
    $("#result").html('<div class="tabs">Hi <b>'+player_name+'</b>, Score for <b>'+type+'</b> level is</div><span class="badge">'+score+'</span><img src="img/result.gif"/>');
    $('[data-role="page"]').hide();
    $('#result').slideDown();
    score=0;
}
function homesweethome(){
clearInterval(itseasy);score=0;
$('[data-role="page"]').hide();
$('#homepage').slideDown();
}


