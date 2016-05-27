lucid.html.bootstrap.tags.inputSelect = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputSelect.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'select';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputSelect.prototype = Object.create(lucid.html.base.tags.inputSelect.prototype);
lucid.html.factory.tags.inputSelect = lucid.html.bootstrap.tags.inputSelect;
