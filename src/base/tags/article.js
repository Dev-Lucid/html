lucid.html.builder.tags.article = function(){
	lucid.html.tag.call(this);
	this.tag = 'article';
};
lucid.html.builder.tags.article.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.article.prototype.constructor = lucid.html.builder.tags.article;
