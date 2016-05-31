lucid.html.bootstrap.tags.badge = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'span';
	this.parameters = ['modifier'];
	this.bootstrapPillPrefix = 'tag';
	this.bootstrapModifierPrefix = 'tag';
	this.bootstrapModifiersAllowed = ['default', 'primary', 'secondary', 'success', 'warning','danger', 'info'];
	this.addClass('tag');
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);
	this.addTrait(lucid.html.bootstrap.traits.Pillable);

};
lucid.html.bootstrap.tags.badge.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.badge = lucid.html.bootstrap.tags.badge;
