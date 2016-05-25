lucid.html.base.tags.inputPassword = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required'];
	this.attributes['type'] = 'password';
};
lucid.html.base.tags.inputPassword.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputPassword = lucid.html.base.tags.inputPassword;
