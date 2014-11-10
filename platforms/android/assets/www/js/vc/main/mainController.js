define(["app","js/vc/main/mainView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var orders='';
	var bindings = [
		{
			element: '#mainPage',
			event: 'click',
			handler: setOrder,
			delegateTo: '.item-link'
		}
	];
	
	function init(query) {
		$.ajax({
			type: "POST",
			async: false,
			url: app.config.source+"/api/getOrders/",
			data: 'code='+user.code,
			success: function(msg){
				if(msg=='empty'){
					app.f7.alert('На сегодня задач нет', "Внимание!");
				}else if(msg==''){
					app.f7.alert('Сервер не отвечает', "Ошибка");
				}else{
					orders=JSON.parse(msg);
					view.render({
						bindings: bindings,
						orders:orders
					});
				}
			}
		});
	}
	
	function setOrder(){
		localStorage.setItem('currentOrder',$(this).data('id'));
	}
	
	return {
		init: init
	};
});