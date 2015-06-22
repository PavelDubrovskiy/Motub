define(["js/utils/common"], function(utils) {
	var $ = Framework7.$;
	var template = $('#takePhotoTemplate').html();
	var compiledTemplate = Template7.compile(template);
	
	function render(params) {
		html = compiledTemplate(params);
		$('#takePhotoPage').append(html);
		utils.bindEvents(params.bindings);
	}
	
	return {
		render: render
	};
});