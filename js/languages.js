var current_item = 1;
var total_item = 3;

var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

window.onload = function() {

	navigation("down");
	document.addEventListener('keydown', function(e) {

		switch (e.keyCode) {

		case TvKeyCode.KEY_LEFT: //LEFT arrow 	  	

			break;
		case TvKeyCode.KEY_UP:
			navigation("up");

		case TvKeyCode.KEY_RIGHT: //RIGHT arrow 		
			break;
		case TvKeyCode.KEY_DOWN:
			navigation("down");
			/*TO DO 3 : NAVIGATION */
			break;
		case TvKeyCode.KEY_ENTER: //OK button
			goTo(current_item);
			break;
  	case 10009: //RETURN button
    		parent.location="index.html";
    		break;
		default:
			console.log("Key code : " + e.keyCode);
			break;

		}
	});

};

function goTo( ci)
{
	switch (ci) {
	case 1:parent.location.href="./game/verbal.html";
		break;
	case 2:parent.location.href="./game/signs.html";
		break;
	case 3:parent.location.href="./game/programming.html";
	break;
	}
};

function navigation(direction) {
	$("#btn_" + current_item).removeClass("select_btn");
	if (direction == "down") {
		if (current_item == 1) {
			current_item = 3;

		}

		else
			current_item--;
	}
	if (direction == "up") {
		if (current_item == 3) {
			current_item = 1;

		} else
			current_item++;

	}
	$("#btn_" + current_item).addClass("select_btn");

};