lucid.html.base.tags.image = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.image.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.image = lucid.html.base.tags.image;
