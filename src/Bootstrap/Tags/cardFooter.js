lucid.html.bootstrap.tags.cardFooter = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
	this.addClass('card-footer');
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.cardFooter.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cardFooter = lucid.html.bootstrap.tags.cardFooter;
