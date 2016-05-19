lucid.html.base.tags.preformatted = function(){
	lucid.html.tag.call(this);
	this.tag = 'pre';
};
lucid.html.base.tags.preformatted.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.preformatted.prototype.constructor = lucid.html.base.tags.preformatted;
lucid.html.builder.tags.preformatted = lucid.html.base.tags.preformatted;
