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
	
	document.addEventListener("backbutton", onBackButtonFire, false); 
	function onBackButtonFire(){
		if(order.level=='00_01'){
			if(ocalStorage.getItem('backLevel')!=''){
				order.level=localStorage.getItem('backLevel');
				order.points.pop();
				order.pointsNum=order.points.length;
				localStorage.setItem('order',JSON.stringify(order));
				app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
			}else{
	 			app.mainView.loadPage('task.html');
	 		}
		}else if(order.level=='01'){
			order.level='00';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('task.html');
	 	}else if(order.level=='02'){
	 		order.level='00_01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(order.level=='03'){
	 		order.level='01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='04'){
	 		order.level='02';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='04_01'){
	 		localStorage.setItem('level','04');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(order.level=='04_02'){
	 		order.level='04_01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(order.level=='04_03'){
	 		order.level=localStorage.getItem('backLevel');
	 		if(order.level=='04_02' || order.level=='07_01'){
				order.noDU='0';
	 		}
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(order.level=='05'){
	 		order.level='03';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='06'){
	 		order.level='05';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='07'){
	 		order.level='00_01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(order.level=='07_01'){
	 		order.level='07';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='08'){
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('task.html');
	 	}else if(order.level=='09'){
	 		order.level='08';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('photo.html');
	 	}
		//localStorage.setItem('level',localStorage.getItem('oldLevel'));
	}
	function init(query) {
		var buttons={takePhoto:1,answerYes:0,answerNo:0,stopTaskNo:0,unexpectedCase:1,stopTask:1,noDamage:0};
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationName').text('УН: '+order.uid+' level:'+order.level+' num:'+order.pointsNum+' noDU:'+order.noDU);
		var description=app.settings.description[order.level].replace('№n','№'+order.pointsNum);
		try{
			var filesFS=JSON.parse(localStorage.getItem('filesFS'));
			for(var i in filesFS){
				//console.log(filesFS[i].params.programName+" == "+order.id+'_04_'+user.name+'_'+order.pointsNum);
				if(filesFS[i].params.programName == order.id+'_04_'+user.name+'_'+order.pointsNum){
					//console.log('filesFS try to replace');
					description=description.replace('photo','<img src="'+filesFS[i].params.path+'" style="max-height:50%">');
				}
			}
		}catch(e){}
		$('#pageDescription').html(description);
		if(order.level=='01'){
			buttons={takePhoto:1,answerYes:0,answerNo:0,stopTaskNo:0,unexpectedCase:1,stopTask:0,noDamage:0};
		}else if(order.level=='06'){
			buttons={takePhoto:1,answerYes:0,answerNo:0,stopTaskNo:0,unexpectedCase:1,stopTask:0,noDamage:1};
		}else if(order.level=='04_01'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:0,noDamage:0};
		}else if(order.level=='04_02'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:0,noDamage:0};
		}else if(order.level=='04_03'){
			buttons={takePhoto:0,answerYes:1,answerNo:0,stopTaskNo:1,unexpectedCase:1,stopTask:1,noDamage:0};
		}else if(order.level=='04_05'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:1,noDamage:0};
		}else if(order.level=='00_01' || order.level=='07_01'){
			buttons={takePhoto:0,answerYes:1,answerNo:1,stopTaskNo:0,unexpectedCase:1,stopTask:1,noDamage:0};
		}
		view.render({
			bindings: bindings,
			buttons: buttons
		});
	}
	
	// Делаем фото
	function takePhoto() {
		$('#takePhotoPage').hide();
	 	try{
			//navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			navigator.camera.getPicture(cameraSuccess, cameraError, app.config.cameraOptions);
		}catch(e){
			//alert(e);
			logicController();
		}
	}
	function takePhoto16() {
		localStorage.setItem('lastLevel',order.level);
		order.level='16';
		localStorage.setItem('order',JSON.stringify(order));
		$('#takePhotoPage').hide();
	 	try{
			//navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			navigator.camera.getPicture(cameraSuccess, cameraError, app.config.cameraOptions);
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
	
	function cameraSuccess(fileURI){
		try{
			app.currentFile={fullPath: fileURI};
			logicController();
		}catch(e){
			//alert(e);
		}
	}
	function captureSuccess(mediaFiles){
		try{
			app.currentFile=mediaFiles[0];
			logicController();
		}catch(e){
			//alert(e);
		}
	}
	function cameraError(message){
		$('#takePhotoPage').show();
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function actYes(){
		if(order.level=='00_01'){
			localStorage.setItem('oldLevel',order.level);
			order.level='02';
			localStorage.setItem('order',JSON.stringify(order));
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(order.level=='04_01'){
			localStorage.setItem('oldLevel',order.level);
			order.level='04_02';
			localStorage.setItem('order',JSON.stringify(order));
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(order.level=='04_02' || order.level=='07_01' || order.level=='04_05'){
			//console.log('actYes level 04_02 07_01 04_05 select:'+order.level+' point:'+order.pointsNum+' act:add point:'+(order.points.length+1));
			localStorage.setItem('oldLevel',order.level);
			order.points.push('play');
			order.pointsNum=order.points.length;
			order.level='00_01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(order.level=='04_03'){
			localStorage.setItem('oldLevel',order.level);
			order.level='04_04';
			localStorage.setItem('order',JSON.stringify(order));
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}
	}
	function actNo(){
		if(order.level=='00_01'){
			localStorage.setItem('oldLevel',order.level);
			order.level='07';
			localStorage.setItem('order',JSON.stringify(order));
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(order.level=='04_02' || order.level=='07_01'){
			order.noDU='1';
			localStorage.setItem('backLevel',order.level);
			localStorage.setItem('oldLevel',order.level);
			order.level='04_03';
			localStorage.setItem('order',JSON.stringify(order));
			var temp=false;
			order.points.forEach(function(element, index, array){
				if(temp==false && element!='done'){
					//console.log('actNo level 04_02 07_01 select:'+order.level+' point:'+order.pointsNum+' act:select point:'+(index+1));
					order.pointsNum=index+1;
					temp=true;
				}
			});
			localStorage.setItem('order',JSON.stringify(order));
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(order.level=='04_01'){
			localStorage.setItem('oldLevel',order.level);
			order.level='10';
			localStorage.setItem('order',JSON.stringify(order));
			app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
		}else if(order.level=='04_05'){
			order.noDU='1';
			localStorage.setItem('order',JSON.stringify(order));
			app.closeOrder('done');
		 	app.mainView.loadPage('success.html');
		}
	}
	// Управлятор фотками
	function logicController(){
		if(order.level=='01'){
			app.mainView.loadPage('photo.html');
	 	}else if(order.level=='02'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='03'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='04'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='05'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='06'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='07'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='08'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='09'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='10'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='16'){
	 		app.mainView.loadPage('photo.html');
	 	}else if(order.level=='04_04'){
	 		//console.log('level:04_04 point:'+order.pointsNum+' act:done');
			order.points[order.pointsNum-1]='done';
			localStorage.setItem('order',JSON.stringify(order));
			localStorage.setItem('oldLevel',order.level);
	 		order.level='10';
	 		localStorage.setItem('order',JSON.stringify(order));
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
				//console.log('stopTaskNo level select:'+order.level+' point:'+order.pointsNum+' act:select point:'+(index+1));
				order.pointsNum=index+1;
				localStorage.setItem('order',JSON.stringify(order));
				temp=true;
			}
		});
		if(temp==true){
			localStorage.setItem('oldLevel',order.level);
			order.level='04_03';
	 		localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');
	 	}else if(order.noDU=='1'){
	 		app.closeOrder('stop');
	 		app.mainView.loadPage('success.html');
	 		/*localStorage.setItem('oldLevel',order.level);
	 		localStorage.setItem('level','04_05');
	 		app.mainView.loadPage('reloadPage.html?path=takePhoto.html');*/
	 	}else{
	 		order.level='04_05';
	 		localStorage.setItem('order',JSON.stringify(order));
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