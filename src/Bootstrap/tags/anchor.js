lucid.html.bootstrap.tags.anchor = function(){
	lucid.html.base.tags.anchor.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'a';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.anchor.prototype = Object.create(lucid.html.base.tags.anchor.prototype);
lucid.html.builder.tags.anchor = lucid.html.bootstrap.tags.anchor;
