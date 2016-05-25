lucid.html.base.tags.inputEmail = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'email';
};
lucid.html.base.tags.inputEmail.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputEmail = lucid.html.base.tags.inputEmail;
