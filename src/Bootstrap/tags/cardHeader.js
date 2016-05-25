lucid.html.bootstrap.tags.cardHeader = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('card-header');
};
lucid.html.bootstrap.tags.cardHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardHeader = lucid.html.bootstrap.tags.cardHeader;
