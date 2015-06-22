define(["app","js/vc/task/taskView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var order='';
	var taskPhotoBrowser = null;
	var bindings = [
		{
			element: '#taskStart',
			event: 'click',
			handler: taskStart
		},
		{
			element: '.button-down',
			event: 'click',
			handler: scrollDown
		},
		{
			element: '#taskImg',
			event: 'click',
			handler: openPhoto
		}
	];
	

	function init(query) {
		//$('#navigationNameTask').text('Задача level:'+localStorage.getItem('level'));
		$('#navigationNameTask').text('Задача');
		var currentOrder=localStorage.getItem('currentOrder');
		order=JSON.parse(localStorage.getItem('order'));
		
		view.render({
			bindings: bindings,
			order:order
		});
		
		try{
			var img = order.files['00']['path'];
			taskPhotoBrowser = app.f7.photoBrowser({
				zoom: true,
				maxZoom: 3,
				theme: 'dark',
				swipeToClose: false,
				photos: [img],
				backLinkText: 'Закрыть',
				toolbar: false,
				navbar: false,
				onOpen: function(pb) {
					pb.toggleZoom();
					$('.photo-browser-slide').once('click', pb.close);
				},
				onClose: function(pb) {
					pb.toggleZoom();
				},
				onDoubleTap: function() {
					console.log(taskPhotoBrowser);
					taskPhotoBrowser.toggleZoom();
				}
			});
		}catch(e){}		
	}
	
	// Открыть фото
	function openPhoto() {
		taskPhotoBrowser.open();
	}
	
	// Проскроллить страницу в самый низ
	function scrollDown() {
		var $wrap = $('.page-on-center .page-content'),
			$cnt = $wrap.find('.scroll-cnt');
		$wrap.scrollTo(0, $cnt.outerHeight(), 200);
	}
	
	// Клик на кнопку начала задания
	function startClick() {
		app.f7.modal({
			text: 'Возможно&nbsp;ли приступить к&nbsp;работе?',
			buttons: [
				{
					text: 'Нет'
				},
				{
					text: 'Да',
					bold: true,
					onClick: taskStart
				}
			]
		});
	}
	
	// Переход к началу задания
	function taskStart() {
		if(user.igroup.path=='mon' && order.level=='06_03'){
			order.level='06';
			localStorage.setItem('order',JSON.stringify(order));
		}else if(user.igroup.path=='mon' && order.level=='00_01'){
			order.level='01';
			localStorage.setItem('order',JSON.stringify(order));
		}else if(user.igroup.path=='fas'){
			if(order.status=='remark' && order.level=='00_01'){
				order.level='08';
				localStorage.setItem('order',JSON.stringify(order));
			}
			if(localStorage.getItem('level')=='06_03'){
				order.level='04_05';
				localStorage.setItem('order',JSON.stringify(order));
			}
			if(order.points=='""'){
				order.points=['play'];
				order.pointsNum=1;
			}else if(order.pointsNum==0){
				var temp=false;
				order.points.forEach(function(element, index, array){
					if(temp==false && (element=='stop' || element=='play')){
						order.pointsNum=index+1;
						temp=true;
					}
				});
			}
			localStorage.setItem('order',JSON.stringify(order));
		}
		localStorage.setItem('backLevel','');
		app.mainView.loadPage('takePhoto.html');
	}
	
	return {
		init: init
	};
});