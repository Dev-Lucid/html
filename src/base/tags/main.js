lucid.html.base.tags.main = function(){
	lucid.html.tag.call(this);
	this.tag = 'main';
};
lucid.html.base.tags.main.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.main = lucid.html.base.tags.main;
