const express = require('express');
// const Styles = require('./public/scss/main.scss');
const WebSocket = require('ws');
const GiphyApi = require('./server/giphy.js');
const WordsApi = require('./server/words.js');
const PORT = process.env.PORT || 3000;

const appServer = express();
appServer.use(express.json());
appServer.use(express.static('public'));

const wsServer = new WebSocket.Server({ port: PORT });
appServer.listen(PORT);

let MESSAGES = [];
let FULL_RESULTS = [];

wsServer.on('connection', (ws) => {
	console.log('new connection');

	ws.on('message', async (message) => {
		// @ts-ignore
		console.log('incoming message:', message);
		// @ts-ignore
		MESSAGES.push(message);

		const queryTerms = message;
		let giphyResults;
		let wordsResults;
		let currentResults;
		// let wordSynonyms;
		const gifyApi = new GiphyApi();
		const wordAPi = new WordsApi();
		if (queryTerms === '') {
			alert('You need to search for something');
		} else {
			giphyResults = await gifyApi.searchMultiple(queryTerms);

			wordsResults = await wordAPi.searchMultiple(queryTerms, 'synonyms');
			currentResults = giphyResults.map((result, i) => {
				let randUrl = result[Math.floor(Math.random() * result.length)];
				let randSyn = wordsResults[i];
				return {
					gifUrl: randUrl.images.original.url,
					words: randSyn.slice(0, 3),
				};
			});

			FULL_RESULTS.push(currentResults);
		}

		// @ts-ignore
		wsServer.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				// if (client !== ws)
				client.send(
					JSON.stringify({
						message: message,
						clients: wsServer.clients.size,
						results: currentResults,
					})
				);
			}
		});
	});
	//think what we want to be sent when new people join
	ws.send(
		JSON.stringify({
			messages: MESSAGES,
			clients: wsServer.clients.size,
			results: FULL_RESULTS,
		})
	);
});

appServer.get('/', (req, res) => {
	res.sendFile('public/index.html');
});
