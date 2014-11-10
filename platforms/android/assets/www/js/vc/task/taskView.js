define(["js/utils/common"], function(utils) {
	var $ = Framework7.$;
	function render(params) {
		$('#taskAddress').text(params.order.address);
		$('#taskUid').text(params.order.uid);
		$('#taskInfo').html(params.order.info);
		$('#taskImg').attr('src',params.order.files['00']['path']);
		$('#taskDescription').html(params.order.description);
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});