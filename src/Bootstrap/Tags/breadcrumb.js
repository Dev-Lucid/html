lucid.html.bootstrap.tags.breadcrumb = function(factory){
	this.factory = factory;
	lucid.html.base.tags.orderedList.apply(this, arguments);
	this.tag = 'ol';
	this.addClass('breadcrumb');
};
lucid.html.bootstrap.tags.breadcrumb.prototype = Object.create(lucid.html.base.tags.orderedList.prototype);
lucid.html.factory.tags.breadcrumb = lucid.html.bootstrap.tags.breadcrumb;
