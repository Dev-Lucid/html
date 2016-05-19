lucid.html.base.tags.figureCaption = function(){
	lucid.html.tag.call(this);
	this.tag = 'figcaption';
};
lucid.html.base.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.figureCaption.prototype.constructor = lucid.html.base.tags.figureCaption;
lucid.html.builder.tags.figureCaption = lucid.html.base.tags.figureCaption;
