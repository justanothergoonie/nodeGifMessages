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

  handleAddMessage = evt => {
    const mesg = evt.detail; // console.log(mesg);

    const mesgEl = document.createElement('p');
    mesgEl.textContent = mesg;
    this.messagesEl.appendChild(mesgEl);
  };
  handleAddGif = evt => {
    const gifs = evt.detail; // console.log(gifs);

    let gifsContainer = document.createElement('div');
    gifsContainer.setAttribute('class', 'gif-container');
    gifs.forEach(gif => {
      const defineGifSize = document.createElement('div');
      const gifEl = document.createElement('img');
      defineGifSize.setAttribute('class', 'gif-definer');
      gifEl.setAttribute('class', 'gif');
      gifEl.setAttribute('src', gif);
      defineGifSize.appendChild(gifEl);
      gifsContainer.appendChild(defineGifSize);
      this.messagesEl.appendChild(gifsContainer);
    });
  };
  handleSubmit = evt => {
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
