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
		}catch(e){
			app.mainView.loadPage('photo.html');
		}
	}
	
	// Нештатная ситуация
	function unexpectedCase() {
		app.f7.actions([
			{
				text: 'Сделайте фотографию нештатной ситуации.',
				label: true
			},
			{
				text: 'Сделать снимок',
				onClick: takePhoto
			},
			{
				text: 'Отмена'
			}
		]);
	}
	
	function captureSuccess(mediaFiles){
		var path;
		path = mediaFiles[0].fullPath;
	    function onInitFs(fs) {
		  fs.root.getFile(path, {}, function(fileEntry) {
		    fileEntry.file(function(file) {
		       var reader = new FileReader();
		
		       reader.onloadend = function(e) {
		         var txtArea = document.createElement('textarea');
		         txtArea.value = this.result;
		         document.body.appendChild(txtArea);
		       };
		
		       reader.readAsText(file);
		    }, errorHandler);
		
		  }, errorHandler);
		
		}
		window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	
	return {
		init: init
	};
});