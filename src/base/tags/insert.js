lucid.html.builder.tags.insert = function(){
	lucid.html.tag.call(this);
	this.tag = 'ins';
};
lucid.html.builder.tags.insert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.insert.prototype.constructor = lucid.html.builder.tags.insert;
