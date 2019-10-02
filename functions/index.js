const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const GoogleAssistant = require('./googleassistant');
const deviceCredentials = require('./devicecredentials.json');

const CREDENTIALS = {
	client_id: deviceCredentials.client_id,
	client_secret: deviceCredentials.client_secret,
	refresh_token: deviceCredentials.refresh_token,
	type: "authorized_user"
};

const assistant = new GoogleAssistant(CREDENTIALS);


exports.assistantdemo = functions.https.onRequest((req, res) => {
	const query = req.query.query;
	if (query.length > 0) {
		assistant.assist(query)
			.then(({
				text
			}) => {
				res.json({
					"res":text
				});
			});
	}

});