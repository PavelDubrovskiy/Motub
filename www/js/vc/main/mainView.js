define(["js/utils/common"], function(utils) {
	var $ = Framework7.$;
	var template = $('#mainPageTemplate').html();
	var compiledTemplate = Template7.compile(template);
		
	function render(params) {
		console.log(params.orders);
		html = compiledTemplate(params.orders);
		$('#mainPage').html(html);
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});