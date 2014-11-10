define(["app", "js/vc/start/startView", "js/utils/user"], function(app, view, User) {
	var $ = Framework7.$;
	var user=new User();
	var bindings = [
		{
			element: '#authorizationSubmit',
			event: 'click',
			handler: auth			
		},
		{
			element: '#exit',
			event: 'click',
			handler: exit			
		}
	];
	
	function init() {
		if(user.id!=''){
			$('.p_start_buttons').hide();
			app.mainView.loadPage('main.html');
		}else{
			$('#authorizationForm').show();
		}
		view.render({
			bindings: bindings
		});
	}
	
	function auth() {
		var formInput = app.f7.formToJSON('#authorizationForm');
		$.ajax({
			type: "POST",
			async: false,
			url: app.config.source+"/api/login/",
			data: formInput,
			success: function(msg){
				if(msg!='error'){
					user.setValues(JSON.parse(msg));
					app.mainView.loadPage('main.html');
				}else{
					app.f7.alert('Неправильно введены логин или пароль', "Ошибка");
				}
			}
		});
	}
	function exit(){
		localStorage.clear();
		navigator.app.exitApp();
	}
	return {
		init: init
	};
});