lucid.html.bootstrap.tags.button = function(){
	lucid.html.base.tags.button.call(this);
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
lucid.html.builder.tags.button = lucid.html.bootstrap.tags.button;
