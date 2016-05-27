lucid.html.base.tags.inputCheckbox = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('value');
	this.parameters = ['name', 'checked', 'postHtml'];
	this.attributes['type'] = 'checkbox';
	this.addTrait(lucid.html.base.traits.Checkable);

};
lucid.html.base.tags.inputCheckbox.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputCheckbox = lucid.html.base.tags.inputCheckbox;
