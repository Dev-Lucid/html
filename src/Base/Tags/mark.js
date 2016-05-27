lucid.html.base.tags.mark = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'mark';
};
lucid.html.base.tags.mark.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.mark = lucid.html.base.tags.mark;
