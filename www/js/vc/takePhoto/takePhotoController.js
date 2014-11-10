define(["app","js/vc/takePhoto/takePhotoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var path;
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
		path = mediaFiles[0].fullPath;
		console.log('file get like '+path);
		window.requestFileSystem(window.TEMPORARY, 10*1024*1024, onInitFs, errorHandler);
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function onInitFs(fs) {
	    fs.root.getFile(path, {}, function(fileEntry) {
			fileEntry.file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					console.log(this.result);
				};
				reader.readAsText(file);
			}, errorHandler);
		}, errorHandler);
	}
	function errorHandler(e) {
	  var msg = '';
	
	  switch (e.code) {
	    case FileError.QUOTA_EXCEEDED_ERR:
	      msg = 'QUOTA_EXCEEDED_ERR';
	      break;
	    case FileError.NOT_FOUND_ERR:
	      msg = 'NOT_FOUND_ERR';
	      break;
	    case FileError.SECURITY_ERR:
	      msg = 'SECURITY_ERR';
	      break;
	    case FileError.INVALID_MODIFICATION_ERR:
	      msg = 'INVALID_MODIFICATION_ERR';
	      break;
	    case FileError.INVALID_STATE_ERR:
	      msg = 'INVALID_STATE_ERR';
	      break;
	    default:
	      msg = 'Unknown Error';
	      break;
	  };
	
	  console.log('Error: ' + msg);
	}
	return {
		init: init
	};
});