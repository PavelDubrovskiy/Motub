define(["app","js/vc/question/questionView"], function(app, view) {
	var $ = Framework7.$;
	var order;
	var bindings = [
		{
			element: '#answerYes',
			event: 'click',
			handler: actYes
		},
		{
			element: '#answerNo',
			event: 'click',
			handler: actNo
		},
		{
			element: '#unexpectedCaseQuestion',
			event: 'click',
			handler: unexpectedCase
		}
	];
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationNameQuestion').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#pageDescriptionQuestion').html(app.settings.description[localStorage.getItem('level')]);
		view.render({
			bindings: bindings
		});
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
	function actYes(){
		if(localStorage.getItem('level')=='06'){
			takePhoto();
		}else if(localStorage.getItem('level')=='06_02'){
			app.f7.alert('Обходим все по кругу', "ToDo");
		}
	}
	function actNo(){
		if(localStorage.getItem('level')=='06'){
			checkAddress();
		}else if(localStorage.getItem('level')=='06_02'){
			app.closeOrder();
			pp.mainView.loadPage('main.html');
		}
	}
	function takePhoto() {
	 	try{
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
		}catch(e){
			checkAddress();
		}
	}
	function checkAddress() {
	 	if(order.next==''){
	 		localStorage.setItem('level','06_02');
	 		app.mainView.loadPage('reloadPage.html?path=question.html');
	 	}else{
	 		localStorage.setItem('level','06_01');
	 		localStorage.setItem('currentOrder',order.next);
	 		app.mainView.loadPage('success.html');
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
	function captureSuccess(mediaFiles){
		currentFile=mediaFiles[0];
		var path='file:///'+currentFile.fullPath.substr(6,currentFile.fullPath.length);
		app.sendFile(order, path, localStorage.getItem('level'));
		checkAddress();
	}
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	return {
		init: init
	};
});