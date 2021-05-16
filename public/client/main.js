class Main {
	constructor() {
		this.setUpListener();

		this.messagesEl = document.querySelector('#messages');
		this.chat = new ChatClient();
		this.gifsContainer = document.createElement('div');
		this.gifsContainer.setAttribute('class', 'gif-container');
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
		const gifs = evt.detail;
		console.log(gifs);
		// function setAtributes()
		gifs.forEach((gif) => {
			const defineGifSize = document.createElement('div');
			const gifEl = document.createElement('img');

			defineGifSize.setAttribute('class', 'gif-definer');
			gifEl.setAttribute('class', 'gif');
			gifEl.setAttribute('src', gif);

			defineGifSize.appendChild(gifEl);
			this.gifsContainer.appendChild(defineGifSize);
		});
		this.messagesEl.appendChild(this.gifsContainer);
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
