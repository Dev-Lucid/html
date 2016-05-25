lucid.html.base.tags.inputTelephone = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'tel';
};
lucid.html.base.tags.inputTelephone.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputTelephone = lucid.html.base.tags.inputTelephone;
