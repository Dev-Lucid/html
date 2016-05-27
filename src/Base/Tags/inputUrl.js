lucid.html.base.tags.inputUrl = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'url';
};
lucid.html.base.tags.inputUrl.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputUrl = lucid.html.base.tags.inputUrl;
