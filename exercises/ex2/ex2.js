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

function getFile(file) {
	// what do we do here?
	var val, fn;

	fakeAjax(file, function(text) { //this is eager callback, but how do you handle race condition now?  Vs. putting lazy callback in return function below.

		//scenario 1
		// if request for the response done first, no callback to call over.  so store it.
		// val = text;

		// scenario 2 - have callback, but no response, so store callback
		// fn(text)

		if(!fn) val = text
		else fn(text);
	});

	return function(cb){
		// fakeAjax(file, cb); //this code works, but is lazy callback.  Isn't doing the Ajax callback yet.  Not good, since we want to make requests in parallell.

		// scenario 1
		// cb(val);

		// scenario 2
		// cb(val)

		if (!val) fn = cb;
		else cb(val);
	};
}

// request all files at once in "parallel"
// ???

// each one of these are functions, and thunks
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

// // you can get out of order with below.
// th1(function(text) {
// 	output(text);
// });
// th2(function(text) {
// 	output(text);
// });
// th3(function(text) {
// 	output(text);
// });

// to enforce state, youll have to nest them

// if lazy thunks, then won't happen until all three are finished.  So has to be eager thunks.  Thunks are encapsulating time state
th1(function ready(text){ // will do and wait until th1
	output(text);
	th2(function ready(text){ // will do and wait until th2
		output(text);
		th3(function ready(text){ //will do and wait until th2
			output(text);
			output("Complete!");
		});
	});
})

// no name for this pattern so far when Kyle asked - but essentially a promise without the fancy API. So promise is really Time independent wrapper around future value. 
