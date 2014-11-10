define('app', ['js/router'], function(Router) {
	Router.init();
	var $ = Framework7.$;
	
	var f7 = new Framework7({
		modalTitle: ' ',
		swipePanelThreshold: 50,
		pushState: true,
		animateNavBackIcon: true,
		
		sortable: false,
		swipeBackPageBoxShadow: false,
		swipeBackPage: false
	});
	
	var mainView = f7.addView('.view-main', {
		dynamicNavbar: true
	});
	var config={
		source:'http://test02.one-touch.ru'
	};
	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		config: config
	};
});

// Расширение прототипа Function для упрощения передачи контекста в функцию
Function.prototype.bind = function (scope) {
	var fn = this;
	return function () {
		return fn.apply(scope, arguments);
	};
};