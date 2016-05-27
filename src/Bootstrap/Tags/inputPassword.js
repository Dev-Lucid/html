lucid.html.bootstrap.tags.inputPassword = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputPassword.apply(this, arguments);
	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

};
lucid.html.bootstrap.tags.inputPassword.prototype = Object.create(lucid.html.base.tags.inputPassword.prototype);
lucid.html.factory.tags.inputPassword = lucid.html.bootstrap.tags.inputPassword;
