define(["app","js/vc/processManager/processManagerView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var orders='';
	var bindings = [
		{
			element: '#tryUpload',
			event: 'click',
			handler: tryUpload
		},
		{
			element: '#clearUser',
			event: 'click',
			handler: clearUser
		},
		{
			element: '#clearAll',
			event: 'click',
			handler: clearAll
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
	function clearUser(){
		localStorage.removeItem('User');
		history.pushState(null, null, "index.html");
		location.reload(); 
	}
	function clearAll(){
		localStorage.clear();
		history.pushState(null, null, "index.html");
		location.reload(); 
	}
	return {
		init: init
	};
});