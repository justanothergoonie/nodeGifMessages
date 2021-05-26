class ChatClient {
  SOCKET_URL = 'ws://localhost:8080';

  constructor() {
    console.log('new ChatClient');
    this.ws = new WebSocket(this.SOCKET_URL);
    this.ws.onopen = this.handleOpen; // this.ws.onmessage = this.handleMessage;

    this.ws.onmessage = this.handleGif;
    this.ws.onerror = this.handelError;
  }

  send = message => {
    this.ws.send(message);
  };
  handleOpen = conn => {
    console.log('connection open', conn);
  };
  sendNewMessage = message => {
    const evt = new CustomEvent('addMessage', {
      detail: message
    });
    document.dispatchEvent(evt);
  };
  sendNewGif = gifUrl => {
    const evt = new CustomEvent('addGif', {
      detail: gifUrl
    });
    document.dispatchEvent(evt);
  };
  handleGif = evt => {
    const payload = JSON.parse(evt.data);
    console.log('received gif payload', payload);

    if (payload.clients != undefined) {//send event with client count
    }

    if (payload.gifUrl != undefined) {
      this.sendNewGif(payload.gifUrl);
    } else if (payload.gifUrls != undefined) {
      payload.gifUrls.forEach(gif => this.sendNewGif(gif));
    }

    if (payload.message != undefined) {
      this.sendNewMessage(payload.message);
    } else if (payload.messages != undefined) {
      payload.messages.forEach(mesg => this.sendNewMessage(mesg));
    }
  }; // handleMessage = (evt) => {
  // 	const payload = JSON.parse(evt.data);
  // 	console.log('received payload', payload);
  // 	if (payload.clients != undefined) {
  // 		//send event with client count
  // 	}
  // };

  handelError = error => {
    console.error('got an error', error);
  };
}
//# sourceMappingURL=client.js.map
