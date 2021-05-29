class Main {
	constructor() {
		this.setUpListener();
		this.messagesEl = document.querySelector('#messages');
		this.noSynsArray = ['🤔', '❓', '🤷‍♂️', '🤷', '😕', '🤨', '😢', '😿'];
		this.chat = new ChatClient();
	}

	setUpListener() {
		var newMesgForm = document.querySelector('[name="new-message"]');
		newMesgForm.addEventListener('submit', this.handleSubmit);
		document.addEventListener('addMessage', this.handleAddMessage);
		document.addEventListener('addResults', this.handleAddResults);
	}

	handleAddMessage = (evt) => {
		const mesg = evt.detail;

		const messagePiece = document.createElement('div');
		messagePiece.setAttribute('class', 'message-piece');

		const mesgEl = document.createElement('p');
		mesgEl.setAttribute('class', 'message-to-guess blur');
		mesgEl.textContent = mesg;

		const giveUpButton = document.createElement('button');
		giveUpButton.addEventListener('click', () => {
			mesgEl.classList.remove('blur');
		});
		giveUpButton.setAttribute('class', 'surrender btn btn-danger');
		giveUpButton.innerHTML = 'Give Up';

		this.messagesEl.appendChild(messagePiece);
		messagePiece.appendChild(mesgEl);
		messagePiece.appendChild(giveUpButton);
	};

	handleAddResults = (evt) => {
		const results = evt.detail;
		// console.log(results);

		let gifsContainer = document.createElement('div');
		gifsContainer.setAttribute('class', 'gif-container');

		results.forEach((result, i) => {
			console.log(result);

			const gifEl = document.createElement('img');
			gifEl.setAttribute('class', 'gif');
			gifEl.setAttribute('src', result.gifUrl);

			const synEl = document.createElement('p');
			synEl.setAttribute('class', 'syn hidden');
			let syns = result.words;
			let randSyn = [];
			randSyn = syns[Math.floor(Math.random() * syns.length)];
			synEl.innerHTML = randSyn;
			if (randSyn === undefined) {
				let randEmoji =
					this.noSynsArray[
						Math.floor(Math.random() * this.noSynsArray.length)
					];
				synEl.innerHTML = randEmoji;
			} else {
				synEl.innerHTML = randSyn;
			}
			// console.log(randSyn);
			// syns.map((syn, i) => {
			// 	console.log(syn);
			// 	let randSyn = syn[Math.floor(Math.random() * syn.length)];
			//
			// });

			const defineGifSize = document.createElement('div');
			defineGifSize.setAttribute('class', 'gif-definer');
			defineGifSize.appendChild(gifEl);
			defineGifSize.appendChild(synEl);
			defineGifSize.addEventListener('mouseover', () => {
				gifEl.classList.add('blur');
				synEl.classList.remove('hidden');
			});
			defineGifSize.addEventListener('mouseout', () => {
				gifEl.classList.remove('blur');
				synEl.classList.add('hidden');
			});

			gifsContainer.appendChild(defineGifSize);
			this.messagesEl.appendChild(gifsContainer);
		});
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
//# sourceMappingURL=main.js.map
