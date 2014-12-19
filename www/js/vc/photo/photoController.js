define(["app","js/vc/photo/photoView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var order;
	var bindings = [
		{
			element: '#takeNewPhoto',
			event: 'click',
			handler: takePhoto
		},
		{
			element: '#saveNewPhoto',
			event: 'click',
			handler: saveNewPhoto
		}
	];
	document.addEventListener("backbutton", onBackButtonFire, false); 
	function onBackButtonFire(){
		app.mainView.loadPage('takePhoto.html');
	}
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		$('#navigationNamePhoto').text('УН: '+order.uid);
		$('#pageDescriptionPhoto').text(app.photoNames['name'+order.level]);
		try{
			if(app.currentFile.fullPath.substr(0,8)!='file:///'){
				path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
			}else{
				path=app.currentFile.fullPath;
			}
			$('#beforeImg').attr('src',path);
		}catch(e){}
		view.render({
			bindings: bindings
		});
		
		app.mainView.showToolbar();
	}
	
	// Делаем фото
	function takePhoto() {
	 	try{
			//navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
			navigator.camera.getPicture(cameraSuccess, cameraError, app.config.cameraOptions);
		}catch(e){
			app.mainView.loadPage('photo.html');
		}
	}
	
	// Нештатная ситуация
	function saveNewPhoto() {
		if(app.currentFile!=''){
			var path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
			app.sendFile(order, path, order.level);
		}
		logicController();
	}
	
	function cameraSuccess(fileURI){
		//app.currentFile=mediaFiles[0];
		//path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
		app.currentFile={fullPath: fileURI};
		path=fileURI;
		$('#beforeImg').attr('src',path);
	}
	
	function cameraError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function logicController(){
		localStorage.setItem('oldLevel',order.level);
		console.log()
		if(order.level=='01'){
			order.level='03';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='02'){
	 		order.level='04';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='03' && order.status!='remark'){
	 		order.level='05';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='03' && order.status=='remark'){
	 		order.level='11';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='04'){
	 		order.level='04_01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='05'){
	 		order.level='06';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='06'){
	 		app.closeOrder('done');
 			app.mainView.loadPage('success.html');
	 	}else if(order.level=='07'){
	 		//console.log('level:07 point:'+order.pointsNum+' act:done');
			order.points[order.pointsNum-1]='done';
	 		order.level='07_01';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='08'){
	 		order.level='09';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='09'){
	 		app.closeOrder('done');
 			app.mainView.loadPage('success.html');
	 	}else if(order.level=='10'){
	 		//console.log('level:10 point:'+order.pointsNum+' act:done');
		 	order.points[order.pointsNum-1]='done';
			localStorage.setItem('order',JSON.stringify(order));
		 	if(order.noDU=='1'){
		 		var temp=false;
				order.points.forEach(function(element, index, array){
					if(temp==false && element!='done'){
						//console.log('level:10 point:'+order.pointsNum+' act:select point:'+(index+1));
						order.pointsNum=index+1;
						localStorage.setItem('order',JSON.stringify(order));
						temp=true;
					}
				});
				if(temp==true){
					localStorage.setItem('backLevel',order.level);
					order.level='04_03';
					localStorage.setItem('order',JSON.stringify(order));
					app.mainView.loadPage('takePhoto.html');
			 	}else{
			 		app.closeOrder('done');
	 				app.mainView.loadPage('success.html');
			 	}
		 	}else{
		 		order.level='07_01';
				localStorage.setItem('order',JSON.stringify(order));
		 		app.mainView.loadPage('takePhoto.html');
		 	}
	 	}else if(order.level=='11'){
	 		order.level='06';
			localStorage.setItem('order',JSON.stringify(order));
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(order.level=='16'){
	 		app.closeOrder('error');
			app.mainView.loadPage('main.html');
	 	}
	}
	return {
		init: init
	};
});