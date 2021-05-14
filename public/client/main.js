class Main {
	constructor() {
		this.setUpListener();

		this.messagesEl = document.querySelector('#messages');
		this.chat = new ChatClient();
	}
	setUpListener() {
		var newMesgForm = document.querySelector('[name="new-message"]');
		newMesgForm.addEventListener('submit', this.handleSubmit);

		document.addEventListener('addMessage', this.handleAddMessage);

		document.addEventListener('addGif', this.handleAddGif);
	}

	handleAddMessage = (evt) => {
		const mesg = evt.detail;
		console.log(mesg);
		const mesgEl = document.createElement('p');
		mesgEl.textContent = mesg;
		this.messagesEl.appendChild(mesgEl);
	};
	handleAddGif = (evt) => {
		const gif = evt.detail;
		console.log(gif);
	};
	handleSubmit = (evt) => {
		evt.preventDefault();
		var form = evt.currentTarget;
		var input = form.querySelector('input[name="message"]');
		var newMesg = input.value;
		if (newMesg != '') {
			this.chat.send(newMesg);
		}

		input.value = '';
	};
}

new Main();