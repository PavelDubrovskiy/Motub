define(["app","js/vc/question/questionView"], function(app, view) {
	var $ = Framework7.$;
	var order=JSON.parse(localStorage.getItem('order'));
	var bindings = [
		{
			element: '#answerYes',
			event: 'click',
			handler: takePhoto
		},
		{
			element: '#answerNo',
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
		console.log('question page');
		$('#navigationNameQuestion').text('УН: '+order.uid+' level:'+app.level);
		$('#pageDescriptionQuestion').html(app.settings.description[app.level]);
		view.render({
			bindings: bindings
		});
	}
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
	 		app.level='16';
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			//navigator.camera.getPicture(captureSuccess, captureError, {destinationType: Camera.DestinationType.DATA_URL});
		}catch(e){
			app.level='00';
			app.mainView.loadPage('main.html');
		}
	}
	function captureSuccess(mediaFiles){
		currentFile=mediaFiles[0];
		var path='file:///'+currentFile.fullPath.substr(6,currentFile.fullPath.length);
		app.sendFile(order, path, app.level);
		logicController();
	}
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	// Управлятор фотками
	function logicController(){
		if(app.level=='01'){
	 		app.level='02';
	 		app.mainView.loadPage('reloadPage.html');
	 	}else if(app.level=='02'){
	 		app.level='03';
	 		app.mainView.loadPage('reloadPage.html');
	 	}else if(app.level=='03'){
	 		app.level='04';
	 		app.mainView.loadPage('reloadPage.html');
	 	}else if(app.level=='04'){
	 		app.level='05';
	 		app.mainView.loadPage('reloadPage.html');
	 	}else if(app.level=='05'){
	 		app.level='06';
	 		app.mainView.loadPage('question.html');
	 	}else if(app.level=='16'){
	 		app.level='00';
	 		app.mainView.loadPage('main.html');
	 	}
	}
	return {
		init: init
	};
});