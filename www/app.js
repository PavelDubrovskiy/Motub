define('app', ['js/router'], function(Router) {
	Router.init();
	var $ = Framework7.$;
	var level='';
	var f7 = new Framework7({
		modalTitle: ' ',
		/*swipePanelThreshold: 50,
		pushState: true,*/
		animateNavBackIcon: true,
		
		sortable: false,
		swipeBackPageBoxShadow: false,
		swipeBackPage: false
	});
	
	var mainView = f7.addView('.view-main', {
		dynamicNavbar: true
	});
	var config={
		source:'http://test02.one-touch.ru'
	};
	var sendFile=function(order, path, level){
		//todoList
		/*
		Добавить файл для отправки в storage
		var filesForSend=localStorage.getItem('filesForSend');
		if(filesForSend){
			var filesForSend={}
			localStorage.setItem('order',msg);
		}
		JSON.parse(msg);
		*/
			
		var win = function (r) {
			//todoList
			/*
			Убрать файл для отправки в storage
			var filesForSend=localStorage.getItem('filesForSend');
			if(filesForSend){
				var filesForSend={}
				localStorage.setItem('order',msg);
			}
			JSON.parse(msg);
			*/
		
		
			//console.log("Code = " + r.responseCode);
			console.log("Response = " + r.response);
			//console.log("Sent = " + r.bytesSent);
		}
		
		var fail = function (error) {
			//alert("An error has occurred: Code = " + error.code);
			console.log("upload error source " + error.source);
			console.log("upload error target " + error.target);
		}
		
		var options = new FileUploadOptions();
		options.fileKey = "upload";
		options.fileName = path.substr(path.lastIndexOf('/') + 1);
		options.mimeType = "image/jpg";
		
		var params = {};
		params.level = level;
		params.order = order.id;
		params.name = order.fileName+level;
		options.params = params;
		
		var ft = new FileTransfer();
		console.log(options);
		ft.upload(path, encodeURI(config.source+"/api/upload/"), win, fail, options);
	};
	
	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		config: config,
		level: level,
		sendFile: sendFile
	};
});

// Расширение прототипа Function для упрощения передачи контекста в функцию
Function.prototype.bind = function (scope) {
	var fn = this;
	return function () {
		return fn.apply(scope, arguments);
	};
};