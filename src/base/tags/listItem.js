lucid.html.builder.tags.listItem = function(){
	lucid.html.tag.call(this);
	this.tag = 'li';
};
lucid.html.builder.tags.listItem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.listItem.prototype.constructor = lucid.html.builder.tags.listItem;
