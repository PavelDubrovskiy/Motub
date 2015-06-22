define(["js/utils/common"], function(utils) {
	function render(params) {
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});