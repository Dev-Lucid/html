lucid.html.base.tags.footer = function(){
	lucid.html.tag.call(this);
	this.tag = 'footer';
};
lucid.html.base.tags.footer.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.footer.prototype.constructor = lucid.html.base.tags.footer;
lucid.html.builder.tags.footer = lucid.html.base.tags.footer;
