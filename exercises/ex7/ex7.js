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
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
ASQ()
.runner(function*() {
	// problem with below, not doing it in parallel
	// var text1 = yield getFile("file1");
	// output(text1);
	// var text2 = yield getFile("file2");
	// output(text2);
	// var text3 = yield getFile("file3");
	// output(text3);

	var s1 = getFile("file1");
	var s2 = getFile("file2");
	var s3 = getFile("file3");

	// var text1 = yield s1;
	// output(text1);//subsitute with below

	// var text2 = yield s2;
	// output(text2);
	//
	// var text3 = yield s3;
	// output(text3);

	output(yield s1);
	output(yield s2);
	output(yield s3);

	output("Complete!");
	// no compromise here (except with using yield keyword) - reads synchronous

	// the beauty of this is why Kyle would never go back to using promise chains

	// for generator doesn't matter where asterix goes - just has to show up between function and parentheses

	// async is to bring in all async libraries into one library
});
