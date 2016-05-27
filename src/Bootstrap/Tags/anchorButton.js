lucid.html.bootstrap.tags.anchorButton = function(factory){
	this.factory = factory;
	lucid.html.base.tags.button.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'a';
	this.parameters = ['modifier', 'onclick'];
	this.title = null;
	this.bootstrapModifierPrefix = 'btn';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info'];
	this.bootstrapSizePrefix = 'btn';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.attributes['role'] = 'button';
	this.attributes['type'] = null;
	this.addClass('btn');
};
lucid.html.bootstrap.tags.anchorButton.prototype = Object.create(lucid.html.base.tags.button.prototype);
lucid.html.factory.tags.anchorButton = lucid.html.bootstrap.tags.anchorButton;
