define(["app","js/vc/success/successView"], function(app, view) {
	var $ = Framework7.$;
	var order;
	var bindings = [
		{
			element: '.unexpectedCase',
			event: 'click',
			handler: unexpectedCase
		}
	];
	
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationNameSuccess').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#pageDescriptionSuccess').html(app.settings.description[localStorage.getItem('level')]);
		if(localStorage.getItem('level')=='06_01'){
			app.closeOrder();
			$('#successSubmit').click(function(){app.mainView.loadPage('task.html');});
			$('#successSubmitText').text('Перейти к заданию');
			$('#unexpectedCase').hide();
		}else{
			app.closeOrder();
			$('#successSubmit').click(function(){app.mainView.loadPage('main.html');});
			$('#navigationNameSuccess').text('Перейти к списку задач');
			$('#unexpectedCase').hide();
		}
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
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	return {
		init: init
	};
	
	return {
		init: init
	};
});