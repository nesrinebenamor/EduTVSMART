var current_item = 1;
var total_item = 7;

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


window.onload = function() {
	if (window.localStorage.getItem('md5')) {
		$('#login').show();
	} else {
		$('#register').show();
	}
	
	if(sessionStorage.getItem("key")==null){
        navigation("down");
    }else {
        current_item=sessionStorage.getItem("key")-1;
        navigation("down");
    }

	
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
			
			goTo(current_item);
			
			break;
		case 10009: // RETURN button
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("Key code : " + e.keyCode);
			break;

		}
	});

};

function goTo(ci) {
	switch (ci) {
	case 1:
		parent.location.href = "art.html";

		break;

	case 2:
		parent.location.href = "Physics.html";

		break;
	case 3:
		parent.location.href = "Math.html";

		break;
	case 4:
		parent.location.href = "Biology.html";

		break;
	case 5:
		parent.location.href = "Chemistry.html";

		break;
	case 6:
		parent.location.href = "Languages.html";

		break;
	case 7:
		parent.location.href = "dragGeo.html";
		break;
	//case 8 : break;

	}
};

function open()
{
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("btn_8");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
};
function rockit() {
	player_name = $('#player').val();
	console.log("Key code : " + player_name);
	$("#result").html(
			'<div class="tabs">Hi <b>' + player_name + '</b>, Score for <b>'
					+ type + '</b> level is</div><span class="badge">' + score);

}

function navigation(direction) {
	$("#btn_" + current_item).removeClass("select_btn");
	if (direction == "down") {
		if (current_item == 1) {
			current_item = 7;

		}

		else
			current_item--;
	}
	if (direction == "up") {
		if (current_item == 7) {
			current_item = 1;

		} else
			current_item++;

	}
	$("#btn_" + current_item).addClass("select_btn");

};