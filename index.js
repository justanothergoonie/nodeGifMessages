const express = require('express');
const WebSocket = require('ws');
const GiphyApi = require('./server/giphy.js');

const appServer = express();
appServer.use(express.json());
appServer.use(express.static('public'));

const wsServer = new WebSocket.Server({ port: 8080 });
appServer.listen(3000);

let MESSAGES = [];
let URLS = [];

wsServer.on('connection', (ws) => {
	console.log('new connection');

	ws.on('message', async (message) => {
		// @ts-ignore
		console.log('incoming message:', message);
		// @ts-ignore
		MESSAGES.push(message);

		const queryTerms = message;
		let results;
		let urls;
		const api = new GiphyApi();
		if (queryTerms === '') {
			alert('You need to search for something');
		} else {
			results = await api.searchMultiple(queryTerms);

			urls = results.map((result, i) => {
				return result[0].images.original.url;
			});
			URLS.push(urls);
			// return results;
		}

		// @ts-ignore
		wsServer.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				// if (client !== ws)
				client.send(
					JSON.stringify({
						message: message,
						clients: wsServer.clients.size,
						gifUrl: urls,
					})
				);
			}
		});
	});

	ws.send(
		JSON.stringify({
			messages: MESSAGES,
			clients: wsServer.clients.size,
			gifUrls: URLS,
		})
	);
});

appServer.get('/', (req, res) => {
	res.sendFile('public/index.html');
});
