class ChatClient {
	SOCKET_URL = 'ws://localhost:8080';
	constructor() {
		console.log('new ChatClient');
		this.ws = new WebSocket(this.SOCKET_URL);

		this.ws.onopen = this.handleOpen;
		this.ws.onmessage = this.handleMessage;
		this.ws.onerror = this.handelError;
	}

	send = (message) => {
		this.ws.send(message);
	};

	handleOpen = (conn) => {
		console.log('connection open', conn);
	};

	sendNewMessage = (message) => {
		const evt = new CustomEvent('addMessage', { detail: message });
		document.dispatchEvent(evt);
	};

	handleMessage = (evt) => {
		const payload = JSON.parse(evt.data);
		console.log('received payload', payload);
		if (payload.clients != undefined) {
			//send event with client count
		}
		if (payload.message != undefined) {
			this.sendNewMessage(payload.message);
		} else if (payload.messages != undefined) {
			payload.messages.forEach((mesg) => this.sendNewMessage(mesg));
		}
	};

	handelError = (error) => {
		console.error('got an error', error);
	};
}
