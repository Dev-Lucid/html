lucid.html.base.tags.inputNumber = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'number';
};
lucid.html.base.tags.inputNumber.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputNumber = lucid.html.base.tags.inputNumber;
