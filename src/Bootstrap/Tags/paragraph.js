lucid.html.bootstrap.tags.paragraph = function(factory){
	this.factory = factory;
	lucid.html.base.tags.paragraph.apply(this, arguments);
	this.tag = 'p';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
	this.addTrait(lucid.html.bootstrap.traits.Gridable);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

};
lucid.html.bootstrap.tags.paragraph.prototype = Object.create(lucid.html.base.tags.paragraph.prototype);
lucid.html.factory.tags.paragraph = lucid.html.bootstrap.tags.paragraph;
