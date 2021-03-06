define(["app","js/vc/main/mainView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var orders={};
	var clicks=0;
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
		},
		{
			element: '#navigationNameMain',
			event: 'click',
			handler: countClick
		}
	];
	var mainInterval=setInterval(init, 1000*60*3);
	
	function init(query) {
		try{
			clearInterval(mainInterval);
		}catch(e){}
		localStorage.setItem('lastLevel','');
		//$('#navigationNameMain').text('Задачи на сегодня level:'+localStorage.getItem('level'));
		$('#navigationNameMain').text('Бригада '+user.name);
		orders=JSON.parse(localStorage.getItem('orders'));
		var order=JSON.parse(localStorage.getItem('order'));
		console.log(order);
		try{
			orders['id'+order.id]=order;
		}catch(e){};
		console.log(orders);
		$.ajax({
			type: "POST",
			async: true,
			url: app.config.source+"/api/getOrders/",
			data: 'code='+user.code,
			success: function(msg){
				if(msg=='empty'){
					view.render({
						bindings: bindings
					});
					$('#mainPage').html('<div class="b_task_none">На&nbsp;сегодня задач&nbsp;нет</div>');
				}else if(msg==''){
					app.f7.alert('Сервер не отвечает', "Ошибка");
				}else{
					var newOrders=JSON.parse(msg);
					if(orders!==null){
						for(var i in newOrders){
							if(orders[i]===undefined){
								orders[i]=newOrders[i];
							}else if(orders[i].fdate!=newOrders[i].fdate){
								orders[i]=newOrders[i];
							}
						}
						for(var i in orders){
							if(newOrders[i]===undefined){
								delete orders[i];
							}
						}
					}else{
						orders=newOrders;
					}
					localStorage.setItem('orders',JSON.stringify(orders));
					view.render({
						bindings: bindings,
						orders:orders
					});
				}
			},
			error: function(msg){
				app.f7.alert('Сервер не отвечает', "Ошибка");
				/*app.f7.alert('Сервер не отвечает', "Ошибка");
				view.render({
					bindings: bindings,
					orders:orders
				});*/
			}
		});
	}
	function setOrder(){
		clearInterval(mainInterval);
		var id=$(this).data('id');
		try{
			orders['id'+id].points=JSON.parse(JSON.parse(orders['id'+id].points));
		}catch(e){}
		localStorage.setItem('order',JSON.stringify(orders['id'+id]));
		app.mainView.loadPage('task.html');
	}
	function toMain(){
		localStorage.setItem('showLevel','');
		app.mainView.loadPage('reloadPage.html?path=main.html');
	}
	function countClick(){
		clicks++;
		if(clicks>4){
			app.f7.prompt('Введите код',
				function(code){
					if(code=='2159'){
						clicks=0;
						app.mainView.loadPage('processManager.html');
					}else{
						clicks=0;
					}
				}
			);
		}
	}
	return {
		init: init
	};
});