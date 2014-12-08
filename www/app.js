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
		name02: 'ДО ДЕМОНТАЖА',
		name03: 'КРЕПЁЖ ГОТОВ',
		name04: 'ДЕМОНТАЖ ГОТОВ',
		name05: 'ФИНАЛ-МОНТАЖ',
		name06: 'ФАСАД-ЗАЯВКА',
		name07: 'ОБНАРУЖЕН-ПРИСВОИТЬ УН',
		name08: 'ДО НАЧАЛА РАБОТ',
		name09: 'РЕЗУЛЬТАТ РАБОТ',
		name10: 'ФИНАЛ-ФАСАД',
		name16: 'СТОП-НЕШТАТНАЯ',
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
	
	
	var win = function (r) {
		var filesFS=JSON.parse(localStorage.getItem('filesFS'));
		for(var i in filesFS){
			console.log(filesFS[i].params.name+'=='+r.response);
			if(filesFS[i].params.name==r.response){
				//delete filesFS[i];
				 filesFS[i].params.status = 'sent';
			}
		}
		localStorage.setItem('filesFS',JSON.stringify(filesFS));
		/*console.log("Code = " + r.responseCode);
		console.log("Response = " + r.response);
		console.log("Sent = " + r.bytesSent);*/
	}
	
	var fail = function (error) {
		console.log("An error has occurred: Code = " + error.code);
		console.log("upload error source " + error.source);
		console.log("upload error target " + error.target);
	}
	var sendFile=function(order, path, level){
		var filesFS=JSON.parse(localStorage.getItem('filesFS'));
		if(filesFS===null){
			filesFS=[];
		}
		var options = new FileUploadOptions();
		options.fileKey = "upload";
		options.fileName = path.substr(path.lastIndexOf('/') + 1);
		options.mimeType = "image/jpg";
		
		var params = {};
		params.level = level;
		params.order = order.id;
		params.path = path;
		params.status = 'new';
		var today = new Date();
		var dateString = today.getFullYear()+'-'+today.getMonth()+'-'+('0'+today.getDate()).slice(-2)+'-'+today.getHours()+today.getMinutes();
		params.name = order.fileName+dateString+'_'+user.name+'_'+photoNames['name'+level];
		params.programName = order.id+'_'+level+'_'+user.name+'_'+order.pointsNum;
		options.params = params;
		var ft = new FileTransfer();
		//console.log(options);
		filesFS.push(options);
		localStorage.setItem('filesFS',JSON.stringify(filesFS));
		ft.upload(path, encodeURI(config.source+"/api/upload/"), win, fail, options);
	};
	var sendFilesFS=function(){
		var filesFS=JSON.parse(localStorage.getItem('filesFS'));
		if(filesFS.length>0){
			filesFS.forEach(function(element, index, array) {
				var path=element.params.path;
				var options=element.options;
				var ft = new FileTransfer();
				ft.upload(path, encodeURI(config.source+"/api/upload/"), win, fail, options);
			});
		}
	};
	var closeOrder=function(status){
		var order=JSON.parse(localStorage.getItem('order'));
		var user=JSON.parse(localStorage.getItem('User'));
		var orders=JSON.parse(localStorage.getItem('orders'));
		var level=localStorage.getItem('level');
		var lastLevel=localStorage.getItem('lastLevel');
		order.status=status;
		order.level=level;
		if(lastLevel){
			order.level=lastLevel;
		}
		orders[order.id]=order;
		localStorage.setItem('order',JSON.stringify(order));
		localStorage.setItem('orders',JSON.stringify(orders));
		$.ajax({
			type: "POST",
			async: true,
			url: config.source+"/api/closeOrder/",
			data: 'id='+order.id+'&code='+user.code+'&status='+status+'&level='+level+'&lastLevel='+lastLevel+'&points='+JSON.stringify(order.points),
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
		stoppedShow: false,
		sendFilesFS: sendFilesFS
	};
});

// Расширение прототипа Function для упрощения передачи контекста в функцию
Function.prototype.bind = function (scope) {
	var fn = this;
	return function () {
		return fn.apply(scope, arguments);
	};
};