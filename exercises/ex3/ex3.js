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
	return new Promise(function(resolve) { //take out reject argument, since don't handle that case.
		fakeAjax(file, resolve);
	});
}

var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");
// request all files at once in "parallel"
// ???

p1
.then(function(text){ // same is use output (don't put parentheses)
	// people put inline functions here - bad idea, since you lose readability
	// prefer to use function, when have one, rather than function declaration
	output(text);
})
.then(function(){  //You could use function here, rather than declaring, but this is one liner.
	return p2;
	// when no return specified, same as returning null
})
.then(output) //output result, declartive version of above
.then(function() {
	return p3;
})
.then(output)
.then(function() {
	output("Complete");
})
.catch(function(err) { //same as .then(null,the function as you wanted).  Can place .catch before if you want to catch before this.
	console.log(err);
});

// var p1 = ..;
// var p2 = p1.then(..);  whatever happens in .. is going to happen to p2, e.g if it resolves
// var p3 = p2.then(..);  whatever happens in .. is going to happen to p3
// var p4 = p3.then(..);  whatever happens in .. is going to happen to p4
// p4.catch(..);

// .then always returns a Promise
// returning undefined ralways resolves a promise
