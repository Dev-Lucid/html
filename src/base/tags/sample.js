lucid.html.base.tags.sample = function(){
	lucid.html.tag.call(this);
	this.tag = 'samp';
};
lucid.html.base.tags.sample.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.sample = lucid.html.base.tags.sample;
