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
		},{
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
			element: '#stopTaskNo',
			event: 'click',
			handler: stopTaskNo
		}
	];
	
	function init(query) {
		var buttons={takePhoto:1,answerYes:0,answerNo:0,stopTaskNo:0,unexpectedCase:1,stopTask:1,noDamage:0};
		order=JSON.parse(localStorage.getItem('order'));
		console.log(order);
		$('#navigationName').text('УН: '+order.uid+' level:'+localStorage.getItem('level')+' num:'+order.pointsNum);
		var description=app.settings.description[localStorage.getItem('level')].replace('№n','№'+order.pointsNum);
		var filesFS=JSON.parse(localStorage.getItem('filesFS'));
		for(var i in filesFS){
			console.log(filesFS[i].params.programName+" == "+order.id+'_04_'+user.name+'_'+order.pointsNum);
			if(filesFS[i].params.programName == order.id+'_04_'+user.name+'_'+order.pointsNum){
				description.replace('[photo]','<p><img src="'+filesFS[i].params.path+'"></p>');
			}
		}
		$('#pageDescription').html(description);
		if(localStorage.getItem('level')=='01'){
			buttons={takePhoto:1,answerYes:0,answerNo:0,stopTaskNo:0,unexpectedCase:1,stopTask:0,noDamage:0};
		}else if(localStorage.getItem('level')=='06'){
			buttons={takePhoto:1,answerYes:0,answerNo:0,stopTaskNo:0,unexpectedCase:0,stopTask:0,noDamage:1};
		}else if(localStorage.getItem('level')=='04_01'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:0,stopTask:0,noDamage:0};
		}else if(localStorage.getItem('level')=='04_02'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:0,noDamage:0};
		}else if(localStorage.getItem('level')=='04_03'){
			try{
				var filesFS=JSON.parse(localStorage.getItem('filesFS'));
				filesFS.forEach(function(element, index, array) {
					if(element.params.programName==order.id+'_'+localStorage.getItem('level')+'_'+user.name+'_'+order.pointsNum){
						$('#pageDescriptionQuestion').html().replace('[foto]','<img src="'+element.params.path+'">');
					}
				});
			}catch(e){}
			buttons={takePhoto:0,answerYes:1,answerNo:0,stopTaskNo:1,unexpectedCase:0,stopTask:0,noDamage:0};
		}else if(localStorage.getItem('level')=='04_05'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:1,noDamage:0};
		}else if(localStorage.getItem('level')=='00_01' || localStorage.getItem('level')=='07_01'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:1,noDamage:0};
		}
		view.render({
			bindings: bindings,
			buttons: buttons
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
		localStorage.setItem('lastLevel',localStorage.getItem('level'));
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
	function actYes(){
		if(localStorage.getItem('level')=='00_01'){
			localStorage.setItem('level','02');
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(localStorage.getItem('level')=='04_01'){
			localStorage.setItem('level','04_02');
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(localStorage.getItem('level')=='04_02' || localStorage.getItem('level')=='07_01' || localStorage.getItem('level')=='04_05'){
			console.log('actYes level 04_02 07_01 04_05 select:'+localStorage.getItem('level')+' point:'+order.pointsNum+' act:add point:'+(order.points.length+1));
			order.points.push('play');
			order.pointsNum=order.points.length;
			localStorage.setItem('order',JSON.stringify(order));
			app.closeOrder('play');
			localStorage.setItem('level','00_01');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(localStorage.getItem('level')=='04_03'){
			localStorage.setItem('level','04_04');
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}
	}
	function actNo(){
		if(localStorage.getItem('level')=='00_01'){
			localStorage.setItem('level','07');
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(localStorage.getItem('level')=='04_02' || localStorage.getItem('level')=='07_01'){
			localStorage.setItem('level','04_03');
			var temp=false;
			order.points.forEach(function(element, index, array){
				if(temp==false && element!='done'){
					console.log('actNo level 04_02 07_01 select:'+localStorage.getItem('level')+' point:'+order.pointsNum+' act:select point:'+(index+1));
					order.pointsNum=index+1;
					localStorage.setItem('order',JSON.stringify(order));
					temp=true;
				}
			});
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(localStorage.getItem('level')=='04_01'){
			localStorage.setItem('level','10');
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(localStorage.getItem('level')=='04_05'){
			app.closeOrder('done');
		 	app.mainView.loadPage('success.html');
		}
	}
	// Управлятор фотками
	function logicController(){
		if(localStorage.getItem('level')=='01'){
			app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='02'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='03'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='04'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='05'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='06'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='07'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='08'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='09'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='10'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='16'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(localStorage.getItem('level')=='04_04'){
	 		console.log('level:04_04 point:'+order.pointsNum+' act:done');
			order.points[order.pointsNum-1]='done';
			localStorage.setItem('order',JSON.stringify(order));
	 		localStorage.setItem('level','10');
	 		app.mainView.loadPage('photo.html');
	 	}
	}
	function stopTask(){
		app.closeOrder('stop');
	 	app.mainView.loadPage('main.html');
	}
	function stopTaskNo(){
		var temp=false;
		order.points.forEach(function(element, index, array){
			if(temp==false && element!='done' && order.pointsNum!=index+1){
				console.log('stopTaskNo level select:'+localStorage.getItem('level')+' point:'+order.pointsNum+' act:select point:'+(index+1));
				order.pointsNum=index+1;
				localStorage.setItem('order',JSON.stringify(order));
				temp=true;
			}
		});
		if(temp==true){
			localStorage.setItem('level','04_03');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else{
	 		localStorage.setItem('level','04_05');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}
	}
	function noDamage(){
		app.closeOrder('done');
	 	app.mainView.loadPage('success.html');
	}
	return {
		init: init
	};
});