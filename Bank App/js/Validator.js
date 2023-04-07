class Validator {
	constructor(config, formID) {
		this.formID = formID;
		this.config = config;
		this.errors = {};
		this.generateErrorObject();
		this.inputListener();	
	}

	generateErrorObject() {
		Object.keys(this.config).forEach(key => {
			this.errors[key] = ['Polje je prazno'];
		});
	}

	inputListener() {
		Object.keys(this.config).forEach(key => {
			document.querySelector(`${this.formID} input[name="${key}"]`).addEventListener('input', e => {
				let currentInput = e.target;
				let inputValue = currentInput.value;
				let inputName = currentInput.getAttribute('name');
				this.errors[inputName] = [];
				if(this.config[inputName].required) {
					if(inputValue === '') {
						this.errors[inputName].push('ERROR');
					}
				}

				if(inputValue.length < this.config[inputName].minlength || inputValue.length > this.config[inputName].maxlength) {
					this.errors[inputName].push('ERROR');
				}
			});
		}); 
	}

	validationPassed() {
		for(let key of Object.keys(this.errors)) {
			if(this.errors[key].length > 0) {
				return false;
			}
		}
		return true;
	}
}