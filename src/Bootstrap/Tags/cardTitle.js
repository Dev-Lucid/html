lucid.html.bootstrap.tags.cardTitle = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h4';
	this.addClass('card-title');
};
lucid.html.bootstrap.tags.cardTitle.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cardTitle = lucid.html.bootstrap.tags.cardTitle;
