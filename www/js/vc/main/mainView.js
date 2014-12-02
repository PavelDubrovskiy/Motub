define(["app","js/utils/common"], function(app, utils) {
	var $ = Framework7.$;
	var template = $('#mainPageTemplate').html();
	var compiledTemplate = Template7.compile(template);
	function render(params){
		var orders={nps:[],remark:[]};
		if(localStorage.getItem('level')=='06_02'){
			for(var i in params.orders){
				params.orders[i].statusRus=app.statusNames[params.orders[i].status];
				if(params.orders[i].status=='stop'){
					orders.nps.push(params.orders[i]);
				}else if(params.orders[i].status=='remark'){
					orders.remark.push(params.orders[i]);
				}
			}
		}else{
			for(var i in params.orders){
				params.orders[i].statusRus=app.statusNames[params.orders[i].status];
				if(params.orders[i].status=='new' || params.orders[i].status=='play' || params.orders[i].status=='stop'){
					orders.nps.push(params.orders[i]);
				}else if(params.orders[i].status=='remark'){
					orders.remark.push(params.orders[i]);
				}
			}
		}
		html = compiledTemplate(orders);
		$('#mainPage').html(html);
		if(localStorage.getItem('level')=='06_02'){
			$('#toMainDiv').removeClass('st_hidden');
		}
		utils.bindEvents(params.bindings);
		if(orders.remark.length==0){
			$('.remarkHide').hide();
		}
	}

	return {
		render: render
	};
});