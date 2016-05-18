lucid.html.builder.tags.image = function(){
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.image.prototype = new lucid.html.tag();
