var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var postRequest;
var apiKey = "11fc8cfd10cfd27d83f12b0ce2179f7576ad75dc";
var url = 'https://redmine.hashthepla.net/issues.json?key=' + apiKey;

app.get('/slack', function(req, res) {
	if(postRequest) {
		res.send(postRequest);
	} else if (!postRequest) {
		res.send('No request');
	}
});

app.post('/slack', function(req, res) {
	postRequest = req.body;
	postIssues(postRequest);
	res.send(postRequest);
});

var postIssues = function(iss) {
	var input = iss;
	var issueData = input.split("$$");
	if(isueData[0]) {
		var subject = issueData[0].replace(/[^a-zA-Z0-9]/g, ' ');
	} else {
		var subject = "no subject provided";
	}
	if(isueData[1]) {
		var description = issueData[1].replace(/[^a-zA-Z0-9]/g, ' ');
	} else {
		var description = "no description provided";
	};
	console.log(input);
	console.log(subject);
	console.log(description);
	makeRequest(subject, description);
}
var makeRequest = function(subject, request) {
	request({
		url: url,
		method: "POST",
		rejectUnauthorized: false,
		json: {
			"issue" : {
				"project id" : 19,
				"tracker id" : 3,
				"status_id" : 1,
				"subject" : subject,
				"description" : description
			}
		}
	}, function(error, response, body) {
		if(error) {
			console.log(error);
		} else {
			console.log(response, body);
		}
	})
};
app.listen(process.env.PORT || 3000);
