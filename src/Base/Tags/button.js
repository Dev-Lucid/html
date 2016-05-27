lucid.html.base.tags.button = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'button';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('name');
	this.parameters = ['child', 'onclick'];
	this.attributes['type'] = 'button';
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

};
lucid.html.base.tags.button.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.button = lucid.html.base.tags.button;
