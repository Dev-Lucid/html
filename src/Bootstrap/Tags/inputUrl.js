lucid.html.bootstrap.tags.inputUrl = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputUrl.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputUrl.prototype = Object.create(lucid.html.base.tags.inputUrl.prototype);
lucid.html.factory.tags.inputUrl = lucid.html.bootstrap.tags.inputUrl;
