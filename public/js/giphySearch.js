// console.log(`Hello World from main.js!
// Change this message, and make sure it changes in the browser
// to verify that you're working in the right files.`);
// class SearchGiphy {
// 	constructor() {
// 		this.setupEventListeners();
// 	}
// 	setupEventListeners() {
// 		const buttonEl = document.querySelector('[name="search"]');
// 		buttonEl.addEventListener('click', this.handleSearch); // buttonEl.addEventListener('click', this.handleResults);
// 		const bodyEl = document.querySelector('body');
// 		bodyEl.addEventListener('got-results', this.handleResults);
// 		bodyEl.addEventListener('got-error', this.handleSearchError);
// 	}
// 	handleSearch = (event) => {
// 		// event.preventDefault();
// 		const queryEl = document.querySelector('[name="message"]');
// 		const queryTerm = queryEl.value;
// 		console.log('searching...', queryTerm);
// 		const api = new GiphyApi();
// 		if (queryTerm === '') {
// 			alert('You need to search for something');
// 		} else {
// 			api.search(queryTerm);
// 		}
// 	};
// 	handleResults(event) {
// 		const results = event.detail.data;
// 		console.log(results);
// 		this.messagesEl = document.querySelector('#messages');
// 		results.forEach((result) => {
// 			const gifSrc = result.images.original.url;
// 			console.log(gifSrc);
// 			let gif = document.createElement('img');
// 			gif.setAttribute('src', gifSrc);
// 			this.messagesEl.appendChild(gif);
// 		});
// 	}
// 	handleSearchError(error) {}
// }
// new SearchGiphy();
// //# sourceMappingURL=giphySearch.js.map
//# sourceMappingURL=giphySearch.js.map
