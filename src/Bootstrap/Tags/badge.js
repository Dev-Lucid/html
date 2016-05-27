lucid.html.bootstrap.tags.badge = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);
	this.addTrait(lucid.html.bootstrap.traits.Pillable);

	this.tag = 'span';
	this.parameters = ['modifier'];
	this.bootstrapModifierPrefix = 'label';
	this.bootstrapModifiersAllowed = ['default', 'primary', 'secondary', 'success', 'warning','danger', 'info'];
	this.addClass('label');
};
lucid.html.bootstrap.tags.badge.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.badge = lucid.html.bootstrap.tags.badge;
