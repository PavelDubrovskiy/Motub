define(["app","js/vc/takePhoto/takePhotoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var path;
	var currentFile;
	var order=JSON.parse(localStorage.getItem('order'));
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
			//navigator.camera.getPicture(captureSuccess, captureError, {destinationType: Camera.DestinationType.DATA_URL});
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
		console.log('ver 0.6');
		console.log(mediaFiles);
		//path = mediaFiles[0].localURL;
		currentFile=mediaFiles[0];
		
		var path='file:///'+currentFile.fullPath.substr(6,currentFile.fullPath.length);
		
		var win = function (r) {
			console.log("Code = " + r.responseCode);
			console.log("Response = " + r.response);
			console.log("Sent = " + r.bytesSent);
		}
		
		var fail = function (error) {
			alert("An error has occurred: Code = " + error.code);
			console.log("upload error source " + error.source);
			console.log("upload error target " + error.target);
		}
		
		
		
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = path.substr(path.lastIndexOf('/') + 1);
		options.mimeType = "text/plain";
		
		var params = {};
		params.value1 = "test";
		params.value2 = "param";
		options.params = params;
		
		var ft = new FileTransfer();
		console.log(options);
		ft.upload(path, encodeURI(app.config.source+"/api/upload/"), win, fail, options);
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	return {
		init: init
	};
});