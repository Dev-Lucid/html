lucid.html.builder.tags.image = function(){
	lucid.html.tag.call(this);
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.image.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.image.prototype.constructor = lucid.html.builder.tags.image;
