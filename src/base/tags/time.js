lucid.html.builder.tags.time = function(){
	lucid.html.tag.call(this);
	this.tag = 'time';
	this.parameters = ['datetime'];
};
lucid.html.builder.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.time.prototype.constructor = lucid.html.builder.tags.time;
