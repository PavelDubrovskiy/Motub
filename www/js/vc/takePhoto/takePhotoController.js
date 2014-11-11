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
		console.log(mediaFiles);
		path = mediaFiles[0].localURL;
		$('#tempImg').attr('src',path);
		console.log('file get like '+path);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);
        window.resolveLocalFileSystemURI(path, function(fileEntry){console.log(fileEntry.name);}, function(error){console.log(error.code);});
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
		console.log(e);
	}
	return {
		init: init
	};
});