lucid.html.base.tags.inputRadio = function(){
	lucid.html.base.tags.input.call(this);
	this.addTrait(lucid.html.base.traits.Checkable);

	this.tag = 'input';
	this.parameters = ['name', 'value', 'checked', 'postHtml'];
	this.attributes['type'] = 'radio';
};
lucid.html.base.tags.inputRadio.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputRadio = lucid.html.base.tags.inputRadio;
