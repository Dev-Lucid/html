lucid.html.bootstrap.tags.cardTitle = function(){
	lucid.html.tag.call(this);
	this.tag = 'h4';
	this.addClass('card-title');
};
lucid.html.bootstrap.tags.cardTitle.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardTitle = lucid.html.bootstrap.tags.cardTitle;
