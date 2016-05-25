lucid.html.bootstrap.tags.paragraph = function(){
	lucid.html.base.tags.paragraph.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'p';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.paragraph.prototype = Object.create(lucid.html.base.tags.paragraph.prototype);
lucid.html.builder.tags.paragraph = lucid.html.bootstrap.tags.paragraph;
