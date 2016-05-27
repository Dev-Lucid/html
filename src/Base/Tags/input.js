lucid.html.base.tags.input = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'input';
	this.allowQuickClose = true;
	this.allowChildren = false;
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Readonlyable);
	this.addTrait(lucid.html.base.traits.Requireable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

};
lucid.html.base.tags.input.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.input = lucid.html.base.tags.input;
