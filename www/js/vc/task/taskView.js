define(["js/utils/common"], function(utils) {
	var $ = Framework7.$;
	function render(params) {
		$('#taskAddress').text(params.order.address);
		$('#taskUid').text(params.order.uid);
		$('#taskInfo').html(params.order.info);
		try{
			$('#taskImg').attr('src',params.order.files['00']['path']);
		}catch(){}
		$('#taskDescription').html(params.order.description);
		utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});