lucid.html.bootstrap.tags.pagination = function(factory){
	this.factory = factory;
	lucid.html.base.tags.unorderedList.apply(this, arguments);
	this.tag = 'ul';
	this.addClass('pagination');
};
lucid.html.bootstrap.tags.pagination.prototype = Object.create(lucid.html.base.tags.unorderedList.prototype);
lucid.html.factory.tags.pagination = lucid.html.bootstrap.tags.pagination;
