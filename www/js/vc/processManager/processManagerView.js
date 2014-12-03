define(["app","js/utils/common"], function(app, utils) {
	var $ = Framework7.$;
	var template = $('#processManagerPageTemplate').html();
	var compiledTemplate = Template7.compile(template);
	function render(params){
		var filesFS={files:JSON.parse(localStorage.getItem('filesFS'))};
		html = compiledTemplate(filesFS);
		$('#processManagerPage').html(html);
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});