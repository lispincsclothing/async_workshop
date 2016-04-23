function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		console.log("In setTimeout");
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}



// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
["file1", "file2", "file3"]
.map(getFile) //actually excuting, not passint a function
.reduce(function combine(chain, pr) {
	return chain.then(function chainPr() {
		return pr;
	}).then(output);
// }, new Promise(function(resolve, reject){ resolve(); })) //Longhand version of promise.resolve
}, Promise.resolve()) //shorthand version of promise.resolve
.then(function () {
	output("Complete!");
});

// above equivalent to: (Code won't work becuse p1, p2, p3)
// Promise.resolve()
// .then(function chainP1() {
// 	return p1;
// })
// .then(output)
// .then(function chainP2() {
// 	return p2;
// })
// .then(output)
// .then(function chainP3() {
// 	return p3;
// })
