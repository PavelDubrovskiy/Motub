define(["app","js/vc/takePhoto/takePhotoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	
	var bindings = [
		{
			element: '#takePhoto',
			event: 'click',
			handler: takePhoto
		},
		{
			element: '#unexpectedCase',
			event: 'click',
			handler: unexpectedCase
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
		}catch(e){}
	}
	
	// Нештатная ситуация
	function unexpectedCase() {
		app.f7.alert("Нештатная ситуация!");
	}
	function captureSuccess(mediaFiles){
		var i, path, len;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        
	    }
	}
	function captureError(error){
		app.f7.alert('Код: '+error.code, "Ошибка");
	}
	return {
		init: init
	};
});