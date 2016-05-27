lucid.html.base.tags.inputNumber = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.allowedAttributes.push('min');
	this.allowedAttributes.push('max');
	this.parameters = ['name', 'value', 'required', 'placeholder', 'min', 'max'];
	this.attributes['type'] = 'number';
};
lucid.html.base.tags.inputNumber.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputNumber = lucid.html.base.tags.inputNumber;
