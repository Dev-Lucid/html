lucid.html.bootstrap.tags.cardFooter = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('card-footer');
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.cardFooter.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardFooter = lucid.html.bootstrap.tags.cardFooter;
