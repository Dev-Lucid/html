lucid.html.base.tags.input = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.base.traits.Disableable);

	this.tag = 'input';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.input.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.input = lucid.html.base.tags.input;
