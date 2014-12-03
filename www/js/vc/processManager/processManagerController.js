define(["app","js/vc/processManager/processManagerView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var orders='';
	var bindings = [
		{
			element: '#tryUpload',
			event: 'click',
			handler: tryUpload
		}
	];
	function init(query) {
		$('#navigationNameProcessManager').text('Менеджер процессов');
		view.render({
			bindings: bindings
		});
	}
	function tryUpload(){
		app.sendFilesFS();
	}
	return {
		init: init
	};
});