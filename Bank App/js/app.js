
// JS BANK PROJECT

let session = new Session();
session = session.getSession();
if(session !== '') {
	window.location.href = 'bank.html'
}






//=======================[ LOGIN ]=======================//
let configLogin = {
	'username': {
		required: true,
		minlength: 2,
		maxlength: 30
	},
	'password': {
		required: true,
		minlength: 2,
		maxlength: 30
	}
};

let validatorLogin = new Validator(configLogin, '.loginForm');


document.querySelector('.loginForm').addEventListener('submit', e => {
	e.preventDefault();

	let username = document.querySelector('#login_username').value; 
	let password = document.querySelector('#login_password').value; 

	if(validatorLogin.validationPassed()) {
		let user = new User();
		user.username = username;
		user.password = password;
		user.login().then(result => {
		        if(!result) {       	
		        	alert('Pogresno ime ili lozinka!');
		        }
		    });

	} else {
		alert('Forma nije dobro popunjena!');
	}	

})






//=======================[ REGISTER ]=======================//

let configRegister = {
	'username': {
		required: true,
		minlength: 2,
		maxlength: 30
	},
	'password': {
		required: true,
		minlength: 2,
		maxlength: 30
	}
};

let validatorRegister = new Validator(configRegister, '.registerForm');

document.querySelector('.registerForm').addEventListener('submit', e => {
	e.preventDefault();

	let username = document.querySelector('#register_username').value; 
	let password = document.querySelector('#register_password').value; 

	if(validatorRegister.validationPassed()) {
		let user = new User();
		user.username = username;
		user.password = password;
		user.money = 50000;
		user.checkRegisteredUsers()
		    .then(result => {
		        if(result) {       	
		        	user.register()
		        }
		        else {
		        	alert('To korisnicko ime vec postoji!');
		        }
		    });
	} else {
		alert('Forma nije dobro popunjena!');
	}	

})


//================================================================//