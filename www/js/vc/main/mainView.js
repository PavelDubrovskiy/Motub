define(["js/utils/common"], function(utils) {
	var $ = Framework7.$;
	function render(params) {
		var template = $('#mainPageTemplate').html();
		var compiledTemplate = Template7.compile(template);
		console.log(params.orders);
		html=compiledTemplate(params.orders);
		$('#mainPage').html(html);
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});