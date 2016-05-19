lucid.html.base.tags.insert = function(){
	lucid.html.tag.call(this);
	this.tag = 'ins';
};
lucid.html.base.tags.insert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.insert.prototype.constructor = lucid.html.base.tags.insert;
lucid.html.builder.tags.insert = lucid.html.base.tags.insert;
