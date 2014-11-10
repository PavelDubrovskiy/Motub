define(["app","js/vc/photo/photoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	
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
		app.f7.alert("Сохраняем фото!", function() {
			app.mainView.loadPage('takePhoto.html');
		});
	}
	
	function captureSuccess(mediaFiles){
		var i, path, len;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        
	    }
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	
	return {
		init: init
	};
});