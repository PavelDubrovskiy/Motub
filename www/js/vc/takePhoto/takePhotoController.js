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
		var i, path, len, fileBlob;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        $('#upload').val(path);
			console.log($('#upload'));
			var upload=$('#upload')[0]
	        var reader = new FileReader();
	        reader.onload = (function(theFile) {
				return function(e) {
					fileBlob=e.target.result;
					console.log(fileBlob);
		        };
		    })(upload.files[0]);
	      	reader.readAsDataURL(upload.files[0]);
	    }
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	
	return {
		init: init
	};
});