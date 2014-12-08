define(["app","js/vc/task/taskView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var order='';
	var bindings = [
		{
			element: '#taskStart',
			event: 'click',
			handler: taskStart
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
		if(user.igroup.path=='mon' && order.status=='new') {
			localStorage.setItem('level','01');
			app.mainView.loadPage('takePhoto.html');
		}else if(user.igroup.path=='fas'){
			if(order.status=='new' || order.status=='play'){
				localStorage.setItem('level','00_01');
			}else if(order.status=='remark'){
				localStorage.setItem('level','08');
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
		app.mainView.loadPage('takePhoto.html');
	}
	
	return {
		init: init
	};
});