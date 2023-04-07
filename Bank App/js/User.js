class User {
	username = '';
	toUsername = '';
	password = '';
	money = '';
	api = 'https://642acfce00dfa3b5474fc5c7.mockapi.io';

	checkMoneyUser() {
		let session = new Session();
		session = session.getSession();

		return fetch(this.api + '/users/' + session)
		.then(response => response.json())
		.then(data => {
			return data.money;
		});		
	}


	checkMoneyDBUserID() {
		return fetch(this.api + '/users')
		.then(response => response.json())
		.then(data => {
			for(let db_user of data) {
				if(db_user.username === this.toUsername) {
					return db_user.id
				} 
			}
			return false;
		})
	}

	checkMoneyDBUserMoney() {
		return fetch(this.api + '/users')
		.then(response => response.json())
		.then(data => {
			for(let db_user of data) {
				if(db_user.username === this.toUsername) {
					return db_user.money
				} 
			}
		})
	}	

	transfer() {

		this.checkMoneyDBUserID().then(r => {
			if(r !== false) {
				// OBRADJUJE ONOG USERA KOJI SALJE NOVAC
				let session = new Session();
				session = session.getSession();		
				this.checkMoneyUser().then(currentMoney => {
					if(parseInt(this.money) <= parseInt(currentMoney)) {
						let newMoney = parseInt(currentMoney) - parseInt(this.money);
						let data = {
							money: newMoney
						};
						data = JSON.stringify(data);

						fetch(this.api + '/users/' + session, {
							method: "PUT",
							headers: {'Content-Type' : 'application/json'},
							body: data
						});

						//  OBRADJUJE ONOG KOJI PRIMA NOVAC

						this.checkMoneyDBUserID().then(id => {
							this.checkMoneyDBUserMoney().then(currentMoney => {
								let newMoney = parseInt(currentMoney) + parseInt(this.money);
								let data = {
									money: newMoney
								};
								data = JSON.stringify(data);

								fetch(this.api + '/users/' + id, {
									method: "PUT",
									headers: {'Content-Type' : 'application/json'},
									body: data
								})
								.then(response => response.json())
								.then(data => {
									this.setInfo()
									alert(`Korisnik ${this.toUsername} je uspesno primio ${this.money}$`);
								})	
							})
						})


					} else {
						alert('Vi nemate toliko novaca!');
						return;
					}
				})
			} else {
				alert('Ovo ime nije pronadjeno u nasoj bazi!');
				return;
			}
		})





	}


	withdraw() {
		let session = new Session();
		session = session.getSession();
		this.checkMoneyUser().then(curentMoney => {
			let money1 = parseInt(curentMoney);
			let money2 = parseInt(this.money)
			let data = {
				money: money1 - money2
			};
			data = JSON.stringify(data);

			if(money2 > money1) {
				alert('Nemate toliko novaca!');
				return;
			}

			fetch(this.api + '/users/' + session, {
				method: 'PUT',
				headers: {'Content-Type' : 'application/json'},
				body: data
			})
			.then(response => response.json())
			.then(data => {
				this.setInfo();
				alert(`Podigao si ${money2}$`);		
				document.querySelector('#withdrawInput').value = '';	
			})
		})
	}

	deposit() {
		let session = new Session();
		session = session.getSession();
		this.checkMoneyUser().then(curentMoney => {
			let money1 = parseInt(curentMoney);
			let money2 = parseInt(this.money)

			let data = {
				money: money1 + money2
			};

			data = JSON.stringify(data);

			fetch(this.api + '/users/' + session, {
				method: 'PUT',
				headers: {'Content-Type' : 'application/json'},
				body: data
			})
			.then(response => response.json())
			.then(data => {
				this.setInfo();
				alert(`Ostavio si ${money2}$`);	
				document.querySelector('#depositInput').value = '';		
			})
		})
	}

	logout() {
		let session = new Session();
		session.destroySession();	
		window.location.href = '/';
	}

	setInfo() {
		let session = new Session();
		session = session.getSession();

		fetch(this.api + '/users/' + session)
		.then(response => response.json())
		.then(data => {
			document.querySelector('#infoUsername').innerText = data.username;
			document.querySelector('#infoMoney').innerText = data.money;
		});
	}

	login() {
		return fetch(this.api + '/users')
		.then(response => response.json())
		.then(data => {
			for(let db_user of data) {
				if(db_user.username === this.username && db_user.password === this.password) {
					let session = new Session();
					session.user_id = db_user.id
					session.startSession();
				    window.location.href = 'bank.html';	
				    return true;				
				}
			}
			return false;
		});
	}


	register() {
		let data = {
			username: this.username,
			password: this.password,
			money: this.money
		};
		data = JSON.stringify(data);

		fetch(this.api + '/users', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: data
		})
		.then(response => response.json())
		.then(data => {
			let session = new Session();
			session.user_id = data.id
			session.startSession();
		    window.location.href = 'bank.html';				
		})
	}

	checkRegisteredUsers() {
		return fetch(this.api + '/users')
		.then(response => response.json())
		.then(data => {
			for(let db_user of data) {
				let db_username = db_user.username.toString();
				let username = this.username.toString();
				if(db_username === username) {
					return false;
				}
			}		
			return true;
		})


	}
}