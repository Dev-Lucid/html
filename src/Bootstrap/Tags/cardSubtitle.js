lucid.html.bootstrap.tags.cardSubtitle = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h6';
	this.addClass('card-subtitle');
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.cardSubtitle.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cardSubtitle = lucid.html.bootstrap.tags.cardSubtitle;
