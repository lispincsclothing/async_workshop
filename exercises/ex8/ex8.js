$(document).ready(function() {
    var $btn = $("#btn"),
        $list = $("#list");

    var clicks = ASQ.react.of();

    $btn.click(function(evt) {
        // TODO
				clicks.push(evt);
    });

		var throttled = debounce(clicks);


    // TODO: setup sampled sequence, populate $list
		clicks
		.val(function(evt){
			// console.log("clicked!");
			$list.append("<p>Clicked!</p>");
		});
});

function debounce(clicks) {

	var last;

	clicks.val(function evt() {
			last = evt;
	});

	setInterval(function(){
			if (last) {
					throttled.push(last);
					last = null;
			}
	},1000);

	var throttled = ASQ.react.of();

	return throttled;
}
