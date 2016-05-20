lucid.html.base.tags.listItem = function(){
	lucid.html.tag.call(this);
	this.tag = 'li';
};
lucid.html.base.tags.listItem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.listItem = lucid.html.base.tags.listItem;
