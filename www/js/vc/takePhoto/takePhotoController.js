define(["app","js/vc/takePhoto/takePhotoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var path;
	var currentFile;
	var order;
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
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationName').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#pageDescription').html(app.settings.description[localStorage.getItem('level')]);
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
			logicController();
		}
	}
	function takePhoto16() {
	 	try{
	 		localStorage.setItem('level','16');
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			//navigator.camera.getPicture(captureSuccess, captureError, {destinationType: Camera.DestinationType.DATA_URL});
		}catch(e){
			localStorage.setItem('level','00');
			app.mainView.loadPage('main.html');
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
				onClick: takePhoto16
			},
			{
				text: 'Отмена'
			}
		]);
	}
	
	function captureSuccess(mediaFiles){
		currentFile=mediaFiles[0];
		var path='file:///'+currentFile.fullPath.substr(6,currentFile.fullPath.length);
		app.sendFile(order, path, localStorage.getItem('level'));
		logicController();
	}
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	// Управлятор фотками
	function logicController(){
		if(localStorage.getItem('level')=='01'){
			localStorage.setItem('level','02');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(localStorage.getItem('level')=='02'){
	 		localStorage.setItem('level','03');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(localStorage.getItem('level')=='03'){
	 		localStorage.setItem('level','04');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(localStorage.getItem('level')=='04'){
	 		localStorage.setItem('level','05');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(localStorage.getItem('level')=='05'){
	 		localStorage.setItem('level','06');
	 		app.mainView.loadPage('question.html');
	 	}else if(localStorage.getItem('level')=='16'){
	 		localStorage.setItem('level','00');
	 		app.mainView.loadPage('main.html');
	 	}
	}
	return {
		init: init
	};
});