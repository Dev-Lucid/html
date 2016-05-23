lucid.html.base.tags.inputUrl = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'url';
};
lucid.html.base.tags.inputUrl.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputUrl = lucid.html.base.tags.inputUrl;
