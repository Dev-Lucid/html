lucid.html.bootstrap.tags.card = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('card');
};
lucid.html.bootstrap.tags.card.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.card = lucid.html.bootstrap.tags.card;
