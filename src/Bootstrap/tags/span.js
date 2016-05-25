lucid.html.bootstrap.tags.span = function(){
	lucid.html.base.tags.span.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'span';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.span.prototype = Object.create(lucid.html.base.tags.span.prototype);
lucid.html.builder.tags.span = lucid.html.bootstrap.tags.span;
