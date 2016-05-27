lucid.html.base.tags.article = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'article';
};
lucid.html.base.tags.article.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.article = lucid.html.base.tags.article;
