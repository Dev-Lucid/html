lucid.html.base.tags.figureCaption = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'figcaption';
};
lucid.html.base.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.figureCaption = lucid.html.base.tags.figureCaption;
