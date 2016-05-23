lucid.html.base.tags.inputCheckbox = function(){
	lucid.html.base.tags.input.call(this);
	this.addTrait(lucid.html.base.traits.Checkable);

	this.tag = 'input';
	this.allowedAttributes.push('value');
	this.parameters = ['name', 'checked', 'postHtml'];
	this.attributes['type'] = 'checkbox';
};
lucid.html.base.tags.inputCheckbox.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputCheckbox = lucid.html.base.tags.inputCheckbox;
