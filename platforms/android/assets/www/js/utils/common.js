define( function() {
	var $ = Framework7.$;

	// Замена содержимого элемента прелоадером
	function setPreloader(selector) {
		$(selector).html('<span class="preloader"></span>');
	}
	
	// Навешивание обработчиков событий на элементы
	function bindEvents(bindings) {
		for (var i in bindings) {
			if( !bindings[i].delegateTo ) {
				$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			}else{
				$(bindings[i].element).on(bindings[i].event, bindings[i].delegateTo, bindings[i].handler);
			}
		}
	}
	
	return {
		setPreloader: setPreloader,
		bindEvents: bindEvents
	};	
});