lucid.html.base.tags.nav = function(){
	lucid.html.tag.call(this);
	this.tag = 'nav';
};
lucid.html.base.tags.nav.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.nav.prototype.constructor = lucid.html.base.tags.nav;
lucid.html.builder.tags.nav = lucid.html.base.tags.nav;
