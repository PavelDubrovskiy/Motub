define(["app","js/vc/success/successView"], function(app, view) {
	var $ = Framework7.$;
	var order, orders;
	var bindings = [];
	document.addEventListener("backbutton", onBackButtonFire, false); 
	function onBackButtonFire(){
		return false;
		//localStorage.setItem('level',localStorage.getItem('oldLevel'));
	}
	function init(query) {
		order=JSON.parse(localStorage.getItem('order'));
		orders=JSON.parse(localStorage.getItem('orders'));
		//$('#navigationNameSuccess').text('УН: '+order.uid+' level:'+localStorage.getItem('level'));
		$('#navigationNameSuccess').text('УН: '+order.uid);
		var next=0;
		var remark=false;
		for(var i in orders){
			if(orders[i].address==order.address && orders[i].status=='new' && orders[i].id!=order.id){
				next=orders[i].id;
			}
		}
		if(next!=0){
			localStorage.setItem('currentOrder',next);
			localStorage.setItem('order',JSON.stringify(orders['id'+next]));
			localStorage.setItem('oldLevel',localStorage.getItem('level'));
			localStorage.setItem('showLevel','06_01');
			$('#pageDescriptionSuccess').html(app.settings.description['06_01']);
			$('#successSubmit').click(function(){app.mainView.loadPage('task.html');});
			$('#successSubmitText').text('Перейти к заданию');
		}else{
			for(var i in orders){
				if(orders[i].status=='remark' || orders[i].status=='stop'){
					remark=true;
				}
			}
			if(remark==true){
				localStorage.setItem('oldLevel',order.level);
				localStorage.setItem('showLevel','06_02');
				$('#pageDescriptionSuccess').html(app.settings.description['06_02']);
				$('#successSubmit').click(function(){app.mainView.loadPage('main.html');});
				$('#successSubmitText').text('Перейти к задачам');
			}else{
				localStorage.setItem('oldLevel',order.level);
				localStorage.setItem('showLevel','06_03');
				$('#pageDescriptionSuccess').html(app.settings.description['06_03']);
				$('#successSubmit').click(function(){app.mainView.loadPage('main.html');});
				$('#successSubmitText').text('Перейти к списку задач');
			}
		}
		view.render({
			bindings: bindings
		});
	}	
	return {
		init: init
	};
});