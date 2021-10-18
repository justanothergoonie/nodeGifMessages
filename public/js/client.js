class ChatClient {
	SOCKET_URL = 'ws://guarded-garden-71841.herokuapp.com/';

	constructor() {
		console.log('new ChatClient');
		this.ws = new WebSocket(this.SOCKET_URL);
		this.ws.onopen = this.handleOpen; // this.ws.onmessage = this.handleMessage;

		this.ws.onmessage = this.handleGif;
		this.ws.onerror = this.handelError;
	}

	send = (message) => {
		this.ws.send(message);
	};
	handleOpen = (conn) => {
		console.log('connection open', conn);
	};
	sendNewMessage = (message) => {
		const evt = new CustomEvent('addMessage', {
			detail: message,
		});
		document.dispatchEvent(evt);
	};
	sendResults = (results) => {
		const evt = new CustomEvent('addResults', {
			detail: results,
		});
		document.dispatchEvent(evt);
	};
	handleGif = (evt) => {
		const payload = JSON.parse(evt.data);
		console.log('received gif payload', payload);

		if (payload.clients != undefined) {
			//send event with client count
		}

		if (payload.results != undefined) {
			this.sendResults(payload.results);
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
//# sourceMappingURL=client.js.map
