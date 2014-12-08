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
		//$('#navigationNamePhoto').text('УН: '+order.uid+' level:'+localStorage.getItem('level')+' num:'+order.pointsNum);
		$('#navigationNamePhoto').text('УН: '+order.uid);
		$('#pageDescriptionPhoto').text(app.photoNames['name'+localStorage.getItem('level')]);
		try{
			path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
			$('#beforeImg').attr('src',path);
		}catch(e){}
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
	function saveNewPhoto() {
		if(app.currentFile!=''){
			var path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
			app.sendFile(order, path, localStorage.getItem('level'));
		}
		logicController();
	}
	
	function captureSuccess(mediaFiles){
		app.currentFile=mediaFiles[0];
		path='file:///'+app.currentFile.fullPath.substr(6,app.currentFile.fullPath.length);
		$('#beforeImg').attr('src',path);
	}
	
	function captureError(error){
		app.f7.alert('Сфотографируйте еще раз', "Ошибка");
	}
	function logicController(){
		localStorage.setItem('oldLevel',localStorage.getItem('level'));
		if(localStorage.getItem('level')=='01'){
			localStorage.setItem('level','03');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='02'){
	 		localStorage.setItem('level','04');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='03'){
	 		localStorage.setItem('level','05');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='04'){
	 		localStorage.setItem('level','04_01');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='05'){
	 		localStorage.setItem('level','06');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='06'){
	 		app.closeOrder('done');
 			app.mainView.loadPage('success.html');
	 	}else if(localStorage.getItem('level')=='07'){
	 		console.log('level:07 point:'+order.pointsNum+' act:done');
			order.points[order.pointsNum-1]='done';
			localStorage.setItem('order',JSON.stringify(order));
	 		localStorage.setItem('level','07_01');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='08'){
	 		localStorage.setItem('level','09');
	 		app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='09'){
	 		app.closeOrder('done');
 			app.mainView.loadPage('success.html');
	 	}else if(localStorage.getItem('level')=='10'){
	 		console.log('level:10 point:'+order.pointsNum+' act:done');
			order.points[order.pointsNum-1]='done';
			localStorage.setItem('order',JSON.stringify(order));
			var temp=false;
			order.points.forEach(function(element, index, array){
				if(temp==false && element!='done'){
					console.log('level:10 point:'+order.pointsNum+' act:select point:'+(index+1));
					order.pointsNum=index+1;
					localStorage.setItem('order',JSON.stringify(order));
					temp=true;
				}
			});
			if(temp==true){
				localStorage.setItem('level','04_03');
		 	}else{
		 		localStorage.setItem('level','04_05');
	 			
		 	}
		 	app.mainView.loadPage('takePhoto.html');
	 	}else if(localStorage.getItem('level')=='16'){
	 		app.closeOrder('error');
			app.mainView.loadPage('main.html');
	 	}
	}
	return {
		init: init
	};
});