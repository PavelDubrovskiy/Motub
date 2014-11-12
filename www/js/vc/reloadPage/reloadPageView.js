define(["js/utils/common"], function(utils) {
	var $ = Framework7.$;
	function render(params) {
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});