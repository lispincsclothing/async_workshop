function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		processResponse(file, text);
	});
}

var responses = {};

function processResponse(url, text) {
	if (!(url in responses)) {
		responses[url] = text;
	}

// other way is to save list as you request, rather than hard coding
	var files = ["file1", "file2", "file3"];

	for (var i = 0; i < files.length; i++) { //outer loop lets you print as you get response back
		if (files[i] in responses) { // takes care of randomized response order
			if(responses[files[i]] !== null){ //makes sure does not reprint if already reprinted
				output(responses[files[i]]);
				responses[files[i]] = null;
			}
		} else {
			return false;
		}
	}
	output("Complete!");
}
// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
