lucid.html.base.tags.inputText = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'text';
};
lucid.html.base.tags.inputText.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputText = lucid.html.base.tags.inputText;
