lucid.html.base.tags.inputRadio = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.addTrait(lucid.html.base.traits.Checkable);

	this.tag = 'input';
	this.parameters = ['name', 'value', 'checked', 'postHtml'];
	this.attributes['type'] = 'radio';
};
lucid.html.base.tags.inputRadio.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputRadio = lucid.html.base.tags.inputRadio;
