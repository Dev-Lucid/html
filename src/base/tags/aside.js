lucid.html.base.tags.aside = function(){
	lucid.html.tag.call(this);
	this.tag = 'aside';
};
lucid.html.base.tags.aside.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.aside.prototype.constructor = lucid.html.base.tags.aside;
lucid.html.builder.tags.aside = lucid.html.base.tags.aside;
