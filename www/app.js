define('app', ['js/router',"js/utils/user"], function(Router, User) {
	Router.init();
	var $ = Framework7.$;
	var user=new User();
	//todo
	/*if(localStorage.getItem('order')==''){
		localStorage.setItem('level','00');
	}*/
	localStorage.setItem('level','00');
	var f7 = new Framework7({
		modalTitle: ' ',
		/*swipePanelThreshold: 50,*/
		pushState: true,
		animateNavBackIcon: true,
		
		sortable: false,
		swipeBackPageBoxShadow: false,
		swipeBackPage: false
	});
	
	var mainView = f7.addView('.view-main', {
		dynamicNavbar: true
	});
	var photoNames={
		name00: 'ПРИВЯЗКА',
		name01: 'СТАТУС ДО МОНТАЖА',
		name02: 'ДЕМОНТАЖ ГОТОВ',
		name03: 'КРЕПЁЖ ГОТОВ',
		name04: 'ОТВЕРСТИЯ ЗАШПАКЛЁВАНЫ',
		name05: 'ФИНАЛ-МОНТАЖ',
		name06: 'ФАСАД-ЗАЯВКА',
		name07: 'СТАТУС ДО ФАСАДА',
		name08: 'ГОТОВО ДЛЯ ОКРАСКИ',
		name09: 'ФИНАЛ-ФАСАД',
		name10: 'НАРУШЕНИЕ-МОНТАЖ',
		name11: 'ИСПРАВЛЕНО-МОНТАЖ',
		name12: 'НАРУШЕНИЕ-ФАСАД',
		name13: 'ИСПРАВЛЕНО-ФАСАД',
		name14: 'ОБНАРУЖЕН-ПРИСВОИТЬ УН',
		name15: 'ДЕМОНТАЖ-ПРИСВОИТЬ УН',
		name16: 'СТОП-НЕШТАТНАЯ',
		name17: 'ТРАНЗИТ-НЕШТАТНАЯ',
		name18: 'ЗАПРОЕКТИРОВАНО'
	};
	var statusNames={
		new: 'Новый',
		play: 'В работе',
		remark: 'Замечание',
		stop: 'Отложена',
		error: 'Нештатная ситуация',
		done: 'Выполнен'
	};
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
		var today = new Date();
		var dateString = today.getFullYear()+'-'+today.getMonth()+'-'+('0'+today.getDate()).slice(-2)+'-'+today.getHours()+today.getMinutes();
		params.name = order.fileName+dateString+'_'+user.name+'_'+photoNames['name'+level];
		options.params = params;
		var ft = new FileTransfer();
		console.log(options);
		ft.upload(path, encodeURI(config.source+"/api/upload/"), win, fail, options);
	};
	var closeOrder=function(status){
		var order=JSON.parse(localStorage.getItem('order'));
		var user=JSON.parse(localStorage.getItem('User'));
		var orders=JSON.parse(localStorage.getItem('orders'));
		var level=localStorage.getItem('level');
		orders[order.id].status=status;
		localStorage.setItem('orders',JSON.stringify(orders));
		$.ajax({
			type: "POST",
			async: true,
			url: config.source+"/api/closeOrder/",
			data: 'id='+order.id+'&code='+user.code+'&status='+status+'&level='+level,
			success: function(msg){

			}
		});
	}
	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		config: config,
		sendFile: sendFile,
		closeOrder: closeOrder,
		currentFile: '',
		photoNames: photoNames,
		statusNames: statusNames,
		stopped: '',
		stoppedShow: false
	};
});

// Расширение прототипа Function для упрощения передачи контекста в функцию
Function.prototype.bind = function (scope) {
	var fn = this;
	return function () {
		return fn.apply(scope, arguments);
	};
};