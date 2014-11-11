define(["app","js/vc/question/questionView"], function(app, view) {
	var bindings = [
	];
	
	function init(query) {
		view.render({
			bindings: bindings
		});
	}
	
	return {
		init: init
	};
});