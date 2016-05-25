lucid.html.bootstrap.tags.cardSubtitle = function(){
	lucid.html.tag.call(this);
	this.tag = 'h6';
	this.addClass('card-subtitle');
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.cardSubtitle.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardSubtitle = lucid.html.bootstrap.tags.cardSubtitle;
