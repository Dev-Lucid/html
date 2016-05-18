lucid.html.builder.tags.sample = function(){
	lucid.html.tag.call(this);
	this.tag = 'samp';
};
lucid.html.builder.tags.sample.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.sample.prototype.constructor = lucid.html.builder.tags.sample;
