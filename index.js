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
	console.log(issueData);
	request({
		url: url,
		method: "POST",
		json: {
			"issue": {
			"project_id": 19,
			"tracker_id": 3,
			"status_id": 1,
			"subject": issueData[0],
			"description": issueData[1]
			}
		}
	},  function(error, response, body){
    		if(error) {
        		console.log(error);
    		} else {
        		console.log(response, body);
		}
	})
}("title $$ description");

app.listen(process.env.PORT || 3000);
