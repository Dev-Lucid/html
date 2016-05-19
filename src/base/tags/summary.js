lucid.html.base.tags.summary = function(){
	lucid.html.tag.call(this);
	this.tag = 'summary';
};
lucid.html.base.tags.summary.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.summary.prototype.constructor = lucid.html.base.tags.summary;
lucid.html.builder.tags.summary = lucid.html.base.tags.summary;
