let session = new Session();
session = session.getSession();
if(session !== '') {
	let user = new User();
	user.setInfo();
} else {
	window.location.href = '/'
}


//=======================[ LOGOUT ]=======================//


document.querySelector('#logout').addEventListener('click', e => {
	e.preventDefault();

	let user = new User();
	user.logout();
});


//=======================[ DEPOSIT , WITHDRAW, TRANSFER ]=======================//


document.querySelector('#depositForm').addEventListener('submit', e => {
	e.preventDefault();
	let money = document.querySelector('#depositInput').value;
	let user = new User();
	user.money = money;
	user.deposit();
});

document.querySelector('#withdrawForm').addEventListener('submit', e => {
	e.preventDefault();
	let money = document.querySelector('#withdrawInput').value;
	let user = new User();
	user.money = money;
	user.withdraw();
});

document.querySelector('#transferForm').addEventListener('submit', e => {
	e.preventDefault();
	let money = document.querySelector('#transferInputMoney').value;
	let username = document.querySelector('#transferInputUsername').value;
	let user = new User();
	user.money = money;
	user.toUsername = username;
	user.transfer();
});


//=======================[ POP UPOVI ]=======================//


document.querySelector('#depositBtn').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.deposit-popup').style.display = 'block';
});

document.querySelector('#closeDeposit-popup').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.deposit-popup').style.display = 'none';
});


document.querySelector('#withdrawBtn').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.withdraw-popup').style.display = 'block';
});

document.querySelector('#closeWithdraw-popup').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.withdraw-popup').style.display = 'none';
});

document.querySelector('#transferBtn').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.transfer-popup').style.display = 'block';
});

document.querySelector('#closeTransfer-popup').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.transfer-popup').style.display = 'none';
});


//=======================================================================================//