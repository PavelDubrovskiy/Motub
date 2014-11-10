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
		/*app.f7.modal({
			text: 'Сделайте фотографию нештатной ситуации.',
			buttons: [
				{
					text: 'Отмена'
				},
				{
					text: 'Сделать снимок',
					bold: true,
					onClick: takePhoto
				}
			]
		});*/
		
			
		var buttons = [
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
		];
		app.f7.actions(buttons);
	}
	
	function captureSuccess(mediaFiles){
		var i, path, len, fileBlob;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        var reader = new FileReader();
	        reader.onload = (function(theFile) {
				return function(e) {
					fileBlob=e.target.result;
					alert(fileBlob);
		        };
		     })(f);
	      	reader.readAsDataURL(f);
	    }
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	
	return {
		init: init
	};
});