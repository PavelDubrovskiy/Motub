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
		},
		{
			element: '#toMain',
			event: 'click',
			handler: toMain
		}
	];
	
	function init(query) {
		//$('#navigationNameMain').text('Задачи на сегодня level:'+localStorage.getItem('level'));
		$('#navigationNameMain').text('Задачи на сегодня');
		orders=JSON.parse(localStorage.getItem('orders'));
		$.ajax({
			type: "POST",
			async: true,
			url: app.config.source+"/api/getOrders/",
			data: 'code='+user.code,
			success: function(msg){
				if(msg=='empty'){
					$('#mainPage').html('<div class="b_task_none">На&nbsp;сегодня задач&nbsp;нет</div>');
				}else if(msg==''){
					app.f7.alert('Сервер не отвечает', "Ошибка");
				}else{
					var newOrders=JSON.parse(msg);
					for(var i in newOrders){
						if(orders[i]===undefined){
							orders[i]=newOrders[i];
						}
					}
					for(var i in orders){
						if(newOrders[i]===undefined){
							delete orders[i];
						}
					}
					localStorage.setItem('orders',JSON.stringify(orders));
					view.render({
						bindings: bindings,
						orders:orders
					});
				}
			},
			error: function(msg){
				view.render({
					bindings: bindings,
					orders:orders
				});
			}
		});
	}
	function setOrder(){
		var id=$(this).data('id');
		localStorage.removeItem('order');
		try{
			orders[id].points=JSON.parse(JSON.parse(orders[id].points));
		}catch(e){}
		orders[id].pointsNum=0;
		localStorage.setItem('order',JSON.stringify(orders[id]));
		localStorage.setItem('currentOrder',id);
		if(orders[id].status!='new' && orders[id].status!='remark'){
			localStorage.setItem('level',orders[id].level);
		}
		app.mainView.loadPage('task.html');
	}
	function toMain(){
		localStorage.setItem('level','00');
		app.mainView.loadPage('reloadPage.html?path=main.html');
	}
	return {
		init: init
	};
});