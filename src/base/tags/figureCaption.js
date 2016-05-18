lucid.html.builder.tags.figureCaption = function(){
	lucid.html.tag.call(this);
	this.tag = 'figcaption';
};
lucid.html.builder.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figureCaption.prototype.constructor = lucid.html.builder.tags.figureCaption;
