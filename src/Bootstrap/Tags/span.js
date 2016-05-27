lucid.html.bootstrap.tags.span = function(factory){
	this.factory = factory;
	lucid.html.base.tags.span.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'span';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.span.prototype = Object.create(lucid.html.base.tags.span.prototype);
lucid.html.factory.tags.span = lucid.html.bootstrap.tags.span;
