define(["app","js/vc/processManager/processManagerView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var orders='';
	var bindings = [
		
	];
	
	function init(query) {
		$('#navigationNameProcessManager').text('Менеджер процессов');
		view.render({
			bindings: bindings
		});
	}
	return {
		init: init
	};
});