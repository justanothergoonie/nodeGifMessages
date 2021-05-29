const axios = require('axios');

class WordsApi {
	API_URL_BASE = 'https://wordsapiv1.p.rapidapi.com/words';
	API_KEY = '33a9cd340dmsh3a4910535b5f485p17ce72jsnea8dae1a19b8';

	constructor() {}

	async search(term, type) {
		const results = await axios.get(
			`${this.API_URL_BASE}/${term}/${type}`,
			{
				headers: {
					'x-rapidapi-key': this.API_KEY,
					'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
				},
			}
		);
		return results.data[type];
	}
	async searchMultiple(phrase, type) {
		const terms = phrase.split(' ');
		const results = await Promise.all(
			terms.map(async (term) => {
				return await this.search(term, type);
			})
		);
		return results;
	}
}
module.exports = WordsApi;
