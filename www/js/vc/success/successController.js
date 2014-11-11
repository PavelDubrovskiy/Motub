define(["app","js/vc/success/successView"], function(app, view) {
	var bindings = [
		{
			element: '.unexpectedCase',
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
		console.log('ver 0.4');
		console.log(mediaFiles);
		path = mediaFiles[0].localURL;
		//path = mediaFiles[0].fullPath;
		$('#tempImg').attr('src',path);
		console.log('file get like '+path);
		
        window.resolveLocalFileSystemURL(path, function(fileEntry){console.log(fileEntry);}, function(error){console.log(error.code);});
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function onInitFs(fs) {
	    fs.root.getFile(path, {}, function(fileEntry) {
			fileEntry.file(function(file) {
				readDataUrl(file);
       			readAsText(file);
			}, errorHandler);
		}, errorHandler);
	}
	function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
        };
        reader.readAsDataURL(file);
    }
    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
        };
        reader.readAsText(file);
    }
	function errorHandler(e) {
		console.log(e.target.error.code);
	}
	return {
		init: init
	};
	
	return {
		init: init
	};
});