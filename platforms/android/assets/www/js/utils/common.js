define( function() {
	var $ = Framework7.$;

	// Замена содержимого элемента прелоадером
	function setPreloader(selector) {
		$(selector).html('<span class="preloader"></span>');
	}
	
	// Навешивание обработчиков событий на элементы
	function bindEvents(bindings) {
		for (var i in bindings) {
			if( !bindings[i].delegateTo ) {
				$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			}else{
				$(bindings[i].element).on(bindings[i].event, bindings[i].delegateTo, bindings[i].handler);
			}
		}
	}
	
	// Загрузка картинки "на лету"
	function picLoad() {
		var 	file = this.files[0],
				imageType = /image.*/,
				img = document.createElement("img"),
				reader = new FileReader(),
				src='',
				
				$upic = $(".b_upic_face"),
				$tx = $upic.find(".b_upic_tx span"),
				$preloader = $upic.find(".preloader"),
				$upic_return= $(".b_upic_return")
		;
		
		if ( !file.type.match(imageType) ) {
			app.f7.alert("Выбранный файл не является изображением.");
		}else{
			$upic.css({
				backgroundImage: ""
			});
			
			$preloader.show();
			
			img.file = file;
			
			reader.onload = ( function( aImg ) {
				return function( e ) {
					$upic.css({
						backgroundImage: "url(" + e.target.result + ")",
						backgroundSize: "cover"
					});
					$tx.text("Сменить");
					$preloader.hide();
					$upic_return.val(e.target.result);					
				};
			})( img );
			reader.readAsDataURL( file );
		}
	}
	
	return {
		setPreloader: setPreloader,
		bindEvents: bindEvents,
		picLoad: picLoad
	};	
});