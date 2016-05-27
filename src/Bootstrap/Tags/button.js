lucid.html.bootstrap.tags.button = function(factory){
	this.factory = factory;
	lucid.html.base.tags.button.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'button';
	this.parameters = ['modifier', 'onclick'];
	this.title = null;
	this.bootstrapModifierPrefix = 'btn';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'btn';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.attributes['type'] = 'button';
	this.addClass('btn');
};
lucid.html.bootstrap.tags.button.prototype = Object.create(lucid.html.base.tags.button.prototype);
lucid.html.factory.tags.button = lucid.html.bootstrap.tags.button;
