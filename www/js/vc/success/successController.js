define(["app","js/vc/success/successView"], function(app, view) {
	var $ = Framework7.$;
	var order, orders;
	var bindings = [
		{
			element: '.unexpectedCase',
			event: 'click',
			handler: unexpectedCase
		}
	];
	document.addEventListener("backbutton", onBackButtonFire, false); 
	function onBackButtonFire(){
		localStorage.setItem('level',localStorage.getItem('oldLevel'));
	}
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		orders=JSON.parse(localStorage.getItem('orders'));
		//$('#navigationNameSuccess').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#navigationNameSuccess').text('УН: '+order.uid);
		var next=0;
		var remark=false;
		for(var i in orders){
			if(orders[i].address==order.address && orders[i].status=='new'){
				next=orders[i].id;
			}
		}
		$('#unexpectedCase').hide();
		if(next!=0){
			localStorage.setItem('currentOrder',next);
			localStorage.setItem('order',JSON.stringify(orders[next]));
			localStorage.setItem('oldLevel',localStorage.getItem('level'));
			localStorage.setItem('level','06_01');
			$('#pageDescriptionSuccess').html(app.settings.description['06_01']);
			$('#successSubmit').click(function(){app.mainView.loadPage('task.html');});
			$('#successSubmitText').text('Перейти к заданию');
		}else{
			for(var i in orders){
				if(orders[i].status=='remark' || orders[i].status=='stop'){
					remark=true;
				}
			}
			if(remark==true){
				localStorage.setItem('oldLevel',localStorage.getItem('level'));
				localStorage.setItem('level','06_02');
				$('#pageDescriptionSuccess').html(app.settings.description['06_02']);
				$('#successSubmit').click(function(){app.mainView.loadPage('main.html');});
				$('#successSubmitText').text('Перейти к задачам');
			}else{
				localStorage.setItem('oldLevel',localStorage.getItem('level'));
				localStorage.setItem('level','06_03');
				$('#pageDescriptionSuccess').html(app.settings.description['06_03']);
				$('#successSubmit').click(function(){app.mainView.loadPage('main.html');});
				$('#successSubmitText').text('Перейти к списку задач');
			}
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