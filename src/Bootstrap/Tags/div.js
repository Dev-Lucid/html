lucid.html.bootstrap.tags.div = function(factory){
	this.factory = factory;
	lucid.html.base.tags.div.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'div';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.div.prototype = Object.create(lucid.html.base.tags.div.prototype);
lucid.html.factory.tags.div = lucid.html.bootstrap.tags.div;