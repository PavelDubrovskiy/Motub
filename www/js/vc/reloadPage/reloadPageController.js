define(["app", "js/utils/user"], function(app, User) {
	var $ = Framework7.$;
	
	function init(query) {
		$(document).once('pageAfterAnimation', function() {
			app.mainView.loadPage(query.path);
		});
	}
	
	return {
		init: init
	};
});