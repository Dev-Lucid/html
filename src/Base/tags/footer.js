lucid.html.base.tags.footer = function(){
	lucid.html.tag.call(this);
	this.tag = 'footer';
};
lucid.html.base.tags.footer.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.footer = lucid.html.base.tags.footer;
