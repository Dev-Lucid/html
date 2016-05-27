lucid.html.bootstrap.tags.inputTelephone = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputTelephone.apply(this, arguments);
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
lucid.html.bootstrap.tags.inputTelephone.prototype = Object.create(lucid.html.base.tags.inputTelephone.prototype);
lucid.html.factory.tags.inputTelephone = lucid.html.bootstrap.tags.inputTelephone;
