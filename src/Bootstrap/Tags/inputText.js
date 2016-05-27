lucid.html.bootstrap.tags.inputText = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputText.apply(this, arguments);
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
lucid.html.bootstrap.tags.inputText.prototype = Object.create(lucid.html.base.tags.inputText.prototype);
lucid.html.factory.tags.inputText = lucid.html.bootstrap.tags.inputText;
