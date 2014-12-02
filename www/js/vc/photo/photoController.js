define(["app","js/vc/photo/photoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var order;
	var bindings = [
		{
			element: '#takeNewPhoto',
			event: 'click',
			handler: takePhoto
		},
		{
			element: '#saveNewPhoto',
			event: 'click',
			handler: saveNewPhoto
		}
	];
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationNamePhoto').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#pageDescriptionPhoto').text(app.photoNames['name'+localStorage.getItem('level')]);
		path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
		$('#beforeImg').attr('src',path);
		view.render({
			bindings: bindings
		});
	}
	
	// Делаем фото
	function takePhoto() {
	 	try{
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
		}catch(e){
			app.mainView.loadPage('photo.html');
		}
	}
	
	// Нештатная ситуация
	function saveNewPhoto() {
		if(app.currentFile!=''){
			var path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
			app.sendFile(order, path, localStorage.getItem('level'));
		}
		logicController();
	}
	
	function captureSuccess(mediaFiles){
		app.currentFile=mediaFiles[0];
		path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
		$('#beforeImg').attr('src',path);
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function logicController(){
		if(localStorage.getItem('level')=='01'){
			localStorage.setItem('level','03');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='03'){
	 		localStorage.setItem('level','05');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='05'){
	 		localStorage.setItem('level','06');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='06'){
	 		checkAddress();
	 	}else if(localStorage.getItem('level')=='16'){
	 		app.closeOrder('error');
			app.mainView.loadPage('main.html');
	 	}
	 	/*else if(localStorage.getItem('level')=='04'){
	 		localStorage.setItem('level','05');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(localStorage.getItem('level')=='05'){
	 		localStorage.setItem('level','06');
	 		app.mainView.loadPage('question.html');
	 	}*/
	}
	function checkAddress() {
 		app.closeOrder('done');
 		app.mainView.loadPage('success.html');
	}
	return {
		init: init
	};
});