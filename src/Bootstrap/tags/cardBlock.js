lucid.html.bootstrap.tags.cardBlock = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('card-block');
};
lucid.html.bootstrap.tags.cardBlock.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardBlock = lucid.html.bootstrap.tags.cardBlock;
