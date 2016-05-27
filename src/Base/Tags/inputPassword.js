lucid.html.base.tags.inputPassword = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required'];
	this.attributes['type'] = 'password';
};
lucid.html.base.tags.inputPassword.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputPassword = lucid.html.base.tags.inputPassword;
