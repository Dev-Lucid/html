lucid.html.base.tags.inputEmail = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'email';
};
lucid.html.base.tags.inputEmail.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputEmail = lucid.html.base.tags.inputEmail;
