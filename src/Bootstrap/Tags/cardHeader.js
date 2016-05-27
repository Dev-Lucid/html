lucid.html.bootstrap.tags.cardHeader = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
	this.addClass('card-header');
};
lucid.html.bootstrap.tags.cardHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cardHeader = lucid.html.bootstrap.tags.cardHeader;
