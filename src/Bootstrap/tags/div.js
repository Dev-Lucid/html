lucid.html.bootstrap.tags.div = function(){
	lucid.html.base.tags.span.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'div';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.div.prototype = Object.create(lucid.html.base.tags.span.prototype);
lucid.html.builder.tags.div = lucid.html.bootstrap.tags.div;
