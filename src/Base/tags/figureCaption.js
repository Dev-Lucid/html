lucid.html.base.tags.figureCaption = function(){
	lucid.html.tag.call(this);
	this.tag = 'figcaption';
};
lucid.html.base.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figureCaption = lucid.html.base.tags.figureCaption;
