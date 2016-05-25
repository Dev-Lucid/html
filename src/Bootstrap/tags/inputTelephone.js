lucid.html.bootstrap.tags.inputTelephone = function(){
	lucid.html.base.tags.inputTelephone.call(this);
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
lucid.html.builder.tags.inputTelephone = lucid.html.bootstrap.tags.inputTelephone;
