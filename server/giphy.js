const axios = require('axios');

class GiphyApi {
	API_URL_BASE = 'https://api.giphy.com/v1/gifs/search?';
	API_KEY = 'KkUdVmF1UXeAwtL3Fnz7cT2NGvjkdS23';

	constructor() {}

	async search(term) {
		const results = await axios.get(this.API_URL_BASE, {
			params: {
				api_key: this.API_KEY,
				q: term,
				rating: 'pg',
			},
		});
		return results.data.data;
	}
	async searchMultiple(phrase) {
		const terms = phrase.split(' ');

		const results = await Promise.all(
			terms.map(async (term) => {
				return await this.search(term);
			})
		);
		return results;
	}
}
module.exports = GiphyApi;
