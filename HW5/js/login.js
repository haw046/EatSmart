/*******************Custom Login ******************/
$('.signUpButton').on('click', function onClickSignUp() {
	var signUpText = document.getElementById("signInMessage");
	var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
	ref.createUser({
	  email    : $("#usermail")[0].value,
	  password : $("#password")[0].value
	}, function(error, userData) {
	  if (error) {
	    signUpText.innerHTML = error+"<span style='color: red'>&#10005;</span>";
	  } else {
	    signUpText.innerHTML = "Sign in successful! <span style='color: #4caf50'>&#10004;</span><br> Please Sign In !!!";
	    $("#usermail")[0].value = "";
	    $("#password")[0].value = "";
	  }
	});
	var buttons = document.getElementsByClassName('buttons')[0]; 
	buttons.style.position = 'relative'; 
	$(buttons).animate({top: '65px'}, 'slow', function(){
		signUpText.style.display = "block";
		buttons.style.top = 0; 
	});
}); 

$(window).load(function() { 
	$(document.body).animate({opacity: 1}, 750); 
});

$('.loginButton').on('click',function onClickLogin(){ 
	var signUpText = document.getElementById("signInMessage");
	var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
	ref.authWithPassword({
	  email    : $("#usermail")[0].value,
	  password : $("#password")[0].value
	}, function(error, authData) {
		if (error) {
		    signUpText.innerHTML = error+"<span style='color: red'>&#10005;</span>";
		} else {
		    $(document.body).animate({opacity: 0}, 750, function(){window.location.href='welcome.html'});
		}
	});
	var buttons = document.getElementsByClassName('buttons')[0]; 
	buttons.style.position = 'relative'; 
	$(buttons).animate({top: '65px'}, 'slow', function(){
		signUpText.style.display = "block";
		buttons.style.top = 0; 
	}); 
}); 