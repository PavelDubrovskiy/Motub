define(function() {
	function User(values) {
		try{
			tempValues=JSON.parse(localStorage.getItem('User'));
			values=tempValues;
		}catch(e){}
		values = values || {};
		this.id = values['id'] || '';

		this.name = values['name'] || '';
		this.email = values['email'] || '';
		this.password = values['password'] || '';
		this.avatar = values['avatar'] || '';
		this.code = values['code'] || '';
		this.igroup = values['igroup'] || '';
	}

	User.prototype.setValues = function( formInput ) {
		if(formInput['id']){
			localStorage.setItem('User',JSON.stringify(formInput));
		}
		for( var field in formInput ){
			if ( this[field] !== undefined ) {
				this[field] = formInput[field];
			}
		}
	};
	return User;
});