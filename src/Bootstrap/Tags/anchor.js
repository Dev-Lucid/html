lucid.html.bootstrap.tags.anchor = function(factory){
	this.factory = factory;
	lucid.html.base.tags.anchor.apply(this, arguments);
	this.tag = 'a';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

};
lucid.html.bootstrap.tags.anchor.prototype = Object.create(lucid.html.base.tags.anchor.prototype);
lucid.html.factory.tags.anchor = lucid.html.bootstrap.tags.anchor;
