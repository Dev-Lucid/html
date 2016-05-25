lucid.html.base.tags.image = function(){
	lucid.html.tag.call(this);
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.image.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.image = lucid.html.base.tags.image;
