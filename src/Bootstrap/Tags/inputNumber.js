lucid.html.bootstrap.tags.inputNumber = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputNumber.apply(this, arguments);
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
lucid.html.bootstrap.tags.inputNumber.prototype = Object.create(lucid.html.base.tags.inputNumber.prototype);
lucid.html.factory.tags.inputNumber = lucid.html.bootstrap.tags.inputNumber;
