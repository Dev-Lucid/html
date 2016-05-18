lucid.html.builder.tags.main = function(){
	lucid.html.tag.call(this);
	this.tag = 'main';
};
lucid.html.builder.tags.main.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.main.prototype.constructor = lucid.html.builder.tags.main;
