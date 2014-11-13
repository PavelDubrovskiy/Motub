define(["app","js/vc/photo/photoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var bindings = [
	];
	function init(query) {
		window.setTimeout(function(){app.mainView.loadPage(query.path)},1000);
		view.render({
			bindings: bindings
		});
	}	
	return {
		init: init
	};
});