lucid.html.bootstrap.tags.inputTextarea = function(){
	lucid.html.base.tags.inputTextarea.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'inputTextarea';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputTextarea.prototype = Object.create(lucid.html.base.tags.inputTextarea.prototype);
lucid.html.builder.tags.inputTextarea = lucid.html.bootstrap.tags.inputTextarea;
