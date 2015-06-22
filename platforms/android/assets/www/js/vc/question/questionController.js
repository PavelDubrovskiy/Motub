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
		},
		{
			element: '#stopTaskQuestion',
			event: 'click',
			handler: stopTask
		},
		{
			element: '#stopTaskQuestionNo',
			event: 'click',
			handler: stopTaskNo
		}
	];
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationNameQuestion').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#pageDescriptionQuestion').html(app.settings.description[localStorage.getItem('level')].replace('№n','№'+order.pointsNum));
		if(localStorage.getItem('level')=='04_01'){
			$('#unexpectedCaseQuestion').addClass('st_hidden');
			$('#stopTaskQuestion').addClass('st_hidden');
		}else if(localStorage.getItem('level')=='04_02'){
			$('#stopTaskQuestion').addClass('st_hidden');
		}else if(localStorage.getItem('level')=='04_03'){
			try{
				var filesFS=JSON.parse(localStorage.getItem('filesFS'));
				filesFS.forEach(function(element, index, array) {
					if(element.params.programName==order.id+'_'+level+'_'+user.name+'_'+order.pointsNum){
						$('#pageDescriptionQuestion').html().replace('[foto]','<img src="'+element.params.path+'">');
					}
				});
			}catch(e){}
			$('#stopTaskQuestionNo').removeClass('st_hidden');
			$('#answerNo').addClass('st_hidden');
			$('#stopTaskQuestion').addClass('st_hidden');
		}
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
		if(localStorage.getItem('level')=='00_01'){
			localStorage.setItem('level','02')
			app.mainView.loadPage('takePhoto.html');
		}else if(localStorage.getItem('level')=='04_01'){
			localStorage.setItem('level','04_02')
			app.mainView.loadPage('reloadPage.html?path=question.html');
		}else if(localStorage.getItem('level')=='04_02' || localStorage.getItem('level')=='07_01'){
			order.points[order.pointsNum-1]='stop';
			order.points.push('play');
			order.pointsNum++;
			localStorage.setItem('order',JSON.stringify(order));
			app.closeOrder('play');
			localStorage.setItem('level','00_01');
	 		app.mainView.loadPage('reloadPage.html?path=question.html');
		}else if(localStorage.getItem('level')=='04_03'){
			localStorage.setItem('level','04_04')
			app.mainView.loadPage('takePhoto.html');
		}
	}
	function actNo(){
		if(localStorage.getItem('level')=='00_01'){
			localStorage.setItem('level','07');
			app.mainView.loadPage('takePhoto.html');
		}else if(localStorage.getItem('level')=='04_02' || localStorage.getItem('level')=='07_01'){
			localStorage.setItem('level','04_03');
			var temp=false;
			order.points.forEach(function(element, index, array){
				if(temp==false && element=='stop'){
					order.pointsNum=index+1;
					order.points[index]='next';
					temp=true;
				}
			});
			app.mainView.loadPage('reloadPage.html?path=question.html');
		}else if(localStorage.getItem('level')=='04_01'){
			localStorage.setItem('level','10');
			app.mainView.loadPage('takePhoto.html');
		}
	}
	function takePhoto() {
	 	try{
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
		}catch(e){
			checkAddress();
		}
	}
	function stopTask(){
		app.closeOrder('stop');
	 	app.mainView.loadPage('main.html');
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
		localStorage.setItem('lastLevel',localStorage.getItem('level'));
		localStorage.setItem('level','16');
	 	try{
			navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			//navigator.camera.getPicture(captureSuccess, captureError, {destinationType: Camera.DestinationType.DATA_URL});
		}catch(e){
			logicController();
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
	function logicController(){
		if(localStorage.getItem('level')=='16'){
	 		app.mainView.loadPage('photo.html');
	 	}
	}
	function stopTaskNo(){
		localStorage.setItem('level','04_03');
	 	app.mainView.loadPage('reloadPage.html?path=question.html');
	}
	return {
		init: init
	};
});