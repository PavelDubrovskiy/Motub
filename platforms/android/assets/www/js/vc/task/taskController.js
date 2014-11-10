define(["app","js/vc/task/taskView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var order='';
	var bindings = [
		{
			element: '#taskStart',
			event: 'click',
			handler: startClick
		}
	];

	function init(query) {
		currentOrder=localStorage.getItem('currentOrder');
		$.ajax({
			type: "POST",
			async: false,
			url: app.config.source+"/api/getOrder/",
			data: 'id='+currentOrder+'&code='+user.code,
			success: function(msg){
				if(msg=='' || msg=='error'){
					app.f7.alert('Сервер не отвечает', "Ошибка");
				}else{
					order=JSON.parse(msg);
					localStorage.setItem('order',msg);
					view.render({
						bindings: bindings,
						order:order
					});
				}
			}
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
		app.mainView.loadPage('takePhoto.html');
	}
	
	return {
		init: init
	};
});