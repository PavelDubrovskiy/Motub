define(["app","js/vc/takePhoto/takePhotoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var path;
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
		},{
			element: '#stopTask',
			event: 'click',
			handler: stopTask
		},{
			element: '#noDamage',
			event: 'click',
			handler: noDamage
		}
	];
	
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationName').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#pageDescription').html(app.settings.description[localStorage.getItem('level')]);
		if(localStorage.getItem('level')=='01'){
			$('#stopTask').addClass('st_hidden');
		}
		if(localStorage.getItem('level')=='06'){
			$('#unexpectedCase').addClass('st_hidden');
			$('#stopTask').addClass('st_hidden');
			$('#noDamage').removeClass('st_hidden');
		}
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
		localStorage.setItem('level','16');
	 	try{
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			//navigator.camera.getPicture(captureSuccess, captureError, {destinationType: Camera.DestinationType.DATA_URL});
		}catch(e){
			logicController();
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
		app.currentFile=mediaFiles[0];
		logicController();
	}
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	// Управлятор фотками
	function logicController(){
		if(localStorage.getItem('level')=='01'){
			app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='03'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='05'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='06'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='16'){
	 		app.mainView.loadPage('photo.html');
	 	}
	}
	function stopTask(){
		app.closeOrder('stop');
	 	app.mainView.loadPage('main.html');
	}
	function noDamage(){
		app.closeOrder('done');
	 	app.mainView.loadPage('success.html');
	}
	return {
		init: init
	};
});